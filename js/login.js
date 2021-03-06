let slides = document.querySelectorAll(".carousel-image");
let dots = document.querySelectorAll(".carousel-dot");
let slidePosition = 0;
let snackbarError = document.querySelector(".snackbar-error");
let snackbarSuccess = document.querySelector(".snackbar-success");
let snackbarAlert = document.querySelector(".snackbar-alert");


events();

function events() {
    document.querySelector("#login-link-showPass").addEventListener("click", showPass);
    document.querySelector("#login-link-hidePass").addEventListener("click", hidePass);
    document.querySelector("#user-form").addEventListener("submit", loadMain);
    document.querySelector("#login-input-pass").addEventListener("click", removeError);
    document.querySelector("#login-input-pass").addEventListener("focus", removeError);
    document.querySelector("#login-input-pass").addEventListener("blur", validatePass);
    document.querySelector("#login-input-pass").innerHTML = "";
    document.querySelector("#login-input-email").addEventListener("click", removeError);
    document.querySelector("#login-input-email").addEventListener("focus", removeError);
    document.querySelector("#login-input-email").addEventListener("blur", validateEmail);
    document.querySelector("#login-input-email").innerHTML = "";
    startCarousel();
    addClickEventCarousel();
    addSnackbarClickEvent();
}

// --------------- Password visual control ---------------- //
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

// --------------- Call to Json server & redirection to main ---------------- //
function loadMain(evt) {

    evt.preventDefault();
    let error = "";

    if (validateEmail() && validatePass()) {
        callJsonServer().then(data => {

            document.cookie = "authToken-" + data.accessToken;
            snackbarSuccess.classList.add("show-snackbar");
            setTimeout(function() {
                window.location.href = "main.html";
            }, 1000)

        }).catch(err => {
            snackbarError.classList.add("show-snackbar");
            error = "Incorrect email or password";
            document.querySelector("#pass-error-message").innerHTML = error;
            document.querySelector("#pass-container").classList.add("error");
            document.querySelector("#login-input-pass").classList.add("error");
            document.querySelector("#email-container").classList.add("error");
            document.querySelector("#login-input-email").classList.add("error");
        });
    }
}

const callJsonServer = async() => {

    let email = document.querySelector("#login-input-email").value;
    let password = document.querySelector("#login-input-pass").value;

    const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: `${email}`,
            password: `${password}`,
        })
    });

    if (response.status !== 200) {
        throw new Error();
    }
    const data = await response.json();
    return data;
};

// --------------- Validations ---------------- //
function emailFormat(email) {
    let valid = false;
    if (email.indexOf("@") > -1) {
        let positionAt = email.indexOf("@");
        let positionPunto = email.indexOf(".");
        if (positionAt < positionPunto) {
            valid = true;
        }
    }
    return valid;
}

function validateEmail() {
    let email = document.querySelector("#login-input-email").value;
    let error = "";
    if (!emailFormat(email)) {
        error = "Enter a valid email";
        document.querySelector("#email-error-message").innerHTML = error;
        document.querySelector("#email-container").classList.add("error");
        document.querySelector("#login-input-email").classList.add("error");
        return false;
    }
    snackbarError.classList.remove("show-snackbar");
    return true;

}

function validatePass() {
    let password = document.querySelector("#login-input-pass").value;
    let error = "";
    if (password.length < 3) {
        error = "Enter a valid password";
        document.querySelector("#pass-error-message").innerHTML = error;
        document.querySelector("#pass-container").classList.add("error");
        document.querySelector("#login-input-pass").classList.add("error");
        return false;
    }
    snackbarError.classList.remove("show-snackbar");
    return true;

}

// --------------- Errors ---------------- //
function removeError() {
    document.querySelector("#pass-container").classList.remove("error");
    document.querySelector("#email-container").classList.remove("error");
    document.querySelector("#login-input-pass").classList.remove("error");
    document.querySelector("#login-input-email").classList.remove("error");
    document.querySelector("#pass-error-message").innerHTML = "";
    document.querySelector("#email-error-message").innerHTML = "";
    snackbarError.classList.remove("show-snackbar");
}

function addSnackbarClickEvent() {
    let snackbarExitButtons = document.querySelectorAll(".exit-snackbar");
    for (let i = 0; i < snackbarExitButtons.length; i++) {
        snackbarExitButtons[i].addEventListener("click", closeSnackbar);
    }
}

function closeSnackbar() {
    snackbarError.classList.remove("show-snackbar");
    snackbarSuccess.classList.remove("show-snackbar");
    snackbarAlert.classList.remove("show-snackbar");
}

// --------------- Carousel ---------------- //
function startCarousel() {

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

    setTimeout(startCarousel, 2500);
}

function changeSlide() {

    let clickedButton = this.getAttribute("id");
    slidePosition = clickedButton - 1;
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
}

function addClickEventCarousel() {

    dots.forEach((dot) => {
        dot.addEventListener("click", changeSlide)
    });
}