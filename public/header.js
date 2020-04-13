const header = (document.querySelector("header").innerHTML = ` 
<div id="auth">
    <button type="submit" id="showRegisterForm">Регистрация</button>
    <button type="submit" id="showLoginForm">Вход</button>
    <div>
    <form id="registerForm">
        <input id="login" type="text" placeholder="login">
        <input id="password" type="text" placeholder="password">
        <input id="name" type="text" placeholder="name">
        <button type="submit" id="getToken">Зарегистрироваться</button>
    </form>
    <form id="loginForm" >
        <input id="loginLogin" type="text" placeholder="login">
        <input id="passwordLogin" type="text" placeholder="password">
        <button id="enter" type="submit">Войти</button>
    </form>
    </div>
    <button type="submit" id="vkAuth">Авторизация через ВК</button>
</div>


<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/">Главная</a>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="/users/list" id="navbar_getUserList">Поиск</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="">Home</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="">Home</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="">Home</a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
      <div class="mx-2 profile">
      <a id="profileLink" href="/users/profile">Профиль</a>
      <p id="logout">Выйти</p>
    </div>
    <p class="profile " id="profileName">asdasdsad</p>
    <img id="ava" src="https://i.stack.imgur.com/l60Hf.png" class="profile mx-2 img-fluid col-1" alt="">
    </div>
</nav>
`);
const url = "http://localhost:5000"
let profileName = (document.querySelector(
  "#profileName"
).innerText = localStorage.getItem("name"));
if(localStorage.getItem('ava')){
    let ava = (document.querySelector("#ava").src = localStorage.getItem("img"));
}

let logout = document.querySelector("#logout");
let getToken = document.querySelector("#getToken");
let login = document.querySelector("#enter");
let showRegisterForm = document.querySelector("#showRegisterForm");
let showLoginForm = document.querySelector("#showLoginForm");
let loginInput = document.querySelector("#login");
let passwordInput = document.querySelector("#password");
let nameInput = document.querySelector("#name");
let loginLogin = document.querySelector("#loginLogin");
let passwordLogin = document.querySelector("#passwordLogin");
const vk = document.querySelector("#vkAuth");
let name = document.querySelector("#profileName");
let profile = document.querySelector(".profile");
let navbar_getUserList = document.querySelector('#navbar_getUserList')
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


if (localStorage.getItem("authType")) {
  profile.style.display = "none";
}
document.querySelector("#registerForm").style.display = "none";
document.querySelector("#loginForm").style.display = "none";
logout.addEventListener("click", (event) => {
  localStorage.clear();
  document.location.reload(true);
});

if (localStorage.getItem("authType")) {
  document.querySelector("#auth").style.display = "none";
  name.innerText = localStorage.getItem("name");
  document.querySelector("#ava").src = localStorage.getItem("img");
}

navbar_getUserList.addEventListener('click', (event) => {
    fetch(`${url}/users/list`)
    .then(res => res.json())
    .then(data => {
    })
})

loginInput.addEventListener("input", (event) => {
  getToken.setAttribute("disabled", "true");
  if (
    loginInput.value !== "" &&
    passwordInput.value != "" &&
    nameInput.value != ""
  ) {
    getToken.removeAttribute("disabled");
  }
});

passwordInput.addEventListener("input", (event) => {
  getToken.setAttribute("disabled", "true");
  if (
    loginInput.value !== "" &&
    passwordInput.value != "" &&
    nameInput.value != ""
  ) {
    getToken.removeAttribute("disabled");
  }
});

nameInput.addEventListener("input", (event) => {
  getToken.setAttribute("disabled", "true");
  if (
    loginInput.value !== "" &&
    passwordInput.value != "" &&
    nameInput.value != ""
  ) {
    getToken.removeAttribute("disabled");
  }
});

getToken.addEventListener("click", () => {
  event.preventDefault();
  let login = document.querySelector("#login").value;
  let password = document.querySelector("#password").value;
  let name = document.querySelector("#name").value;
  let authType = "jwt";
  if (login == "" || password == "" || name == "") {
    getToken.setAttribute("disabled", "true");
    alert("Поля не должны быть пустыми");
  } else {
    let userCard = {
      login,
      password,
      name,
      authType,
    };
    getToken.setAttribute("disabled", "false");
    fetch(`${url}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCard),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data["msg"]) alert("Пользователь с таким именем уже существует");
        else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("name", data.user["name"]);
          localStorage.setItem("login", data.user["login"]);
          localStorage.setItem("authType", "jwt");
          profile.style.display = "block";
          document.querySelector("#auth").style.display = "none";
          document.location.reload(true);
        }
      });
  }
});

login.addEventListener("click", (event) => {
  event.preventDefault();
  fetch(`${url}/users/loging`, {
    method: "GET",
    headers: {
      login: `${loginLogin.value}`,
      password: `${passwordLogin.value}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res["isPassed"] == "true") {
        alert(`${res["msg"]}`);
        registerForm.style.display = "none";
        loginForm.style.display = "none";
        localStorage.setItem("token", res["token"]);
        localStorage.setItem("name", res["name"]);
        localStorage.setItem("login", res["login"]);
        profile.style.display = "block";
        document.querySelector("#auth").style.display = "none";

        document.location.reload(true);
      } else {
        alert("Пароль или логин неверны");
        registerForm.style.display = "none";
        loginForm.style.display = "block";
      }
    });
});

showRegisterForm.addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("#loginForm").style.display = "none";
  document.querySelector("#registerForm").style.display = "block";
});

showLoginForm.addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("#registerForm").style.display = "none";

  document.querySelector("#loginForm").style.display = "block";

  if (localStorage.getItem("token")) {
    fetch(`${url}/users/login`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res["isPassed"] == "true") {
          alert(`${res["msg"]}`);
          localStorage.setItem("name", res["name"]);
          localStorage.setItem("login", res["login"]);
          registerForm.style.display = "none";
          loginForm.style.display = "none";
          document.querySelector("#auth").style.display = "none";

          document.location.reload(true);
        } else {
          alert("Авторизация не прошла, пожалуйста введите логин и пароль");
          registerForm.style.display = "none";
          loginForm.style.display = "block";
        }
      });
  } else {
    localStorage.setItem("token", "a");
    alert("Для начала зарегистрируйтесь");
  }
});

vk.addEventListener("click", (event) => {
  document.querySelector("#auth").style.display = "none";
  window.location.href =
    `https://oauth.vk.com/authorize?client_id=7386949&display=popup&redirect_uri=${url}/users/redirect/&scope=friends&response_type=code&v=5.103`;
});

if (localStorage.getItem("VK_userdata") == "true") {
  fetch(
    `https://cors-anywhere.herokuapp.com/https://api.vk.com/method/users.get?user_ids=${localStorage.getItem(
      "VK_id"
    )}&fields=photo_id,verified,sex,bdate,city,country,home_town,has_photo,photo_50,photo_100,photo_200_orig,photo_200,photo_400_orig,photo_max,photo_max_orig,online,domain,has_mobile,contacts,site,education,universities,schools,status,last_seen,followers_count,common_count,occupation,nickname,relatives,relation,personal,connections,exports,activities,interests,music,movies,tv,books,games,about,quotes,can_post,can_see_all_posts,can_see_audio,can_write_private_message,can_send_friend_request,is_favorite,is_hidden_from_feed,timezone,screen_name,maiden_name,crop_photo,is_friend,friend_status,career,military,blacklisted,blacklisted_by_me,can_be_invited_group.&access_token=${localStorage.getItem(
      "VK_access_token"
    )}&v=5.103`
  )
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("img", data.response["0"].photo_max_orig);
      localStorage.setItem("authType", "VK");
      localStorage.setItem("login", data.response["0"]["domain"]);
      localStorage.setItem("name", data.response["0"]["first_name"]);
      profile.style.display = "block";
    });
}


// Новые юзеры
// let newUsers = {}

// const forLoop = async _ => {
//   console.log('Start')

//   for (let i = 0; i < 1; i++) {
//     const fruit =  fetch(`https://cors-anywhere.herokuapp.com/https://api.vk.com/method/users.get?user_ids=${getRandomInt(400000000)}&fields=photo_max_orig,first_name,domain&access_token=${localStorage.getItem("VK_access_token")}&v=5.103`)
//     .then(res => {
//       return res.json()
//     })
//     const numFruit = await fruit
//     console.log(numFruit);
//     newUsers[i] = numFruit.response["0"] 
//     console.log(i);
//   }
//   console.log(newUsers);
//   console.log('End')
//   fetch(`${url}/users/generate100newusers`, {
//     method: "POST",
//     mode: 'cors', 
//     cache: 'no-cache', 
//     credentials: 'same-origin', 
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     redirect: 'follow', 
//     referrerPolicy: 'no-referrer',  
//     body: JSON.stringify(newUsers)
//   })
// }

// forLoop()