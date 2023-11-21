document.getElementById("forgetPasswordForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = this.email.value; // Get the email input value

    const requestData = {
        email: email
    };

    axios.post('http://localhost:4000/password/forgotpassword', requestData)
        .then(response => {
            console.log(response.data.message); // Log the response message
            // Optionally, provide user feedback or handle the response
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors or display error messages to the user
        });
});
