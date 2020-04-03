let code = window.location.href.split('=')
console.log(code[1]);
const url = `https://cors-anywhere.herokuapp.com/https://oauth.vk.com/access_token?client_id=7386949&redirect_uri=http://localhost:5000/users/redirect/&client_secret=D9r5I43Na6lKYecOIW7u&code=${code[1]}`

fetch(url).then(res => res.json()).then(data=>{
    console.log("meow");
    localStorage.setItem("VKtoken", data.access_token)
}).then(() => window.location.href = "http://localhost:5000/")
