import React, { Component } from 'react'
import { Text, ScrollView, View, StyleSheet } from 'react-native'
import { Image, Icon } from 'react-native-elements'

export default class DetailInfoScreen extends Component {
    
    constructor(props){
      super(props);      
      this.state = {
        info : this.props.navigation.state.params.info
      }
    }

    static navigationOptions = ({ navigation }) => {      
        return {
          title: navigation.state.params.info.title,
          headerStyle: { backgroundColor: '#56ab4b'},
          headerTitleStyle: { color: 'white'}, 
          headerTintColor: 'white',  //cor da flecha de voltar
        };
      };

    render() {        
        
        let { info } = this.state;

        return (

          <ScrollView>
            <View style={styles.containerStyle}>
              <Icon name={info.icon} size={120} type={info.type} />
              <Text style={styles.tituloStyle}>{info.title}</Text>
              <Text style={styles.textoStyle}>{info.text}</Text>
            </View>
          </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',   
    marginTop: 30
  },
  tituloStyle:{
    fontSize: 25,
    fontWeight: 'bold'
  },
  textoStyle:{
    width: '90%',
    justifyContent: 'center'    
  }
})

