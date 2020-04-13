url = "http://localhost:5000"
console.log("meow");
console.log(url);
fetch(`${url}/dialog/userDialogs`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        "myid": localStorage.getItem('login')
    }
})
.then(res => res.json())
.then(data => console.log(data))