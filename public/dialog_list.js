url = "http://localhost:5000"
let dialogListHTML = document.querySelector(".container")
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
.then(data => {
    console.log(data);
    let dialogsArray = []
    for(let i = 0; i < data.length; i++) {
        dialogsArray.push(`            
        <div class="row mb-3">
            <img src="${data[i].img}" class="col-2 rounded-circle" alt="">
            <p>${data[i].name}</p>
        </div>
        `)
    }
    dialogListHTML.innerHTML = dialogsArray.join('')
})