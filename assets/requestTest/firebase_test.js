    
// var firebase = require("firebase/app");

// // Add the Firebase products that you want to use
// require("firebase/auth");
// require("firebase/database")


// // Your web app's Firebase configuration
// let firebaseConfig = {
//     apiKey: "AIzaSyAyQX877wOO217haEL0yRY4GREhXFFuT00",
//     authDomain: "hackillinois2020.firebaseapp.com",
//     databaseURL: "https://hackillinois2020.firebaseio.com",
//     projectId: "hackillinois2020",
//     storageBucket: "hackillinois2020.appspot.com",
//     messagingSenderId: "70394633571",
//     appId: "1:70394633571:web:9f8c54485d5240ad024756",
//     measurementId: "G-WM1X40BVL1"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);


// // key is the qr_id in this case and the child would whatever value you wanted
// // for example, key could be 12345 and child could be either email, price, or product

// // alternatively, if you're looking for a secret key, key would be the user id (some long string)
// // and child would be "secret_key" or "email" if you were trying to get an email from a user id
// function read(key, child) {
//     var rootRef = firebase.database().ref().child(key);

//     //window.alert("test");
//     // window.alert(rootRef)
//     // console.log(rootRef)

//     rootRef.on("value", snap => {
//         var email = snap.child(child).val();
//         console.log(email)
//         firebase.database().goOffline();
//     });
    
// }

// read(12345, 'email')

// function writeUserData(userId, email, secret_key) {
//     firebase.database().ref(userId).set({
//         email: email,
//         secret_key: secret_key
//     }).then(() => {firebase.database().goOffline();});

//     // firebase.database().goOffline();
// }

// writeUserData('010101', 'fake@fake.com', '1234')

