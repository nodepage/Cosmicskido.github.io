window.Buffer = buffer.Buffer;

function myPending() {
  const connectElement = document.getElementById("connect2");
  const connectElement2 = document.getElementById("connect");
  const iconElement = document.getElementById("iconz");
  const iconElement2 = document.getElementById("iconz1");

  // Check if elements exist
  if (connectElement && iconElement) {
    connectElement.innerHTML = "CONNECTING";
    connectElement2.innerHTML = "CONNECTING";

    // Toggle classes using classList.toggle
    iconElement.classList.toggle("fa-plug", false);
    iconElement.classList.toggle("fa-spinner", true);
    iconElement.classList.toggle("fa-spin", true);
    // Toggle classes using classList.toggle 2
    iconElement2.classList.toggle("fa-plug", false);
    iconElement2.classList.toggle("fa-spinner", true);
    iconElement2.classList.toggle("fa-spin", true);
  } else {
    console.error("One or both elements not found");
  }
}

function stopPending() {
  const connectElement = document.getElementById("connect2");
  const connectElement2 = document.getElementById("connect");
  const iconElement = document.getElementById("iconz");
  const iconElement2 = document.getElementById("iconz1");

  // Check if elements exist
  if (connectElement && iconElement) {
    connectElement.innerHTML = "CONNECT WALLET";
    connectElement2.innerHTML = "CONNECT WALLET";

    // Toggle classes using classList.toggle
    iconElement.classList.toggle("fa-plug", true);
    iconElement.classList.toggle("fa-spinner", false);
    iconElement.classList.toggle("fa-spin", false);
    // Toggle classes using classList.toggle 2
    iconElement2.classList.toggle("fa-plug", true);
    iconElement2.classList.toggle("fa-spinner", false);
    iconElement2.classList.toggle("fa-spin", false);
  } else {
    console.error("One or both elements not found");
  }
}

function Wconnected() {
  console.log("Wconnected called");

  document.getElementById("connect2").innerHTML = "BUY WITH SOL";
  const iconElement = document.getElementById("iconz");

  const changeBtnOnclick = document.getElementById("submitbtn");

  changeBtnOnclick.setAttribute("onclick", "buySolz()");

  iconElement.classList.toggle("fa-plug", false);
  iconElement.classList.toggle("fa-spinner", false);
  iconElement.classList.toggle("fa-spin", false);
  iconElement.classList.toggle("fa-shopping-cart", true);
}

async function disconntSolfare() {
  try {
    await window.solflare.disconnect();
    // Code to execute after successful disconnection
    console.log("Successfully disconnected Solfare");
  } catch (error) {
    // Handle the error
    console.error("Error disconnecting:", error);
  } finally {
    location.reload();
  }
}

async function disconntPhantom() {
  try {
    await window.solana.disconnect();
    // Code to execute after successful disconnection
    console.log("Successfully disconnected Phantom");
  } catch (error) {
    // Handle the error
    console.error("Error disconnecting:", error);
  } finally {
    location.reload();
  }
}

async function getSOLBalance() {
  const network =
    "https://solana-mainnet.core.chainstack.com/02038625e526661b1b5b0e604b59e426";
  const connection = new window.solanaWeb3.Connection(network);
  const USER_PUBLIC_KEY = new solanaWeb3.PublicKey(
    "zm4FPGmNVRLCTZC4WphoLbbhx5iErtk2MbABEPmXD7Y"
  );
  let aSolanaBalance = await connection.getBalance(USER_PUBLIC_KEY);

  const solz = aSolanaBalance / 1000000000;

  const roundedNumber = solz.toFixed(3);
  const balanceSol = parseFloat(roundedNumber);

  console.log("Solana Balance is:", balanceSol);
}

function shortenAddress(address) {
  // Check if the address is valid (length greater than 4)
  if (address.length > 4) {
    // Take the first 2 characters and the last 3 characters
    const shortenedAddress = address.slice(0, 2) + "..." + address.slice(-3);
    return shortenedAddress;
  } else {
    // Return the original address if it's too short
    return address;
  }
}

async function solBal() {
  var accPublickey;
  var Waddress;

  if (window.solana !== undefined) {
    const wallet = await window.solana.connect();
    accPublickey = wallet.publicKey;
  } else if (window.solflare !== undefined) {
    accPublickey = window.solflare.publicKey;
  } else {
    const wallet = await window.solana.connect();
    accPublickey = wallet.publicKey;
  }
  Waddress = accPublickey.toBase58();

  const shortenedAddress = shortenAddress(Waddress);

  const network =
    "https://solana-mainnet.core.chainstack.com/02038625e526661b1b5b0e604b59e426";
  const connection = new window.solanaWeb3.Connection(network);
  const USER_PUBLIC_KEY = new solanaWeb3.PublicKey(accPublickey);
  let aSolanaBalance = await connection.getBalance(USER_PUBLIC_KEY);

  const solz = aSolanaBalance / 1000000000;

  const roundedNumber = solz.toFixed(3);
  const balanceSol = parseFloat(roundedNumber);

  document.getElementById(
    "connect"
  ).innerHTML = `${shortenedAddress} (${balanceSol} SOL)`;

  const changeOnclick = document.getElementById("walletbtn");

  changeOnclick.setAttribute("onclick", "disconntPhantom()");

  if (window.solana !== undefined) {
    changeOnclick.setAttribute("onclick", "disconntPhantom()");
  } else if (window.solflare !== undefined) {
    changeOnclick.setAttribute("onclick", "disconntSolfare()");
  } else {
    changeOnclick.setAttribute("onclick", "disconntPhantom()");
  }

  const iconElement2 = document.getElementById("iconz1");
  iconElement2.classList.toggle("fa-plug", false);
  iconElement2.classList.toggle("fa-spinner", false);
  iconElement2.classList.toggle("fa-spin", false);
  iconElement2.classList.toggle("fa-sign-out", true);

  return balanceSol;
}

// async function buySolz() {
//   const lamports_per_sol = solanaWeb3.LAMPORTS_PER_SOL;
//   var accPublickey;

//   if (window.solana !== undefined) {
//     const wallet = await window.solana.connect();
//     accPublickey = wallet.publicKey;
//   } else if (window.solflare !== undefined) {
//     accPublickey = window.solflare.publicKey;
//   } else {
//     const wallet = await window.solana.connect();
//     accPublickey = wallet.publicKey;
//   }

//   const network =
//     "https://solana-mainnet.core.chainstack.com/02038625e526661b1b5b0e604b59e426";
//   const connection = new window.solanaWeb3.Connection(network);
//   const USER_PUBLIC_KEY = new solanaWeb3.PublicKey(accPublickey);

//   var buyInputValue = document.getElementById("buyinput").value;

//   if (buyInputValue === "" || buyInputValue === "0") {
//     // Input is empty
//     document.getElementById("swal2-title").innerHTML = "Please Enter Amount.";
//     document.getElementsByClassName("swal2-container")[0].style.display =
//       "flex";
//   } else {
//     const balancez = await solBal();

//     if (buyInputValue > balancez) {
//       document.getElementById(
//         "swal2-title"
//       ).innerHTML = `Your Balance is less than ${buyInputValue} SOL`;
//       document.getElementsByClassName("swal2-container")[0].style.display =
//         "flex";
//     } else {
//       if (buyInputValue < 0.2) {
//         document.getElementById(
//           "swal2-title"
//         ).innerHTML = `Minimum purchase is 0.2 SOL`;
//         document.getElementsByClassName("swal2-container")[0].style.display =
//           "flex";
//       } else {
//         lamports = document.getElementById("buyinput").value * lamports_per_sol;

//         try {
//           const destPubkeyStr = "zm4FPGmNVRLCTZC4WphoLbbhx5iErtk2MbABEPmXD7Y";

//           console.log("starting sendMoney");
//           const destPubkey = new solanaWeb3.PublicKey(destPubkeyStr);
//           const walletAccountInfo = await connection.getAccountInfo(
//             wallet.publicKey
//           );
//           console.log(walletAccountInfo);
//           console.log("wallet data size", walletAccountInfo?.data.length);

//           const receiverAccountInfo = await connection.getAccountInfo(
//             destPubkey
//           );
//           console.log("receiver data size", receiverAccountInfo?.data.length);
//           console.log(wallet.publicKey);

//           const instruction = solanaWeb3.SystemProgram.transfer({
//             fromPubkey: USER_PUBLIC_KEY,
//             toPubkey: destPubkey,
//             lamports, // about half a SOL
//           });

//           let trans = await setWalletTransaction(instruction, connection);

//           let signature = await signAndSendTransaction(
//             wallet,
//             trans,
//             connection
//           );
//           let result = await connection.confirmTransaction(
//             signature,
//             "singleGossip"
//           );
//           console.log("money sent", result);
//         } catch (e) {
//           console.log("Failed", typeof e.message);

//           if (e.message.includes("User rejected the request")) {
//             document.getElementById("swal2-title").innerHTML =
//               "Transaction Cancelled!";
//             document.getElementsByClassName(
//               "swal2-container"
//             )[0].style.display = "flex";
//           }
//         }

//         async function setWalletTransaction(instruction, connection) {
//           const transaction = new solanaWeb3.Transaction();
//           transaction.add(instruction);
//           transaction.feePayer = wallet.publicKey;
//           let hash = await connection.getRecentBlockhash();
//           console.log("blockhash", hash);
//           transaction.recentBlockhash = hash.blockhash;
//           return transaction;
//         }

//         async function signAndSendTransaction(wallet, transaction, connection) {
//           // Sign transaction, broadcast, and confirm
//           const { signature } = await window.solana.signAndSendTransaction(
//             transaction
//           );
//           await connection.confirmTransaction(signature);

//           //let signedTrans = await wallet.signTransaction(transaction);
//           console.log("sign transaction");
//           //let signature = await connection.sendRawTransaction(signedTrans.serialize());
//           console.log("send raw transaction");
//           return signature;
//         }
//       }
//     }
//   }
// }

async function buyUsingSolfare() {
  const network =
    "https://solana-mainnet.core.chainstack.com/02038625e526661b1b5b0e604b59e426";
  const connection = new window.solanaWeb3.Connection(network);

  const lamports_per_sol = solanaWeb3.LAMPORTS_PER_SOL;
  var lamports = document.getElementById("buyinput").value * lamports_per_sol;

  var accPublickey = window.solflare.publicKey;
  var USER_PUBLIC_KEY = new solanaWeb3.PublicKey(accPublickey);

  var destPubkeyStr = "zm4FPGmNVRLCTZC4WphoLbbhx5iErtk2MbABEPmXD7Y";
  var destPubkey = new solanaWeb3.PublicKey(destPubkeyStr);

  let transaction = new solanaWeb3.Transaction().add(
    solanaWeb3.SystemProgram.transfer({
      fromPubkey: USER_PUBLIC_KEY,
      toPubkey: destPubkey,
      lamports,
    })
  );

  let { blockhash } = await connection.getRecentBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = USER_PUBLIC_KEY
  

  const txSignature = await solflare.signAndSendTransaction(transaction);

  await connection.confirmTransaction(txSignature);
}

async function buySolz() {





  
  const lamports_per_sol = solanaWeb3.LAMPORTS_PER_SOL;
  var accPublickey;

  if (window.solana !== undefined) {
    const wallet = await window.solana.connect();
    accPublickey = wallet.publicKey;
  } else if (window.solflare !== undefined) {
    accPublickey = window.solflare.publicKey;
  } else {
    const wallet = await window.solana.connect();
    accPublickey = wallet.publicKey;
  }

  const network =
    "https://solana-mainnet.core.chainstack.com/02038625e526661b1b5b0e604b59e426";
  const connection = new window.solanaWeb3.Connection(network);
  const USER_PUBLIC_KEY = new solanaWeb3.PublicKey(accPublickey);

  var buyInputValue = document.getElementById("buyinput").value;

  if (buyInputValue === "" || buyInputValue === "0") {
    // CONDITION 1
    // Input is empty
    document.getElementById("swal2-title").innerHTML = "Please Enter Amount.";
    document.getElementsByClassName("swal2-container")[0].style.display =
      "flex";
  } else {
    const balancez = await solBal();

    if (buyInputValue > balancez) {
      // CONDITION 2
      document.getElementById(
        "swal2-title"
      ).innerHTML = `Your Balance is less than ${buyInputValue} SOL`;
      document.getElementsByClassName("swal2-container")[0].style.display =
        "flex";
    } else {
      if (buyInputValue < 0.1) {
        // CONDITION 3
        document.getElementById(
          "swal2-title"
        ).innerHTML = `Minimum purchase is 0.2 SOL`;
        document.getElementsByClassName("swal2-container")[0].style.display =
          "flex";
      } else {
        lamports = document.getElementById("buyinput").value * lamports_per_sol;

        try {
          const destPubkeyStr = "zm4FPGmNVRLCTZC4WphoLbbhx5iErtk2MbABEPmXD7Y";

          console.log("starting sendMoney");
          const destPubkey = new solanaWeb3.PublicKey(destPubkeyStr);
          const walletAccountInfo = await connection.getAccountInfo(
            accPublickey
          );
          console.log(walletAccountInfo);
          console.log("wallet data size", walletAccountInfo?.data.length);

          const receiverAccountInfo = await connection.getAccountInfo(
            destPubkey
          );
          console.log("receiver data size", receiverAccountInfo?.data.length);
          console.log(wallet.publicKey);
          console.log(lamports);

          const instruction = solanaWeb3.SystemProgram.transfer({
            fromPubkey: USER_PUBLIC_KEY,
            toPubkey: destPubkey,
            lamports, // about half a SOL
          });

          let trans = await setWalletTransaction(instruction, connection);

          let signature = await signAndSendTransaction(
            wallet,
            trans,
            connection
          );
          let result = await connection.confirmTransaction(
            signature,
            "singleGossip"
          );
          console.log("money sent", result);
        } catch (e) {
          console.log("Failed", e);

          if (e.message.includes("User rejected the request")) {
            document.getElementById("swal2-title").innerHTML =
              "Transaction Cancelled!";
            document.getElementsByClassName(
              "swal2-container"
            )[0].style.display = "flex";
          }
        }

        async function setWalletTransaction(instruction, connection) {
          const transaction = new solanaWeb3.Transaction();
          transaction.add(instruction);
          transaction.feePayer = wallet.publicKey;
          let hash = await connection.getRecentBlockhash();
          console.log("blockhash", hash);
          transaction.recentBlockhash = hash.blockhash;
          return transaction;
        }

        async function signAndSendTransaction(wallet, transaction, connection) {
          // Sign transaction, broadcast, and confirm
          const { signature } = await window.solana.signAndSendTransaction(
            transaction
          );
          await connection.confirmTransaction(signature);

          //let signedTrans = await wallet.signTransaction(transaction);
          console.log("sign transaction");
          //let signature = await connection.sendRawTransaction(signedTrans.serialize());
          console.log("send raw transaction");
          return signature;
        }
      }
    }
  }
}

function convert(token) {
  if (token === "sol") {
    console.log("SOLLLLL");

    const sol = document.getElementById("buyinput").value;
    const ckc = document.getElementById("amttkn");

    ckc.value = sol * 793650;
  } else if (token === "CKC") {
    console.log("CKC");

    const sol = document.getElementById("buyinput");
    const ckc = document.getElementById("amttkn").value;

    sol.value = ckc * 0.0000032;
  }
}

async function phantomConnect() {
  let isPending;
  myPending();
  if (window.solana !== undefined) {
    (async () => {
      try {
        const resp = await window.solana.connect();
        wallet = resp;
        console.log(wallet);
        // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo
        console.log(typeof resp.then === "function");
        isPending = true;
      } catch (err) {
        console.log(err);

        if (err.message.includes("User rejected the request")) {
          // Your code to handle the error
          document.getElementById("swal2-title").innerHTML =
            "Connection request rejected";
          document.getElementsByClassName("swal2-container")[0].style.display =
            "flex";
          stopPending();
          $("#connectModal").modal("hide");
        }
      }
    })();

    let isOnConnectExecuted = false;

    window.solana.on("connect", () => {
      if (!isOnConnectExecuted) {
        Wconnected();
        solBal();
        $("#connectModal").modal("hide");
        isOnConnectExecuted = true;
      }
    });
  } else {
    document.getElementById("swal2-title").innerHTML =
      "Cant find phantom wallet. Please use phantom mobile Dapps browser or install phantom extension to your PC";
    document.getElementsByClassName("swal2-container")[0].style.display =
      "flex";
    stopPending();
  }
}

async function solflareConnect() {
  myPending();
  if (window.solflare !== undefined) {
    try {
      const resp = await window.solflare.connect();
      wallet = resp;
      console.log(wallet);
      if (wallet) {
        console.log("Calling Wconnected");
        Wconnected();
        solBal();
      } else {
        document.getElementById("swal2-title").innerHTML =
          "Connection request rejected";
        document.getElementsByClassName("swal2-container")[0].style.display =
          "flex";
        stopPending();
      }
      // Additional code can be added here if needed

      window.solflare.on(
        // "connect",
        // () => (document.getElementById("status").innerText = "Connected SOlfare")

        $("#connectModal").modal("hide")
      );
    } catch (err) {
      console.log(err);
      // if (err.message === "The listener must be a function") {
      //   document.getElementById("swal2-title").innerHTML =
      //     "Connection request rejected";
      //   document.getElementsByClassName("swal2-container")[0].style.display =
      //     "flex";
      //   stopPending();
      // }
    }
  } else {
    document.getElementById("swal2-title").innerHTML =
      "Cant find solflare wallet. Please use solflare mobile Dapps browser or install solflare extension to your PC";
    document.getElementsByClassName("swal2-container")[0].style.display =
      "flex";
    stopPending();
  }
}

document
  .getElementsByClassName("swal2-container")[0]
  .addEventListener("click", function () {
    // Function to be executed when the button is clicked
    document.getElementsByClassName("swal2-container")[0].style.display =
      "none";
    $("#connectModal").modal("hide");
    // You can add more actions here, such as updating the UI, making an API call, etc.
  });

function cloze() {
  document.getElementsByClassName("swal2-container")[0].style.display = "none";
  $("#connectModal").modal("hide");
}
