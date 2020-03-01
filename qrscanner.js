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
      }
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
    
    return (
      <View style = {styles.scanner}>
        <View style = {styles.scanner_top}>
          { scanned && (
            <View style = {styles.home}>
              <Text style={{fontSize: 15, margin: 5}}>Scanned</Text>
            </View>
          )}
        </View>

        <BarCodeScanner onBarCodeScanned = {
          scanned ? undefined : this.handleBarCodeScanned
        }
        style = {
          StyleSheet.absoluteFillObject
        }/>

        <View>
          { scanned && (
            <View style={styles.doubleButtons}>
              <View style={styles.buttonContainer}>
                <Button title = { 'Scan again' } onPress = {() => this.setState({scanned: false})}/>
              </View>
              <View style={styles.buttonContainer}>
                <Button title = { 'Purchase' } onPress = {() => this.funct.setPage('login')}/>
              </View>
            </View>)
          }
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => this.funct.setPage('home')}
              title="Go back"
            />
          </View>
        </View>
      </View>
    );
  }

  handleBarCodeScanned = ({type, data}) => {
    this.setState({ scanned: true })
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
  };
}