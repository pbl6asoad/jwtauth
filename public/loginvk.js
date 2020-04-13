let code = window.location.href.split('=')
console.log(code[1]);
localStorage.setItem("VK_token", code[1 ])
const url = `https://cors-anywhere.herokuapp.com/https://oauth.vk.com/access_token?client_id=7386949&redirect_uri=http://localhost:5000/users/redirect/&client_secret=D9r5I43Na6lKYecOIW7u&code=${code[1]}`

fetch(url).then(res => res.json()).then(data=>{
    console.log(data);

    localStorage.setItem("VK_access_token", data.access_token)    
    localStorage.setItem("VK_id", data.user_id)
    localStorage.setItem("VK_userdata", "true")
})
.then(() => window.location.href = "http://localhost:5000/")
