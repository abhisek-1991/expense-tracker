document.getElementById("login_btn").addEventListener("click", function() {
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    const loginDetails = {
        email: email,
        password: password
    };

    axios.post('http://localhost:4000/login', loginDetails)
        .then(response => {
            localStorage.setItem('token', response.data.token);
            window.location.href = "./expense.html";
        })
        .catch(err => {
            console.log(JSON.stringify(err));
            document.body.innerHTML += `<div style="color:red;">${err.message} <div>`;
        });
});

document.getElementById("forgetPasswordBtn").addEventListener("click", function() {
    // Redirect to forget_pass.html
    window.location.href = "./forget_pass.html";
});
