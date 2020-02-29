const fetch = require("node-fetch");
const global_auth = "f7a6f17719994b80237fd372ca7735d1:839f1e2235496fd7f0fc266fb34a04e4";

async function createNewUser(name, email) {
    try {
    
    var data = `{\"user_id\":\"${email}\",\"name\":\"${name}\"}`;

      let response = await fetch("https://sandbox.checkbook.io/v3/user", {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-Type': 'application/json',
            'authorization': global_auth
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

result = createNewUser('liaamameya', 'lasdfasdaamameya@poogle.com').then(function(result) {
    //result has the data
    //send to firebase thing
    //push this info to firebase
 });

async function sendCheckToUser(sender, reciever) {
    try {

    //first need to get the right info from firebase
    
    //the below will probably go in the firebase callback
    var data = `{\"recipient\":\"${reciever.get('user_id')}\",\"name\":\"John Mayer\",\"amount\":5,\"description\":\"Test Check\"}`;

      let response = await fetch("https://sandbox.checkbook.io/v3/check/digital", {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-Type': 'application/json',
            'authorization': `${sender['key']}:${sender['secret']}`
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
 




//add bank account 
async function addBankAccount(user, accountNum , accountType) {
    try {
    
    var data = `{\"routing\":\"021000021\",\"account\":\"${accountNum}\",\"type\":\"${accountType}\"}}`;

      let response = await fetch("https://sandbox.checkbook.io/v3/bank", {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-Type': 'application/json',
            'authorization': `${user['key']}:${user['secret']}`
        },
        body: data,
        }).then( () => {
            //here call verficiation

        });
      let responseJson = await response.json();
      console.log(responseJson)
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }


async function verifyMicroDeposit(user) {
    try {

    //first need to get the right info from firebase


    //the below will probably go in the firebase callback
    var data = `{\"recipient\":\"${reciever.get('user_id')}\",\"name\":\"John Mayer\",\"amount\":5,\"description\":\"Test Check\"}`;

      let response = await fetch("https://sandbox.checkbook.io/v3/bank/verify", {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-Type': 'application/json',
            'authorization': `${sender['key']}:${sender['secret']}`
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


  // function createNewServer(name, email) {

//     //if the email already exists in the firebase don't create this shit
//     var data = `{\"user_id\":\"${email}\",\"name\":\"${name}\"}`;

    
//     let response = fetch("https://sandbox.checkbook.io/v3/user", {
//         method: 'POST',
//         headers: {
//             'accept': 'application/json',
//             'content-Type': 'application/json',
//             'authorization': global_auth
//         },
//         body: data,
//         }).then((response) => {
//             return response.json();
//           })
//           .then((data) => {
//             console.log(data);
//           });

    

//     // var xhr = new XMLHttpRequest();

//     // xhr.addEventListener("readystatechange", function () {
//     // if (this.readyState === this.DONE) {
//     //     console.log(this.responseText);
//     // }
//     // });

//     // xhr.open("POST", "https://sandbox.checkbook.io/v3/user");
//     // xhr.setRequestHeader("accept", "application/json");
//     // xhr.setRequestHeader("content-type", "application/json");
//     // xhr.setRequestHeader("authorization", `${global_auth}`)

//     // xhr.send(data);

//     // console.log(data)
//     // console.log(name,email)
//     // console.log(xhr.response)
// }
 
// createNewServer('oogle poogle', 'oogle@poogle.com')