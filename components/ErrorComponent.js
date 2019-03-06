import React, { Component } from 'react'
import { StyleSheet, Image, Text, View } from 'react-native'
import { Button } from 'react-native-elements'

export default class ErrorComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            buttonMessage: this.props.buttonMessage,
            onPressCallback: this.props.onPressCallback,
            errorMessage: this.props.errorMessage
        }
    }
    
  render() {
    return (
        <View style={styles.containerStyle}>
            <Image source={require('../assets/error.png')} style={styles.errorImage} />            
                <Text style={[styles.textoStyle, styles.tituloErroStyle, styles.base]}>
                    OOPS!
                </Text>
                <Text style={[styles.textoStyle, styles.base]}>
                    {this.state.errorMessage}
                </Text>                
            <Button buttonStyle={[{top: 30}, styles.buttonSytle]}
                    title={this.state.buttonMessage}
                    onPress={() => this.state.onPressCallback()}/>                    
        </View> 
        
        
    )
  }
}

const styles = StyleSheet.create({
    containerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#b9e0b4'
    },
    tituloErroStyle: {
        fontSize: 28,
        fontWeight: 'bold',        
    },
    textoStyle:{        
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',   
        fontSize: 15               
    },
    errorImage:{
        width: 200,
        height: 200         
    },
    base:{
        top: 20
    },
    buttonSytle: {
        backgroundColor: '#408237'
    }
})





