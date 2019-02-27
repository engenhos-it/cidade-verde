import React, { Component } from 'react'
import { View, StyleSheet, Alert} from 'react-native'
import { Marker } from 'react-native-maps';
import { MapView, Permissions, Location, IntentLauncherAndroid } from 'expo';
import { Icon, Button } from 'react-native-elements'
import  SearchBarWithListComponent from '../components/SearchBarWithListComponent'


const places = [
    {
        longitude: -46.646199,
        latitude: -23.570068, 
        id: "1",
        name: 'Lugar 1',
        description: 'Este é o lugar 1'
    },
    {         
        longitude: -46.626812,
        latitude: -23.556165, 
        id: "2",
        name: 'Lugar 2',
        description: 'Este é o lugar 2'
    },
    {        
        longitude: -46.628291,
        latitude: -23.574697, 
        id: "3",
        name: 'Lugar 3',
        description: 'Este é o lugar 3'
    }
]

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
        } 
    }
    
    /*componentDidMount é um dos life-cycle hooks do react 
      É invocado imediatamente após o componente ser montado (inserido na árvore)
      Para mais informações : https://reactjs.org/docs/react-component.html#componentdidmount

    */
     componentDidMount(){         
         this.getLocation();
      }


      getLocation = async (forceLocation) => {      
          console.log("TAENTRANDO")    
          
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if(status === 'granted'){
            let isLocationEnabled = await Location.hasServicesEnabledAsync()

            if(isLocationEnabled){
                let location = await Location.getCurrentPositionAsync({});
                this.setState({region: location});
            }

            //TODO Lidar com o que acontece aqui
            //TESTAR
        }
        else if(forceLocation){
            Alert.alert(
                "Alerta",
                "Para ver ecopontos na sua região é necessário habilitar a localização!",
                [
                    { text: "Habilitar Localização", 
                      style:{backgroundColor: "#56ab4b"}, 
                      onPress: async() => await IntentLauncherAndroid.startActivityAsync(IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS)
                    }
                ])
        }        
      };
    
    
    onRegionChangeComplete = (region) => {
        this.setState({ region });
    }
        
    onPressCallBack = (place) => {
        let region = {
            longitude: place.longitude,
            latitude: place.latitude,
            longitudeDelta: defaultLogitudeDelta,
            latitudeDelta: defaultLatitudeDelta,
        }

        this.map.animateToRegion(region);        
    }

    render() {                                     
        //Caso mapa já estiver carregado, mostra na tela
        return(                                      
            <View style={styles.containerStyle}>
                <MapView
                    region={this.state.region}
                    style={styles.mapStyle}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                    ref={ref => { this.map = ref; }}>
                    {
                        places.map(place => 
                            <Marker key={place.id}
                                    title={place.name}
                                    description={place.description}
                                    coordinate={
                                        {
                                            latitude: place.latitude,
                                            longitude: place.longitude
                                        }
                                    } />)
                    }                    
                </MapView>
                <SearchBarWithListComponent 
                    placeholder="Procure pelo nome..."
                    data={places}
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
        bottom: 20,        
        right: 0
      }
})
