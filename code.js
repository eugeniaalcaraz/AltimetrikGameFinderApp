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