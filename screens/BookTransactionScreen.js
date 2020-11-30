import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class BookTransactionScreen extends React.Component {
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }
    getCameraPermissions = async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions:status == "granted",
            buttonState:'clicked',
            scanned:false
        })
    }
    handleBarcodeScannned = async({type, data}) => {
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        })
    }
    render() {
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if(buttonState === 'clicked' && hasCameraPermissions){
            return(
                <BarCodeScanner style={StyleSheet.absoluteFillObject} onBarcodeScanned={scanned?undefined:this.handleBarcodeScannned} />
            );
        }
        else if(buttonState === 'normal'){
            return(
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>
                    {hasCameraPermissions == true? this.state.scannedData:"Request Camera Permissions"}
                </Text>
                <TouchableOpacity onPress={this.getCameraPermissions} style={styles.scanButton}>
                    <Text style={styles.scanText}>
                        Scan Qr Code
                    </Text>
                </TouchableOpacity>
            </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    scanButton:{
        backgroundColor:"lightgreen",
        padding:10,
        margin:10
    },
    scanText:{
        fontSize:15,
        textDecorationLine:"underline"
    }
})