import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class Bookscreen extends React.Component{

    constructor(){
      super();
      this.state = {
         cameraPermission: null, 
         scanned: false,
         scannedData: '',
         butttonState: 'normal'
      }
    }

   getPermission = async() => {
       const {status} = await Permissions.askAsync(Permissions.CAMERA)
       this.setState({
          cameraPermission: status === "granted",
          butttonState: "clicked",
          scanned: false
       })
   }

   handleScan = async({type, data}) => {
       this.setState({
           scanned: true,
           scannedData: data,
           butttonState: 'normal'
       })
   }

    render(){
        const cameraPermission = this.state.cameraPermission;
        const scanned = this.state.scanned;
        const scannedData = this.state.scannedData;
        const butttonState = this.state.butttonState;

        if(butttonState === 'clicked' && cameraPermission){
            return(
              <BarCodeScanner onBarCodeScanned = {scanned ? undefined: this.handleScan}/> 
            )
        } else if(butttonState === 'normal'){
        return(
            <View style = {styles.container}> 
                <Text style = {styles.text}> 
                   {cameraPermission === true ? scannedData: "request camera permission"}
                 </Text>
                <TouchableOpacity style = {styles.button} onPress={this.getPermission} > 
                  <Text style = {styles.buttontext}> Scan QR Code </Text>
                </TouchableOpacity>
            </View>
        )}
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  text:{
    fontSize: 30,
    fontWeight: "Bold"
  },
  buttontext:{
    fontSize: 20,
    fontWeight: "Bold",
    marginTop: 10
  },
  button:{
    width: 200, 
    height: 50, 
    borderRadius: 20,
    marginTop: 150,
    backgroundColor: 'turquoise',
    textAlign: 'center',
    borderColor: 'black',
    borderWidth: 3
  }
});


