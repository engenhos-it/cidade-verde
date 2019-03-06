import React from 'react';
import { Text, View } from 'react-native';
import MapScreen from './screens/MapScreen'
import NewsScreen from './screens/NewsScreen'
import InfoScreen from './screens/InfoScreen'
import DetailInfoScreen from './screens/DetailInfoScreen'
import AboutUsScreen from './screens/AbousUsScreen'
import { createBottomTabNavigator,
         createAppContainer,
         createStackNavigator} from 'react-navigation';
import { Icon } from 'react-native-elements'

/*Additional Information:
  O código abaixo faz parte da library React Navigation, uma solução para navegação amplamente utilizada
  em aplicações react. O link da documentação oficial é: https://reactnavigation.org/docs/en/getting-started.html
*/

//Cria navigator no formato bottomTab, vinculando a rota "mapScreen" para o componente MapScreen e etc.


const newsScreen = createScreen(NewsScreen, 'Notícias', 'info')
const mapScreen = createScreen(MapScreen, 'Mapa', 'place')
const aboutUsScreen = createScreen(AboutUsScreen, 'Sobre nós', 'nature-people')

const infoScreen = createScreen(
  createStackNavigator({
    infoScreen: { screen: InfoScreen },
    detailInfo: { screen: DetailInfoScreen }
  }), 'Como reciclar', 'help')


function createScreen (screen, title, icon) {
  return {
    navigationOptions: {
      title: title,
      tabBarIcon: ({ tintColor }) => {
        return (<Icon name={icon} size={30} color={tintColor} />);
      }
    },
    screen
  }
}

const AppNavigator = createBottomTabNavigator({
  mapScreen,
  infoScreen,
  newsScreen,
  aboutUsScreen
}, {
    tabBarOptions: {
      activeTintColor: 'white',
      activeBackgroundColor: '#408237',
      inactiveTintColor: 'white',
      style: {
        backgroundColor: '#56ab4b',
      }
    }
  })

const AppContainer = createAppContainer(AppNavigator); //Cria componente de container com as rotas previamente declaradas

export default class App extends React.Component {
  render() {
    return <AppContainer />;         
  }
} 