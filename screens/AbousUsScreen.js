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

    const Texto = "Olá, somos a Engenhos, especializados na aplicação de tecnologia para gerar impacto, seja na forma como cuidamos do mundo, seja na competitividade da sua empresa. Acreditamos que o desenvolvimento de sistemas deve ser ágil, entregando constantemente o mais importante primeiro e testando continuamente (e de forma automatizada). Para ter alta performance temos bons processos e automatizados, mas principalemnte cultivamos parceiros, amigos, pessoas extraordinárias, esses sim são nosso diferencial."

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
