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

document.querySelector("#showPass").addEventListener("click", showPass);
document.querySelector("#hidePass").addEventListener("click", hidePass);

function showPass() {
    document.querySelector("#pass").setAttribute("type", "text");
    document.querySelector("#showPass").style.display = "none";
    document.querySelector("#hidePass").style.display = "block";
}

function hidePass() {
    document.querySelector("#pass").setAttribute("type", "password");
    document.querySelector("#showPass").style.display = "block";
    document.querySelector("#hidePass").style.display = "none";
}