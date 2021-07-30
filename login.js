let slides = document.querySelectorAll(".carousel-image");
let dots = document.querySelectorAll(".dot");
let slidePosition = 0;
Events();

function Events() {
    document.querySelector("#login-link-showPass").addEventListener("click", ShowPass);
    document.querySelector("#login-link-hidePass").addEventListener("click", HidePass);
    document.querySelector("#user-form").addEventListener("submit", LoadMain);
    document.querySelector("#login-input-pass").addEventListener("click", RemoveError);
    document.querySelector("#login-input-email").addEventListener("click", RemoveError);
    StartCarousel();


}

// --------------- Password visual control ---------------- //

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

// --------------- Call to Json server & redirection to main ---------------- //
function LoadMain(evt) {

    evt.preventDefault();

    let email = document.querySelector("#login-input-email").value;
    let password = document.querySelector("#login-input-pass").value;
    let snackbarError = document.querySelector("#snackbar-error");
    let snackbarSuccess = document.querySelector("#snackbar-success");
    let snackbarAlert = document.querySelector("#snackbar-alert");
    let error = "";

    if (password.length < 3) {
        error = "Enter a valid password";
        document.querySelector("#pass-error-message").innerHTML = error;
        document.querySelector("#pass-container").classList.add("error");
        document.querySelector("#login-input-pass").classList.add("error");
    }

    if (!EmailFromat(email)) {
        error = "Enter a valid email";
        document.querySelector("#email-error-message").innerHTML = error;
        document.querySelector("#email-container").classList.add("error");
        document.querySelector("#login-input-email").classList.add("error");
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
            //console.log(responseText);
            if (response.status === 200) {
                document.cookie = "authToken-" + responseText.accessToken;
                //console.log(responseText);
                snackbarSuccess.style.top = "-80px";
                setTimeout(function() {
                    window.location.href = "http://127.0.0.1:5500/main.html";
                }, 1000)
            }
            if (response.status === 400) {
                //console.log(responseText);
                snackbarError.style.top = "-80px";
                error = "Incorrect email or password";
                document.querySelector("#pass-error-message").innerHTML = error;
                document.querySelector("#pass-container").classList.add("error");
                document.querySelector("#login-input-pass").classList.add("error");
                document.querySelector("#email-container").classList.add("error");
                document.querySelector("#login-input-email").classList.add("error");
            }
        })
    }
}

// --------------- Email validation ---------------- //
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

// --------------- Clean input erros ---------------- //
function RemoveError() {

    document.querySelector("#pass-container").classList.remove("error");
    document.querySelector("#email-container").classList.remove("error");
    document.querySelector("#login-input-pass").classList.remove("error");
    document.querySelector("#login-input-email").classList.remove("error");
    document.querySelector("#pass-error-message").innerHTML = "";
    document.querySelector("#email-error-message").innerHTML = "";

    let snackbarError = document.querySelector("#snackbar-error");
    let snackbarAlert = document.querySelector("#snackbar-alert");

    snackbarError.style.top = "-500px";
    snackbarAlert.style.top = "-500px";


}


// --------------- Carrousel ---------------- //

function StartCarousel() {

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.opacity = "0%";


    }
    for (let j = 0; j < dots.length; j++) {
        dots[j].classList.remove("dot-active");
    }


    document.slide.src = slides[slidePosition];

    if (slidePosition < slides.length - 1) {
        slidePosition++;
    } else {
        slidePosition = 0;
    }


    slides[slidePosition].style.opacity = "100%";
    dots[slidePosition].classList.add("dot-active");


    setTimeout(StartCarousel, 2500);
}