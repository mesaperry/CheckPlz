import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';

import QRScanner from './qrscanner.js';
import t from 'tcomb-form-native';
const Form = t.form.Form;

import styles from './styles.js';
import submitLogin from './submitlogin.js';
import getSecretKey from './getsecretkey.js';
import sendTransaction from './sendtransaction.js';

    
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

    rootRef.on("value", snap => {
        var email = snap.child(child).val();
        console.log(email)
    }).then(() => {firebase.database().goOffline();});
    
}

// read(12345, 'email')

function writeUserData(userId, email, secret_key) {
    firebase.database().goOnline();

    console.log("ATTEMPT DATA WRITE")
    console.log(userId)
    firebase.database().ref(userId).set({
        email: email,
        secret_key: secret_key
    }).then(() => {firebase.database().goOffline();});;

    
}

// const fetch = require("node-fetch");
const global_auth = "f7a6f17719994b80237fd372ca7735d1:839f1e2235496fd7f0fc266fb34a04e4";



async function sendCheckToUser(sender, recieverEmail) {
    try {

    //first need to get the right info from firebase


    //the below will probably go in the firebase callback
    var data = `{\"recipient\":\"${recieverEmail}\",\"name\":\"John Mayer\",\"amount\":5,\"description\":\"Test Check\"}`;
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

  // createNewUser("John Mayer", "jmayor@mayor.com")


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'home',
      product: undefined,
      secret_key: undefined,
    };

    this.setPage = this.setPage.bind(this);
    this.setProduct = this.setProduct.bind(this);
    this.setSecretKey = this.setSecretKey.bind(this);
    this.getTransaction = this.getTransaction.bind(this);
    this.funct = {
      setPage: this.setPage,
      setProduct: this.setProduct,
      setSecretKey: this.setSecretKey,
      getTransaction: this.getTransaction
    };
  }

  setPage(page) {
    this.setState({page: page});
    // this.state.product = "product"
  }

  setProduct(product) {
    console.log('works')
    console.log(this.state)
    this.setState({product: 'test'});
    // this.setState((state) => {
    //   // Important: read `state` instead of `this.state` when updating.
    //   return {product: 'test'}
    // });
    console.log(this.state)
  }

  setSecretKey(secret_key) {
    this.setState({secret_key: secret_key});
  }

  getTransaction() {
    return ({
      secret_key: this.state.secret_key,
      price: this.state.product.price,
      recipient: this.state.product.vendor_email,
      product_name: this.state.product.name
    });
  }

  render() {
    if (this.state.page === 'home') {
      return <Home funct={this.funct} />;
    }
    if (this.state.page === 'vendor') {
      return <Vendor funct={this.funct} />;
    }
    if (this.state.page === 'buyer') {
      return <QRScanner funct={this.funct} />;
    }
    if (this.state.page === 'login') {
      return <Login funct={this.funct} />;
    }
    if (this.state.page === 'confirm') {
      return <Confirm funct={this.funct} />
    }
    if (this.state.page === 'complete') {
      return <Complete funct={this.funct} />
    }
  }
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.funct = props.funct;
  }

  render() {
    return (
      <View style={styles.home}>
        <Text style={styles.title}>SKULL FUKKER</Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.funct.setPage('vendor')}
            title="Vendor"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.funct.setPage('buyer')}
            title="Buyer"
          />
        </View>
      </View>
    );
  }
}

class Vendor extends Component {
  constructor(props) {
    super(props);
    this.funct = props.funct;
  }

  render() {
    return (
      <View style={styles.home}>
        <Text>Vendor placeholder</Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.funct.setPage('home')}
            title="Go back"
          />
        </View>
      </View>
    );
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.funct = props.funct;
    this.state = {
      email: '',
      password: '',
      invalid: false
    }
  }

  processLogin(email, password) {
    var uid = submitLogin(email, password);
    if (!uid || !email) {
      this.setState({invalid: true});
      return;
    }
    var secret_key = getSecretKey(uid);
    this.funct.setSecretKey(secret_key);
    this.funct.setPage('confirm');
  }

  render() {
    return (
      <View style={styles.home}>
        { this.state.invalid && ( <Text>Invalid email</Text> )}
        <TextInput
          style={styles.input}
          placeholder='Email'
          onChangeText={(text) => this.setState({email: text})}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          onChangeText={(text) => this.setState({password: text})}
        />
        
        <TextInput
          style={styles.input}
          placeholder={JSON.stringify(this.state)}
          
        />
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {this.processLogin(this.state.email, this.state.password)}}
            title="Submit"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.funct.setPage('home')}
            title="Go back"
          />
        </View>
      </View>
    );
  }
}

class Confirm extends Component {
  constructor(props) {
    super(props);
    this.funct = props.funct;
  }

  render() {
    var transaction = this.funct.getTransaction();
    return (
      <View style={styles.home}>
        <Text style={styles.title}>Confirmation</Text>
        <Text style={{fontSize: 15, margin: 5}}>Product name</Text>
        <Text>{transaction.product_name}</Text>
        <Text style={{fontSize: 15, margin: 5}}>Transaction price</Text>
        <Text>{transaction.price}</Text>
        <Text style={{fontSize: 15, margin: 5}}>Recipient</Text>
        <Text>{transaction.recipient}</Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              sendTransaction(transaction);
              this.funct.setPage('complete');
            }}
            title="Confirm"
          />
        </View>
      </View>
    );
  }
}

class Complete extends Component {
  constructor(props) {
    super(props);
    this.funct = props.funct;
  }
  render() {
    return (
      <View style={styles.home}>
      <Text style={styles.title}>Transaction complete</Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => this.funct.setPage('home')}
          title="Go home"
        />
      </View>
      </View>
    );
  }
}








