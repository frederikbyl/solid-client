import {
    getSolidDataset,
    getThing,
    getThingAll,
    getStringNoLocale
  } from "@inrupt/solid-client";
  
  import { Session } from "@inrupt/solid-client-authn-browser";
  
  import { VCARD } from "@inrupt/vocab-common-rdf";
  
  
  const session = new Session();
  
  const buttonLogin = document.querySelector("#btnLogin");
  const buttonRead = document.querySelector("#btnRead");
  var x = document.getElementById("read");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  // 1a. Start Login Process. Call session.login() function.
  async function login() {
    if ( !session.info.isLoggedIn ) {
      await session.login({
        oidcIssuer: "https://inrupt.net",
        redirectUrl: window.location.href,
      });
    }
  }
  
  // 1b. Login Redirect. Call session.handleIncomingRedirect() function.
  // When redirected after login, finish the process by retrieving session information.
  async function handleRedirectAfterLogin() {
  
    await session.handleIncomingRedirect(window.location.href);
  
    if (session.info.isLoggedIn) {
      // Update the page with the status.
      document.getElementById("labelStatus").textContent = "Successfully shared your FINTWIN, you will receive a 20% discount on your next 3 purchases.";
      document.getElementById("labelStatus").setAttribute("role", "alert");

      buttonLogin.textContent="Frederik";
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }

    
  
     getTransactions()
     
            

    }
  }
  
  // The example has the login redirect back to the index.html.
  // This calls the function to process login information.
  // If the function is called when not part of the login redirect, the function is a no-op.
  handleRedirectAfterLogin();




async function getTransactions() {
  const podUrl = "https://frederikbyl.inrupt.net";//document.getElementById("PodURL").value;
  const transactionsUrl = `${podUrl}/BE91731073107310/transactions`;

  try {
   
    // Refetch the Reading List
    let savedTransactionList = await getSolidDataset(
      transactionsUrl,
      { fetch: session.fetch } 
    );

    let items = getThingAll(savedTransactionList);

    var target = document.getElementById("result");
     var output = `
            <div class="container">
                <div class="row">
                    <div class="col">
                       fdsfdsf
                    </div>
                    <div class="col">
                       fsdfdsf
                    </div>
                </div>

                
            </div>
        `;

    for (let i = 0; i < items.length; i++) {
      let title = getStringNoLocale(items[i],  "https://schema.org/MoneyTransfer#name");
      let amount = getStringNoLocale(items[i], "https://schema.org/MoneyTransfer#amount");
      console.log(title);
      console.log(amount);
      var itemhtml = '<div class="row"><div class="col">'+title+'</div><div class="col">'+amount+'</div></div>';
      target.innerHTML+=itemhtml;
    }

    target.innerHTML += '</div>'
   // document.getElementById("savedtitles").value = listcontent; 
  
  } catch (error) {
    console.log(error);
    alert("ERROR: UNAUTHORIZED ACCESS BLOCKED: "+error);
  }
 
}
 
  
  buttonLogin.onclick = function() {  
    login();
  };
  