import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';

import QRScanner from './qrscanner.js';
import t from 'tcomb-form-native';
const Form = t.form.Form;

import styles from './styles.js';
import submitLogin from './submitlogin.js';
import getSecretKey from './getsecretkey.js';
import sendTransaction from './sendtransaction.js';

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
  }

  setProduct(product) {
    this.setState({product: product});
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