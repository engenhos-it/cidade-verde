import React, { Component } from 'react'
import { Text, View, ActivityIndicator, StyleSheet, Platform , FlatList} from 'react-native'
import { Marker } from 'react-native-maps';
import { MapView, Permissions, Location } from 'expo';
import { SearchBar, Icon, Button, ListItem } from 'react-native-elements'


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
            mapLoaded: false,
            search: '',
            region: initialRegion,             
            filterList: []          
        } 
    }
    
    /*componentDidMount é um dos life-cycle hooks do react 
      É invocado imediatamente após o componente ser montado (inserido na árvore)
      Para mais informações : https://reactjs.org/docs/react-component.html#componentdidmount

    */
    async componentDidMount(){         
        await Permissions.askAsync(Permissions.LOCATION);

        // let location = await Location.getCurrentPositionAsync({})        

        //ToDo criar tratativa para caso ele negue a localização
        this.setState({ mapLoaded: true }); 
      }

    
    onRegionChangeComplete = (region) => {
        this.setState({ region });
    }

    updateSearch = search => {
        this.setState({ search });     
        let filterList = places.filter(place =>  search !== '' && place.name.includes(search))
        this.setState({filterList})       
      };

    renderListItem = place => {
                
        let region = {
            longitude: place.longitude,
            latitude: place.latitude,
            longitudeDelta: defaultLogitudeDelta,
            latitudeDelta: defaultLatitudeDelta,
        }
        
        return (<ListItem
            key={place.id}
            title={place.name}      
            onPress={() => { this.map.animateToRegion(region);
                              this.setState({search: place.name});
                              this.searchBar.blur();
                              this.setState({filterList : []})
                            }}
            />)
    }
        
        
    render() {        
        if(!this.state.mapLoaded){ 
            return (
                <View>
                    <ActivityIndicator size="large" /> 
                </View>
                )
        }                                
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
                <View style={styles.searchBarContainer} >
                    <SearchBar 
                        ref={searchBar => this.searchBar = searchBar}                       
                        platform={Platform.OS}
                        placeholder="Procurar nesta área..."                        
                        onChangeText={this.updateSearch}
                        value={this.state.search}   />
                    {this.state.filterList.map(place => this.renderListItem(place))}                        
                </View>                
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
        top: 70,
        left: 0,
        right: 0
      } 
})
