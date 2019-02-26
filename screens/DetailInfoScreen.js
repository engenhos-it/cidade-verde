import React, { Component } from 'react'
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native'
import { Image, Icon } from 'react-native-elements'

export default class DetailInfoScreen extends Component {
    
    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('infoId', 'A Nested Details Screen'),
          headerStyle: { backgroundColor: 'green'},
          headerTitleStyle: { color: 'white'}, 
          headerTintColor: 'white',  //cor da flecha de voltar
        };
      };

    render() {
        var infoDetail = {
            img: 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/1419261/1160/772/m1/fpnw/wm0/car-battery-icon-01-.jpg?1467539421&s=ed684d7559ac99e74479b028d80df569',
            titulo: 'Titulo',
            texto: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }

        const itemId = this.props.navigation.getParam('infoId', 0)

        return (
            <View style={styles.containerStyle}>
                <Image
                    source={{ uri: infoDetail.img }}
                    style={{ width: 200, height: 200 }}
                    PlaceholderContent={<ActivityIndicator />}
                />
                <Text style={styles.tituloStyle}>{infoDetail.titulo}</Text>
                <Text style={styles.textoStyle}>{infoDetail.texto}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',   
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

