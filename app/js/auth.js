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

 var checkCatcha = await window.hcaptcha.getResponse()


  
  if (xClickedz && tClickedz) {
    alert(refUrlx.value);
    
        
  } else {
    document.getElementById("swal2-title").innerHTML = "Task Error!";
    document.getElementsByClassName("swal2-container")[0].style.display =
      "flex";
      console.log(refUrlx.value)
  }

  if(checkCatcha !== ""){
    alert("Correct!")
  }else{
    alert('Do the challenge')
  }
}
