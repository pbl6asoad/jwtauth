let getToken = document.querySelector("#getToken");
let login = document.querySelector("#enter");
let showRegisterForm = document.querySelector("#showRegisterForm");
let showLoginForm = document.querySelector("#showLoginForm");
let loginInput = document.querySelector("#login")
let passwordInput = document.querySelector("#password") 

loginInput.addEventListener('input', (event)=> {
    getToken.setAttribute('disabled', 'true')  
    if(loginInput.value !== '' && passwordInput.value != '') {
        console.log("enabled");
        getToken.removeAttribute('disabled') 
    } else{  
        console.log("disabled");        
    }
})

passwordInput.addEventListener('input', (event)=> {
    getToken.setAttribute('disabled', 'true')   
    if(loginInput.value !== '' && passwordInput.value != '') {
        console.log(loginInput.value);
        getToken.removeAttribute('disabled') 
    } else{        
        console.log("disabled");        
    }
})


getToken.addEventListener("click", () => {
  event.preventDefault();
  let login = document.querySelector("#login").value;
  let password = document.querySelector("#password").value;

  if (login == '' && password == '') {
    getToken.setAttribute('disabled', 'true')
    alert("Пароль или логин должен быть пустым")
  } else {
    let userCard = {
      login,
      password
    }; 
    getToken.setAttribute('disabled', 'false')
    console.log(userCard);
    fetch("http://localhost:5000/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userCard)
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data["msg"]) alert("Пользователь с таким именем уже существует");
        else localStorage.setItem("token", data.token);
      });
  }
});

login.addEventListener("click", event => {});

showRegisterForm.addEventListener("click", event => {
  event.preventDefault();
  document.querySelector("#loginForm").style.display = "none";
  document.querySelector("#registerForm").style.display = "block";
});

showLoginForm.addEventListener("click", event => {
  event.preventDefault();
  document.querySelector("#registerForm").style.display = "none";

  if (localStorage.getItem("token")) {
    fetch("http://localhost:5000/users/login", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(res => {
        alert(res["msg"]);
        console.log(res);
      });
  } else {
    alert("Для начала зарегистрируйтесь");
  }
});
