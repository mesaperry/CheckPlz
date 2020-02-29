import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';

import QRScanner from './qrscanner.js';
import t from 'tcomb-form-native';
const Form = t.form.Form;

import styles from './styles.js';
import submitLogin from './submitlogin.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {page: 'home'};

    this.goTo = this.goTo.bind(this);
  }

  goTo(target) {
    this.setState({page: target});
  }

  render() {
    if (this.state.page === 'home') {
      return <Home goTo={this.goTo}/>;
    }
    if (this.state.page === 'vendor') {
      return <Vendor goTo={this.goTo}/>;
    }
    if (this.state.page === 'buyer') {
      return <QRScanner goTo={this.goTo}/>;
    }
    if (this.state.page === 'login') {
      return <Login goTo={this.goTo}/>;
    }
  }
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.goTo = props.goTo;
  }

  render() {
    return (
      <View style={styles.home}>
        <Text style={styles.title}>SKULL FUKKER</Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.goTo('vendor')}
            title="Vendor"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.goTo('buyer')}
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
    this.goTo = props.goTo;
  }

  render() {
    return (
      <View style={styles.home}>
        <Text>Vendor placeholder</Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.goTo('home')}
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
    this.goTo = props.goTo;
    this.state = {
      email: '',
      password: '',
      invalid: false
    }
  }

  processLogin(email, password) {
    var key = submitLogin(email, password);
    if (!key) {
      this.setState({invalid: true});
      return;
    }
    
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
            onPress={() => this.goTo('home')}
            title="Go back"
          />
        </View>
      </View>
    );
  }
}
