import React, { Component } from 'react'
import { Text, View, ActivityIndicator, StyleSheet, Platform } from 'react-native'
import { Marker } from 'react-native-maps';
import { MapView, Permissions } from 'expo';
import { SearchBar, Icon, Button } from 'react-native-elements'


export default class MapScreen extends Component {
  
    /*Additional Information:
        Aqui criamos uma variável padrão que ditará determinadas características que o React Navigation
        adicionará ao Navigator. Para mais informações: https://reactnavigation.org/docs/en/navigation-options-resolution.html#caution-the-navigationoptions-property-vs-configuration
    */
    static navigationOptions = ({navigation}) => ({
        title: "Mapa"        
    })


    
    constructor() {
        super() //Herda o construtor do componente
    
        // O react trabalha o conceito de "estado" do componente. Aqui são todas as variáveis de estado do componente
        this.state = {
            mapLoaded: false,  //Indica se o mapa ja esta carregado ou não 
            region: {            
                longitude: -46.646199,
                latitude: -23.570068, 
                longitudeDelta: 0.04,
                latitudeDelta: 0.09
            } //Objeto relativo a posição inicial do mapa            
        }
    }


    /*componentDidMount é um dos life-cycle hooks do react 
      É invocado imediatamente após o componente ser montado (inserido na árvore)
      Para mais informações : https://reactjs.org/docs/react-component.html#componentdidmount

    */
    async componentDidMount(){
         //Método que vai pedir a permissão de utilização do mapa para o usuário.
         //Por ser assíncrono, usamos o await para aguardar a operação;
        await Permissions.askAsync(Permissions.LOCATION);

        this.setState({ mapLoaded: true }); //Altera o estado da variável de estado mapLoaded para true 
      }


    //Responsável por atualizar região (latitude e longitude do mapa) após touch
    onRegionChangeComplete = (region) => {
        this.setState({ region });
    }

    //Método responsável por retornar o JSX que será renderizado 
    render() {
        if(!this.state.mapLoaded){ //Caso o mapa ainda não estiver carregado, retorna componente de loading
            return (
                <View>
                    <ActivityIndicator size="large" /> 
                </View>
                )
        }

        const marker = {
            latlng:{
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude
            },
            title: "Titulo",
            description: "Description"
        }
        //Caso mapa já estiver carregado, mostra na tela
        return(
                                                   
            <View style={styles.containerStyle}>                                        
                <MapView
                    region={this.state.region}
                    style={styles.mapStyle}
                    onRegionChangeComplete={this.onRegionChangeComplete}>

                    <Marker
                        coordinate={marker.latlng}
                        title={marker.title}
                        description={marker.description} />
                </MapView>
                <SearchBar
                    title="Procurar nesta área"
                    containerStyle={styles.searchBarContainer} 
                    platform={Platform.OS}
                    placeholder="Type Here..."
                    title="Loading button"/>                                 
            </View>
        )
        
        
    }
}

//Objeto com definições de estilo, padrão do react
const styles = StyleSheet.create({
    containerStyle:{
        flex: 1        
    },
    mapStyle: {
        flex: 1        
    },      
    searchBarContainer : {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0
      } 
})
