let userName = document.querySelector("#userName").innerText = localStorage.getItem('name')
let avaLarge = document.querySelector('#avaLarge').src = localStorage.getItem('img')
let form = document.querySelector("#form").action = `/upload/${localStorage.getItem('login')}`

