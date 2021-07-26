Events();

function Events() {
    document.querySelector("#login-link-showPass").addEventListener("click", ShowPass);
    document.querySelector("#login-link-hidePass").addEventListener("click", HidePass);
    document.querySelector("#user-form").addEventListener("submit", LoadMain);
    document.querySelector("#login-input-pass").addEventListener("click", RemoveError);
    document.querySelector("#login-input-email").addEventListener("click", RemoveError);

}

function ShowPass() {
    document.querySelector("#login-input-pass").setAttribute("type", "text");
    document.querySelector("#login-link-showPass").style.display = "none";
    document.querySelector("#login-link-hidePass").style.display = "block";
}

function HidePass() {
    document.querySelector("#login-input-pass").setAttribute("type", "password");
    document.querySelector("#login-link-showPass").style.display = "block";
    document.querySelector("#login-link-hidePass").style.display = "none";
}


function LoadMain(evt) {

    evt.preventDefault();

    let email = document.querySelector("#login-input-email").value;
    let password = document.querySelector("#login-input-pass").value;
    let error = "";

    if (password.length < 3) {
        error = "Enter a valid password";
        document.querySelector("#pass-error-message").innerHTML = error;
        document.querySelector("#pass-container").classList.add("error");
        document.querySelector("#login-input-pass").classList.add("error");

        document.querySelector(".snackbar").classList.add("visible");


    }
    if (!EmailFromat(email)) {
        error = "Enter a valid email";
        document.querySelector("#email-error-message").innerHTML = error;
        document.querySelector("#email-container").classList.add("error");
        document.querySelector("#login-input-email").classList.add("error");
        document.querySelector(".snackbar").classList.add("visible");
    }

    if (error === "") {

        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: `${email}`,
                password: `${password}`,
            }),

        }).then(async(response) => {
            let responseText = await response.json();
            console.log(responseText);
            if (response.status === 200) {
                document.cookie = "authToken-" + responseText.accessToken;
                console.log(responseText);
                window.location.href = "http://127.0.0.1:5500/main.html";

            }
            if (response.status === 400) {
                console.log(responseText);
            }
        })

    }


}

function EmailFromat(email) {
    let valid = false;
    if (email.indexOf("@") > -1) {
        let positionArroba = email.indexOf("@");
        let positionPunto = email.indexOf(".");
        if (positionArroba < positionPunto) {
            valid = true;
        }
    }
    return valid;
}

function RemoveError() {

    document.querySelector("#pass-container").classList.remove("error");
    document.querySelector("#email-container").classList.remove("error");
    document.querySelector("#login-input-pass").classList.remove("error");
    document.querySelector("#login-input-email").classList.remove("error");
    document.querySelector("#snackbar-error").classList.add("hidden");
    document.querySelector("#pass-error-message").innerHTML = "";
    document.querySelector("#email-error-message").innerHTML = "";



}

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