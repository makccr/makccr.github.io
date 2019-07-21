function mobileHam() {
  document.getElementById("mobileHam").style.display = "block";
}

function mobileHamX() {
  document.getElementById("mobileHam").style.display = "none";
}

function copyText() {
  var copyText = document.getElementById("blogLink");
  copyText.select();
  document.execCommand("copy");
}
