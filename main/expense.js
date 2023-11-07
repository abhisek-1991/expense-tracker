// Get references to form elements
const form = document.querySelector('form');
const amountInput = document.getElementById('amount');
const descriptionInput = document.getElementById('description');
const categoryInput = document.getElementById('category');
const listOfExpenses = document.getElementById('listOfExpenses');

// Define a function to add an expense to the list
function addExpenseToList(expense) {
  const listItem = document.createElement('li');
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  listItem.textContent = `Amount: ${expense.expenseamount}, Description: ${expense.description}, Category: ${expense.category}`;
  listOfExpenses.appendChild(listItem);
  listItem.appendChild(deleteButton);

  deleteButton.addEventListener('click', () => {
    deleteExpense(expense); // Call a function to delete the expense when the button is clicked
  });


}

// Define a function to show an error
function showError(err) {
  console.error('Error:', err);
  // Handle and display the error as needed
}

// Define a function to handle form submission
function addExpense(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const expenseamount = (amountInput.value); // Parse amount as a float
  const description = descriptionInput.value;
  const category = categoryInput.value;

  // Validate that the amount is a valid number
  // if (isNaN(expenseamount) ||!Number.isInteger(expenseamount)) {
  //   alert('Please enter a valid number for the expense amount.');
  //   return;
  // }

  // Create an object to represent the expense
  const expense = {
    expenseamount,
    description,
    category,
  };
  const token=localStorage.getItem('token');
  // Make a POST request to localhost:4000 to add the expense
  axios
    .post('http://localhost:4000/expense', expense,{headers:{"Authorization":token}})
    .then((response) => {
      // Handle the response if needed
      //console.log('Expense added:', response.data);
      addExpenseToList(expense);
    })
    .catch((error) => {
      // Handle errors
      console.error('Error adding expense:', error);
    });

  // Clear the form inputs
  amountInput.value = '';
  descriptionInput.value = '';
  categoryInput.value = '';
}

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

function showPremium_user_message(){
  document.getElementById('rzp-button1').style.visibility = 'hidden';
  document.getElementById('message').innerHTML='You are a premium user';
}

function showLeaderBoard(){
  const inputElement = document.createElement("input");     // maybe we will face problem because in the html there is no place for creating
  inputElement.type = "button";                             // the input element
  inputElement.value= "Show Leaderboard";
  inputElement.onclick=async()=>{
    const token = localStorage.getItem("token");
    const userLeaderBoardArray = await axios.get('http://localhost:4000/premium/showLeaderBoard',{headers:{"Authorization":token}})
    
    var leaderboardElem = document.getElementById('leaderboard');
    leaderboardElem.innerHTML += '<h1> Leader Board </<h1>';
    userLeaderBoardArray.data.forEach((userDeatails)=>{
      leaderboardElem.innerHTML += `<li>Name - ${userDeatails.name} Total Expensw -${userDeatails.expense}`
    })

  }
  document.getElementById("message").appendChild(inputElement);

}



window.addEventListener('DOMContentLoaded', () => {
  // Fetch expenses from the server
  const token = localStorage.getItem('token');
  const decodeToken = parseJwt(token);
  //console.log(decodeToken);
  const isPremium = decodeToken.isPremium;
  if(isPremium){
    showPremium_user_message();
    showLeaderBoard();
  }
  axios.get('http://localhost:4000/expense',{headers:{"Authorization":token}})
    .then((response) => {
      //console.log('output of expense.js line 75=======>',response);
      response.data.expenses.forEach((expense) => {
        addExpenseToList(expense);
      });
    })
    .catch((error) => {
      showError(error);
    });

  
});

// Add a form submit event listener
form.addEventListener('submit', addExpense);

function deleteExpense(expense) {
  const token=localStorage.getItem('token');
  axios
    .delete(`http://localhost:4000/expense/${expense.id}`,{headers:{"Authorization":token}})
    .then(() => {
      // Remove the expense from the list in the UI
      // You might need to find the specific list item and remove it here
      //console.log('Expense deleted successfully');
    })
    .catch((error) => {
      showError(error);
    });
}


document.getElementById('rzp-button1').addEventListener('click', toRazorPay);
const token=localStorage.getItem('token');
function toRazorPay(e) {
  e.preventDefault();
  axios.get(`http://localhost:4000/buypremium`, {
      headers: {
          Authorization: token
      }
  }).then(res => {
      //console.log('response of expense.js 111===>',res);
      if (res.status === 201) {
        console.log("response of buypremium , expense.js line 159",res.data);  
        let options = {
              //order detail we get from backend so noone manuplate them directly
              "key": res.data.data.key_id,
              "order_id": res.data.data.order.id,
              //this will handel the response after the payment(update the order table)
              "handler": (result) => {
                  //console.log('response of expense.js 119==>',result);
                  axios.post(`http://localhost:4000/update_transaction`, {
                      order_id: options.order_id,
                      payment_id: result.razorpay_payment_id      
                  }, {
                      headers: {
                          Authorization: token
                      }
                  }).then((res) => {
                      alert("you are a premium user now")
                      const new_token = res.data.token;
                      localStorage.setItem("token",new_token);
                      console.log('token after premium',res.data);
                      console.log("expense.js line 178",res.token);
                      const buttonToRemove = document.getElementById("rzp-button1");
                      if (buttonToRemove) {
                      buttonToRemove.parentNode.removeChild(buttonToRemove);
                      }
                      document.getElementById('message').innerHTML="You are a premium user";

                      
                  }).catch(err => {
                      console.log(err);
                      alert(err.response.data.message);
                  });
              }
          }
          //create new object of razor pay
          const payrazor = new window.Razorpay(options);
          //open modal of razorpay
          payrazor.open();
          //call a modal to hide default behavior
          e.preventDefault();
          //if payment 
          payrazor.on('payment.failed', (response) => {
              // console.log(response);
              //console.log('response of expense.js,line 148',response);
              axios.post(`http://localhost:4000/failed_transaction`, {
                  order_id: response.error.metadata.order_id,
                  payment_id: response.error.metadata.payment_id
              }, {
                  headers: {
                      Authorization: token
                  }
              }).then(() => {
                  alert("TRANSACTION FAILED.")
              }).catch(err => {
                  console.log(err);
                  alert(err.response.data.message);
              });
          })
      }
  }).catch(err => {
      console.log(err);
      
  });
}

