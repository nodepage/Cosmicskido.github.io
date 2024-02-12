let xClickz = document.getElementById("xicon");
let tClickz = document.getElementById("ticon");
let refUrlx = document.getElementById("refurl");

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

async function submitandgetref() {
 var checkCatcha = await window.hcaptcha.getResponse();
  var wits = 'ES_e089dd5c0e444d8aa903dbf882fb2ba1'
  const url = 'https://api.hcaptcha.com/siteverify';

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `response=${checkCatcha}&secret=${wits}`,
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the hCaptcha verification response
      console.log(data);
    });

  if (xClickedz && tClickedz) {
    alert(refUrlx.value);
  } else {
    document.getElementById("swal2-title").innerHTML = "Task Error!";
    document.getElementsByClassName("swal2-container")[0].style.display =
      "flex";
    console.log(refUrlx.value);
  }
}
