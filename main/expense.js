// Get references to form elements

const form = document.querySelector('form');
const amountInput = document.getElementById('amount');
const descriptionInput = document.getElementById('description');
const categoryInput = document.getElementById('category');
const listOfExpenses = document.getElementById('listOfExpenses');

// Define a function to add an expense to the list
function addExpenseToList(expenseamount, description, category) {
  const listItem = document.createElement('li');
  listItem.textContent = `Amount: ${expenseamount}, Description: ${description}, Category: ${category}`;
  listOfExpenses.appendChild(listItem);
}

// Define a function to handle form submission
function addExpense(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const expenseamount = parseInt(amountInput.value); // Parse amount as a float
  const description = descriptionInput.value;
  const category = categoryInput.value;
  console.log(amount);
  // Validate that the amount is a valid number
  // if (isNaN(amount)) {
  //   alert('Please enter a valid number for the expense amount.');
  //   return;
  // }

  // Create an object to represent the expense
  const expense = {
    expenseamount,
    description,
    category,
  };

  // Make a POST request to localhost:4000
  axios
    .post('http://localhost:4000/expense', expense)
    .then((response) => {
      // Handle the response if needed
      console.log('Expense added:', response.data);
      addExpenseToList(expenseamount, description, category); // Add the expense to the list
    })
    .catch((error) => {
      // Handle errors
      console.error('Error adding expense:', error);
    });

  // Clear the form inputs
  // amountInput.value = '';
  // descriptionInput.value = '';
  // categoryInput.value = '';
}

// Attach the addExpense function to the form's submit event
//form.addEventListener('submit', addExpense);
