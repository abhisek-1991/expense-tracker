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

  // Make a POST request to localhost:4000 to add the expense
  axios
    .post('http://localhost:4000/expense', expense)
    .then((response) => {
      // Handle the response if needed
      console.log('Expense added:', response.data);
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

window.addEventListener('DOMContentLoaded', () => {
  // Fetch expenses from the server
  const token = localStorage.getItem('token');
  axios.get('http://localhost:4000/expense',{headers:{"Authorization":token}})
    .then((response) => {
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
  axios
    .delete(`http://localhost:4000/expense/${expense.id}`)
    .then(() => {
      // Remove the expense from the list in the UI
      // You might need to find the specific list item and remove it here
      console.log('Expense deleted successfully');
    })
    .catch((error) => {
      showError(error);
    });
}
