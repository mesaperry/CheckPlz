// referenced from https://stackoverflow.com/questions/57264546/how-to-make-a-qr-code-scanner-in-react-native-using-expo

import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button
} from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { WebView } from 'react-native-webview';

import {
  BarCodeScanner
} from 'expo-barcode-scanner';

import styles from './styles';

import RESTfunct from './requestsOfficial.js';

export default class QRScanner extends React.Component {
  constructor(props) {
    super(props);
    this.funct = props.funct;
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      product: {
        name: '',
        vendor_email: '',
        price: ''
      },
      qr_id: ''
    }
  }

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async() => {
    const {
      status
    } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted'
    });
  };


  render() {
    const {
      hasCameraPermission,
      scanned
    } = this.state;

    if (hasCameraPermission === null) {
      return <Text > Requesting
      for camera permission </Text>;
    }
    if (hasCameraPermission === false) {
      return <Text > No access to camera </Text>;
    }

    if (!scanned) {
      return (
        <View style = {styles.scanner}>
          <BarCodeScanner onBarCodeScanned = {
            scanned ? undefined : this.handleBarCodeScanned
          }
          style = {
            StyleSheet.absoluteFillObject
          }/>

          <View style={styles.buttonContainer}>
            <Button
              onPress={() => this.funct.setPage('home')}
              title="Go back"
            />
          </View>
        </View>
      );
    }
    else {
      while (this.state.product.name === undefined) {
        var waste = 1 + 2;
      }
      return (
        <View style={styles.scanner_alt}>
          <View style={styles.scanner_alt_top}>
            <Text>{this.state.product.name}</Text>
            <Text>{this.state.product.price}</Text>
            <Text>{this.state.product.vendor_email}</Text>
          </View>
          <WebView
            source={{ uri: 'https://alexguan8.github.io/arhost/' + this.state.qr_id }}
            style={{ height:720 }}
          />
          <View style={styles.doubleButtons}>
            <View style={styles.buttonContainer}>
              <Button title = { 'Scan again' } onPress = {() => this.setState({scanned: false})}/>
            </View>
            <View style={styles.buttonContainer}>
              <Button title = { 'Purchase' } onPress = {() => this.funct.setPage('login')}/>
            </View>
          </View>
        </View>
      )
    }
  }

  handleBarCodeScanned = ({type, data}) => {
    RESTfunct.getProduct.name(data, (name_) => {
      this.state.product.name = name_;
      this.funct.setProduct('name', name_);
    });
    RESTfunct.getProduct.vendor_email(data, (vendor_email_) => {
      this.state.product.vendor_email = vendor_email_;
      this.funct.setProduct('vendor_email', vendor_email_);
    });
    RESTfunct.getProduct.price(data, (price_) => {
      this.state.product.price = price_;
      this.funct.setProduct('price', price_);
    });
    this.setState({
      scanned: true,
      qr_id: data
    });
  };
}