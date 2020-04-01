let getToken = document.querySelector("#getToken");
let login = document.querySelector("#enter");
let showRegisterForm = document.querySelector("#showRegisterForm");
let showLoginForm = document.querySelector("#showLoginForm");
let loginInput = document.querySelector("#login")
let passwordInput = document.querySelector("#password") 
let loginLogin = document.querySelector("#loginLogin")
let passwordLogin = document.querySelector("#passwordLogin") 

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

login.addEventListener("click", event => {
  event.preventDefault()
  fetch("http://localhost:5000/users/loging", {
    method: "GET",
    headers: {
      login: `${loginLogin.value}`,
      password: `${passwordLogin.value}`
    }
  })
  .then(res => res.json())
  .then(res => {

    if (res["isPassed"] == "true") {
        alert(`${res["msg"]}`)
        registerForm.style.display = "none"
        loginForm.style.display = "none"
        localStorage.setItem("token", res["token"]);
    } else{
      alert('Авторизация не прошла, пожалуйста введите логин и пароль')
      registerForm.style.display = "none"
      loginForm.style.display = "block"
    }
  });
});

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

        if (res["isPassed"] == "true") {
            alert(`${res["msg"]}`)
            registerForm.style.display = "none"
            loginForm.style.display = "none"
        } else{
          alert('Авторизация не прошла, пожалуйста введите логин и пароль')
          registerForm.style.display = "none"
          loginForm.style.display = "block"
        }
      });
  } else {
    alert("Для начала зарегистрируйтесь");
  }
});


