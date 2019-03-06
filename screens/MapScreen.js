import React, { Component } from 'react'
import { View, StyleSheet, Alert} from 'react-native'
// import { Marker } from 'react-native-maps';
import { MapView, WebBrowser, Permissions, Location, IntentLauncherAndroid } from 'expo';
import { Icon, Button } from 'react-native-elements'
import  SearchBarWithListComponent from '../components/SearchBarWithListComponent'
import locations from '../data/initialLocationData'

const defaultLatitudeDelta = 0.09;
const defaultLogitudeDelta = 0.04;

const initialRegion = {
    longitudeDelta: defaultLogitudeDelta,
    latitudeDelta: defaultLatitudeDelta,
    longitude: -46.646199,
    latitude: -23.570068,
}

export default class MapScreen extends Component {

    constructor() {
        super()             
        this.state = {                    
            region: initialRegion,      
            bottom: 1 //ToolbarHack                   
        } 
    }
    
    /*componentDidMount é um dos life-cycle hooks do react 
      É invocado imediatamente após o componente ser montado (inserido na árvore)
      Para mais informações : https://reactjs.org/docs/react-component.html#componentdidmount

    */
     componentDidMount(){         
         this.getLocation();        
      }

      /*
        Hack para manter o toolbar do mapa ativo na primeira renderização. 
        O erro acontece por disfunção assíncrona na comunicação do rn com a interface de mapa do andorid
        Por conta disso, na primeira renderização do mapa, a toolbar não é carregada.
        Como solução, renderizar o componente alterando o seu estado faz a toolbar ser renderizada novamente
        Para mais detalhes da issue aberta: https://github.com/react-native-community/react-native-maps/issues/1033
      */

      toolbarHack = () => {
        if(this.state.bottom === 1){
          this.setState({
            bottom: 0
          })
        } 
      }

      getLocation = async (forceLocation) => {                          
          let { status } = await Permissions.askAsync(Permissions.LOCATION);

          if (status === 'granted') {
              let isLocationEnabled = await Location.hasServicesEnabledAsync()

              if (isLocationEnabled) {
                  let location = await Location.getCurrentPositionAsync({});

                  let newRegion = { 
                      latitudeDelta: defaultLatitudeDelta, 
                      longitudeDelta: defaultLogitudeDelta,
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude
                    }
                  
                  this.setState({ region: newRegion });
              }
              else if (forceLocation) {
                  Alert.alert(
                      "Alerta",
                      "Para ver ecopontos na sua região é necessário habilitar a localização!",
                      [
                          {
                              text: "Habilitar Localização",
                              style: { backgroundColor: "#56ab4b" },
                              onPress: async () => await IntentLauncherAndroid.startActivityAsync(IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS)
                          }
                      ])                                    
              }

          }
      };
    
    
    onRegionChangeComplete = (region) => {
        this.setState({ region });
    }
        
    onPressCallBack = (location) => {
        let region = {
            longitude: location.longitude,
            latitude: location.latitude,
            longitudeDelta: defaultLogitudeDelta,
            latitudeDelta: defaultLatitudeDelta,
        }

        this.map.animateToRegion(region);        
    }

    render() {                                             
        return(                                      
            <View style={styles.containerStyle}>
                <MapView
                    region={this.state.region}
                    style={[styles.mapStyle, {bottom: this.state.bottom}]}
                    toolbarEnabled                    
                    onRegionChangeComplete={this.onRegionChangeComplete}
                    ref={ref => { this.map = ref; }}>
                    {
                        locations.map(location => 
                            <MapView.Marker key={location.id}
                                    title={location.name}
                                    onPress={() => this.toolbarHack()}
                                    description={location.description}
                                    coordinate={
                                        {
                                            latitude: location.latitude,
                                            longitude: location.longitude
                                        }
                                    } />)
                    }                    
                </MapView>
                <SearchBarWithListComponent 
                    placeholder="Procure pelo nome..."
                    data={locations}
                    filterProperty={'name'}
                    listItemTitleProp={'name'}
                    listItemKeyProp={'id'}
                    onPressCallBack={this.onPressCallBack}
                 />                                                 
                    <Icon
                        raised
                        name='my-location'                        
                        color='#56ab4b'
                        reverse
                        onPress={() => this.getLocation(true)} 
                        containerStyle={styles.iconContainer} />                
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
    iconContainer : {
        position: 'absolute',
        bottom: 60,        
        right: 15
      }
})
