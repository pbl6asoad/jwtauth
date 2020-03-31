let getToken = document.querySelector("#getToken");
let login = document.querySelector("#enter")
let showRegisterForm = document.querySelector("#showRegisterForm")
let showLoginForm = document.querySelector("#showLoginForm")

getToken.addEventListener("click", () => {
  event.preventDefault();
  let login = document.querySelector("#login").value;
  let password = document.querySelector("#password").value;
  if ( login.length == 0 && password.length == 0) {
      alert("Пароль или логин не могут быть пустыми")
  } else{
    let userCard = {
        login,
        password
      }
      
      console.log(userCard)
      fetch("http://localhost:5000/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userCard)
      })
        .then(res => {
            return res.json()
        })
        .then(data => {
          console.log(data)
          localStorage.setItem("token", data.token)
        })
  }

});


login.addEventListener('click', (event) => {
if(localStorage.getItem("token")){
    event.preventDefault()
    fetch("http://localhost:5000/users/login", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }).then((req, res) => {
        console.log("res");
    })
}
else {
    alert('Для начала зарегистрируйтесь')
}
})

showRegisterForm.addEventListener('click', (event)=> {
    event.preventDefault()
    document.querySelector("#loginForm").style.display = "none"
    document.querySelector("#registerForm").style.display = "block"
})

showLoginForm.addEventListener('click', (event)=> {
    event.preventDefault()
    document.querySelector("#loginForm").style.display = "block"
    document.querySelector("#registerForm").style.display = "none"
})