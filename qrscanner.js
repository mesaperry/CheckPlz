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

export default class QRScanner extends React.Component {
  constructor(props) {
    super(props);
    this.goTo = props.goTo;
  }

  state = {
    hasCameraPermission: null,
    scanned: false,
  };

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
              <Text>{this.state.data}</Text>
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
                <Button title = { 'Purchase' } onPress = {() => this.goTo('login')}/>
              </View>
            </View>)
          }
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => this.goTo('home')}
              title="Go back"
            />
          </View>
        </View>
      </View>
    );
  }

  handleBarCodeScanned = ({
    type,
    data
  }) => {
    this.setState({
      scanned: true,
      data: data
    });
  };
}