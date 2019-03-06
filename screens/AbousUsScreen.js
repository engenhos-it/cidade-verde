import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native'
import { Header } from 'react-native-elements'
import { WebBrowser } from 'expo'

export default class AbousUsScreen extends Component {

    openLink = async (url) => {
        await WebBrowser.openBrowserAsync(url);
    }

  render() {

    const FreePikText =  <Text style={styles.textLink} onPress={() => this.openLink("https://www.freepik.com/")}> Freepik </Text>
    const FlatIconText = <Text style={styles.textLink} onPress={() => this.openLink("https://www.flaticon.com/")}> flaticon.com </Text>
    const SePareNaoPare = <Text style={styles.textLink} onPress={() => this.openLink("http://separenaopare.com.br/como-reciclar")}> SePareNaoPare </Text>

    const Texto = "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado."

    return (
        <View style={{flex: 1}}>
            <Header
                centerComponent={{ text: 'Quem somos ', style: { fontSize: 18, fontWeight: 'bold', color: '#fff' } }}
                containerStyle={styles.headerStyle} />
            <View style={styles.containerStyle}>
                <Image source={require('../assets/logo-engenhos.png')} style={styles.logoStyle}/>                
                <Text style={styles.textoStyle}>{Texto}</Text>                                 
                <Text style={[styles.textoStyle, styles.ourSiteText]}>Visite nosso Site:</Text>                                                
                <Text style={[styles.textoStyle, styles.textLink, styles.ourSiteText]}
                      onPress={() => this.openLink('https://www.engenhos.net/')}>
                      https://www.engenhos.net/
                </Text>                                                
            </View>
            <View style={styles.footerContainerStyle}>
                <Text style={[styles.textoStyle, styles.devs]}>
                    App desenvolvido por: Pedro Ferreira, Gustavo Azevedo, Gabriel Gimenes
                </Text>
                <Text style={[styles.textoStyle, styles.otherLinks]}>
                    Imagens da tela inicial desenvolvidas pela {FreePikText} e oferecidas pela {FlatIconText}. Partes do texto de reciclagem foram tiradas {SePareNaoPare}
                </Text>                                         
            </View>
        </View>
    )
  }
}


const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#56ab4b',
        justifyContent: 'center',
    },    
    containerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoStyle: {
        width: 200,
        height: 200 
    },    
    logo2Style: {
        width: 200,
        height: 50 ,
        top: 30
    },  
    textoStyle: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    footerContainerStyle: {
        width: '100%',
        height: 100,        
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0        
      },
      devs: {
        fontWeight: 'bold'
      },
      otherLinks: {
         fontStyle: 'italic',
         fontSize: 10
      },      
      textLink: {
        color: 'blue'
      },
      ourSiteText:{
        fontWeight: 'bold', 
        top: 30
      }
})
