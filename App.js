import * as React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Header } from 'react-native-elements';
import * as Speech from 'expo-speech';
import { LinearGradient } from 'expo-linear-gradient';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      scanned: false,
      scanneddata: '',
      pressed: 'normal',
      permission: null,
    };
  }

  speak = () => {
    var tosay = this.state.text;
    var toosay = this.state.scanneddata;
    Speech.speak(tosay || toosay);
  };

  getpermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      permission: status === 'granted',
      pressed: 'click',
      scanned: false,
    });
  };

  codescanner = async ({ type, data }) => {
    this.setState({ scanneddata: data, scanned: true, pressed: 'normal' });
  };

  render() {
    if (this.state.pressed === 'click' && this.state.permission) {
      return (
        <BarCodeScanner
          style={StyleSheet.absoluteFillObject}
          onBarCodeScanned={this.state.scanned ? undefined : this.codescanner}
        />
      );
    } else if (this.state.pressed === 'normal') {
      return (
        <View style={{flex:1}}>
          <LinearGradient
            colors={[
              '#A7014B',
              '#87016B',
              '#810173',
              '#4C00A6',
              '#4D00A7',
              '#3700BC',
            ]}>
            <Header
              backgroundColor="#B53332"
              centerComponent={{
                text: 'Text-Speech Converter',
                style: { fontWeight: 'bold', fontSize: 17 },
              }}
              leftComponent={{ icon: 'menu' }}
              rightComponent={{ icon: 'home' }}
            />
            <View style={Styles.d}>
              <Image source={require('./assets/download.png')} style={Styles.c} />
            </View>
            <Text style={Styles.b}>Convert the Text to Speech!!!</Text>
            <TextInput
              style={Styles.a}
              placeholderTextColor="black"
              placeholder="Enter The Text"
              onChangeText={(text) => {
                this.setState({ text:text });
              }}
              value={this.state.text || this.state.scanneddata}
            />
            <View style={Styles.f}>
              <TouchableOpacity
                style={Styles.e}
                onPress={() => {
                  this.state.text === '' && this.state.scanneddata===''
                    ? alert('Text is not entered')
                    : this.speak();
                }}>
                <Text style={Styles.g}>Click!!!</Text>
                <Text style={Styles.g}>To Hear The Speech</Text>
              </TouchableOpacity>
              <Text style={{ fontWeight: 'bold', marginTop:50 }}>OR</Text>
              <TouchableOpacity
                style={Styles.button}
                onPress={() => {
                  this.getpermission();
                }}>
                <Text style={Styles.text}>Scan QR Code</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      );
    }
  }
}

const Styles = StyleSheet.create({
  a: {
    borderWidth: 2.5,
    textAlign: 'center',
    borderRadius: 6,
    height: 35,
    marginTop: 15,
  },
  b: {
    fontWeight: 'bold',
    marginTop: 50,
    textAlign: 'center',
  },
  c: {
    width: 80,
    height: 80,
    marginTop: 80,
    borderRadius: 150,
  },
  d: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  e: {
    textAlign: 'center',
    marginTop: 100,
    backgroundColor: 'orange',
    borderRadius: 15,
    width: 180,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  f: {
    alignItems: 'center',
  },
  g: {
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
  },
  text: {
    backgroundColor: 'silver',
    width: 120,
    height: 30,
    paddingTop: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 50,
    borderRadius: 15,
    marginBottom: 530,
  },
});
