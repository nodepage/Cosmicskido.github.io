let xClickz = document.getElementById("xicon");
let tClickz = document.getElementById("ticon");
let refUrl = document.getElementById("refurl");

var xClickedz = false;
var tClickedz = false;

xClickz.addEventListener("click", function () {
  xClickz.style.background = "#bf900233";
  xClickedz = true;
  // Perform actions you want when the element is clicked
});

tClickz.addEventListener("click", function () {
  tClickz.style.background = "#bf900233";
  tClickedz = true;
  // Perform actions you want when the element is clicked
});

function submitandgetref() {
  if (xClickedz && tClickedz) {
    alert(refUrl.value);
        
  } else {
    document.getElementById("swal2-title").innerHTML = "Task Error!";
    document.getElementsByClassName("swal2-container")[0].style.display =
      "flex";
  }
}
