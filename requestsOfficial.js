

var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/database")


// Your web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyAyQX877wOO217haEL0yRY4GREhXFFuT00",
    authDomain: "hackillinois2020.firebaseapp.com",
    databaseURL: "https://hackillinois2020.firebaseio.com",
    projectId: "hackillinois2020",
    storageBucket: "hackillinois2020.appspot.com",
    messagingSenderId: "70394633571",
    appId: "1:70394633571:web:9f8c54485d5240ad024756",
    measurementId: "G-WM1X40BVL1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// key is the qr_id in this case and the child would whatever value you wanted
// for example, key could be 12345 and child could be either email, price, or product

// alternatively, if you're looking for a secret key, key would be the user id (some long string)
// and child would be "secret_key" or "email" if you were trying to get an email from a user id
function read(key, child) {
    var rootRef = firebase.database().ref().child(key);

    
    //window.alert("test");
    // window.alert(rootRef)
    // console.log(rootRef)

    let email;
    rootRef.on("value", snap => {
        email = snap.child(child).val();
        console.log(email)
        firebase.database().goOffline();
        return email;
    });

    console.log(email)
    return email;

    // firebase.database().goOffline();
    
}


function writeUserData(userId, email, secret_key) {
    firebase.database().goOnline();

    console.log("ATTEMPT DATA WRITE")
    console.log(userId)
    firebase.database().ref(userId).set({
        email: email,
        secret_key: secret_key
    }).then(() => {firebase.database().goOffline();});;

    
}

const fetch = require("node-fetch");
const global_auth = "f7a6f17719994b80237fd372ca7735d1:839f1e2235496fd7f0fc266fb34a04e4";



async function sendCheckToUser(sender, recieverEmail, amount) {
    try {

    //first need to get the right info from firebase


    //the below will probably go in the firebase callback
    var data = `{\"recipient\":\"${recieverEmail}\",\"name\":\"John Mayer\",\"amount\":${amount},\"description\":\"Test Check\"}`;
        console.log(data)
      let response = await fetch("https://sandbox.checkbook.io/v3/check/digital", {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-Type': 'application/json',
            'authorization': `${sender}`
        },
        body: data,
        });
      let responseJson = await response.json();
      console.log(responseJson)
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }
 

// console.log(sendCheckToUser('8ebfd5cc92a84fee92680ce94fa7d2bc:r63LL14nVScEADTMkXVYsjINt0qiV7', 'msp@gitconnect.io', 100))
// console.log(emailToSecret("jmayor@mayor.com"))

// sendCheckToUser('23d1092da427469085d72cb201674e63:wKtFwrKpLvAlJeRpnyJGWkkP6DTgVA', 'labalawren@gitconnect.io')



async function verifyMicroDeposit(secret_key) {
    try {

    //first need to get the right info from firebase


    //the below will probably go in the firebase callback
    var data = "{\"amount_1\":0.07,\"amount_2\":0.15}";

      let response = await fetch("https://sandbox.checkbook.io/v3/bank/verify", {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-Type': 'application/json',
            'authorization': `${secret_key}`
        },
        body: data,
        });
      
    } catch (error) {
      console.error(error);
    }
  }

//add bank account 
async function addBankAccount(secret_key, accountNum , accountType) {
    try {
    
    console.log(accountNum)
    var data = `{\"routing\":\"021000021\",\"account\":\"${accountNum}\",\"type\":\"${accountType}\"}`;
        console.log(data)
        console.log(secret_key)
      let response = await fetch("https://sandbox.checkbook.io/v3/bank", {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-Type': 'application/json',
            'authorization': `${secret_key}`
        },
        body: data,
        }).then( () => {
            //here call verficiation
            verifyMicroDeposit(secret_key);

        });
        let responseJson = await response
        console.log(responseJson)
        return responseJson;
    } catch (error) {
      console.error(error);
    }
  }
      
  async function createNewUser(name, email) {
    try {

    
    //before you do this add a check in the get all dictionary for this email
    
    var data = `{\"user_id\":\"${email}\",\"name\":\"${name}\"}`;

      let response = await fetch("https://sandbox.checkbook.io/v3/user", {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-Type': 'application/json',
            'authorization': global_auth
        },
        body: data,
        }).then(   

        );
      let responseJson = await response.json();
      console.log(responseJson)
      console.log(typeof responseJson)

      
      writeUserData(`${responseJson.id}`, `${email}`, `${responseJson.key}:${responseJson.secret}`);

      addBankAccount(`${responseJson.key}:${responseJson.secret}`, `12340000`, 'CHECKING')

      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }



  async function emailToSecret(email) {

    try {

    
    //before you do this add a check in the get all dictionary for this email
    

      let response = await fetch("https://sandbox.checkbook.io/v3/user/list", {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'content-Type': 'application/json',
            'authorization': global_auth
        },
        }).then(   

        );
        let responseJson = await response.json();
        // console.log(responseJson)
        // console.log(typeof responseJson)


        //now get the email
        for (i = 0; i < responseJson.users.length; i++) {
            // console.log(responseJson.users[i].user_id)
            if (responseJson.users[i].user_id == email) {
                // console.log(responseJson.users[i].id);
                // console.log(read('c5b37975a6584413bce649c3911aa9c9', 'secret_key'))
                return (read(`${responseJson.users[i].id}`, 'secret_key'))
            }
        } 
        return null;
        // return responseJson;
    } catch (error) {
      console.error(error);
    }

  }



var RESTfunct = {
    emailToSecret: emailToSecret,
    getProduct: (qr_id) => {
        console.log("GET PRODUCT RUNNING")
        return {
            name: read(qr_id, 'product'),
            vendor_email: read(qr_id, 'email'),
            price: read(qr_id, 'price')
        };
    },
    sendTransaction: sendCheckToUser
};

export default RESTfunct;