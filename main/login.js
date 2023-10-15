function login(e) {
    e.preventDefault();
    console.log(e.target.name);

    const loginDetails = {
        email: e.target.email.value,
        password: e.target.password.value

    }
    console.log(loginDetails)
    axios.post('http://localhost:4000/login',loginDetails).then(response => {
            alert(response.data.message)
            console.log(response.data)
            window.location.href = "./expense.html"
            localStorage.setItem('token', response.data.token)
            console.log(response);
            //window.location.href = "../ExpenseTracker/index.html"
    }).catch(err => {
        console.log(JSON.stringify(err))
        document.body.innerHTML += `<div style="color:red;">${err.message} <div>`;
    })
}



















