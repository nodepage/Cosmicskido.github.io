let xClickz = document.getElementById("xicon");
let tClickz = document.getElementById("ticon");
let refUrlx = document.getElementById("refurl");
let airdropBtn = document.getElementById("airdropsubmitbtn");



var xClickedz = false;
var tClickedz = false;

window.addEventListener("load", function () {
  xClickedz = localStorage.getItem("xClicked");
  tClickedz = localStorage.getItem("tClicked");

  if (xClickedz) {
    xClickz.style.background = "#bf900233";
  }
  if (tClickedz) {
    tClickz.style.background = "#bf900233";
  }
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCKnj1uyuYJlZvlyh4Z4u2j_ZUNthikjIQ",
  authDomain: "cscdata-30fb8.firebaseapp.com",
  projectId: "cscdata-30fb8",
  storageBucket: "cscdata-30fb8.appspot.com",
  messagingSenderId: "1055537604077",
  appId: "1:1055537604077:web:95357f71af2ce75c0973e4",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const userRef = ref(database, "users");

function pushUser(refUrlx) {
  set(ref(database, "users/" + refUrlx), {
    address: refUrlx,
    point: 0,
  })
    .then()
    .catch((error) => {
      alert(error);
    });
}

onValue(userRef, function (snapshot) {});

xClickz.addEventListener("click", function () {
  xClickz.style.background = "#bf900233";
  xClickedz = true;
  localStorage.setItem("xClicked", "true");
  // Perform actions you want when the element is clicked
});

tClickz.addEventListener("click", function () {
  tClickz.style.background = "#bf900233";
  tClickedz = true;
  localStorage.setItem("tClicked", "true");
  // Perform actions you want when the element is clicked
});

airdropBtn.addEventListener("click", function () {
  var checkCatcha = window.hcaptcha.getResponse();

  if (xClickedz && tClickedz) {
    if (refUrlx.value === "") {
      document.getElementById("swal2-title").innerHTML =
        "Please enter your SOL address";

      document.getElementsByClassName("swal2-container")[0].style.display =
        "flex";
    } else {
      if (refUrlx.value.length > 12) {
        if (checkCatcha !== "") {
          pushUser(refUrlx.value);
          const modalBackdrop =
            document.getElementsByClassName("modal-backdrop")[0];

          document.getElementById("swal2-title").innerHTML =
            '<img src="/assets/images/background/checkz.png" style="width: 25%; height: 25%;"/> <br> Submission successful';

          const changeOnclick = document.getElementById("closeBtn");

          changeOnclick.setAttribute("onclick", "succesReload()");

          // modalBackdrop.classList.toggle("show", false);
          // modalBackdrop.style.display = "none"

          // document.getElementsByClassName("modal")[1].classList.toggle("show", false);
          // document.getElementsByClassName("modal")[1].style.display = "none";

          document.getElementsByClassName("swal2-container")[0].style.display =
            "flex";
        } else {
          alert("Verify you are a human");
        }
      } else {
        document.getElementById("swal2-title").innerHTML =
          "Enter a valid address";

        document.getElementsByClassName("swal2-container")[0].style.display =
          "flex";
      }
    }
  } else {
    document.getElementById("swal2-title").innerHTML =
      'Task Error! <br> <p style="margin-top: 20px; font-size: 14px; color: #595959; font-weight: 500;">Join the telegram, follow the X and retweet!</p>';

    document.getElementsByClassName("swal2-container")[0].style.display =
      "flex";
  }
});
