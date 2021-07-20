/* var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
*/

document.querySelector("#login-link-showPass").addEventListener("click", showPass);
document.querySelector("#login-link-hidePass").addEventListener("click", hidePass);

function showPass() {
    document.querySelector("#login-input-pass").setAttribute("type", "text");
    document.querySelector("#login-link-showPass").style.display = "none";
    document.querySelector("#login-link-hidePass").style.display = "block";
}

function hidePass() {
    document.querySelector("#login-input-pass").setAttribute("type", "password");
    document.querySelector("#login-link-showPass").style.display = "block";
    document.querySelector("#login-link-hidePass").style.display = "none";
}


function loadMain() {

    let email = document.querySelector("#login-input-email").value;
    let password = document.querySelector("login-input-pass").value;


    console.log("fetch");
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: `${email}`,
            password: `${password}`
        })

    })

    .then(async(response) => {
        let responseText = await response.json();
        if (response.status === 200) {
            document.cookie = "authToken-" + responseText.accessToken;
            console.log(responseText);

        }
        if (response.status === 400) {
            console.log(responseText);
        }
    })

    // window.location.href = "http://127.0.0.1:5500/main.html"

}

//--------------------------------------------------------------------

// const jsonServer = require('json-server')
// const auth = require('json-server-auth')

// const app = jsonServer.create()
// const router = jsonServer.router('db.json')

// // /!\ Bind the router db to the app
// app.db = router.db

// // You must apply the auth middleware before the router
// app.use(auth)
// app.use(router)
// app.listen(3000)