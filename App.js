import React from 'react';
import { Text, View } from 'react-native';
import MapScreen from './screens/MapScreen'
import NewsScreen from './screens/NewsScreen'
import InfoScreen from './screens/InfoScreen'
import DetailInfoScreen from './screens/DetailInfoScreen'
import { createBottomTabNavigator,
         createAppContainer,
         createStackNavigator} from 'react-navigation';
import { Icon } from 'react-native-elements'

/*Additional Information:
  O código abaixo faz parte da library React Navigation, uma solução para navegação amplamente utilizada
  em aplicações react. O link da documentação oficial é: https://reactnavigation.org/docs/en/getting-started.html
*/

//Cria navigator no formato bottomTab, vinculando a rota "mapScreen" para o componente MapScreen e etc.


const mapScreen = {
  navigationOptions: {
    title: 'Mapa',
    tabBarIcon: ({ tintColor }) => {
      return (<Icon name="place" size={30} color={tintColor} />);
    }
  },
  screen: MapScreen
}

const infoScreen = {
    navigationOptions: {
      title: 'Como reciclar',
      tabBarIcon: ({ tintColor }) => {
        return (<Icon name="help" size={30} color={tintColor} />);
      }
    },
    screen: createStackNavigator({
      infoScreen: { screen: InfoScreen },
      detailInfo: { screen: DetailInfoScreen }
    })
}

const newsScreen = {
  navigationOptions: {
    title: 'Notícias',
    tabBarIcon: ({ tintColor }) => {
      return (<Icon name="info" size={30} color={tintColor} />);
    }
  },
  screen: NewsScreen
}

const AppNavigator = createBottomTabNavigator({
  mapScreen,
  infoScreen,
  newsScreen
}, {
    tabBarOptions: {
      activeTintColor: 'white',
      activeBackgroundColor: '#408237',
      inactiveTintColor: 'white',
      style: {
        backgroundColor: '#56ab4b',
      },
      indicatorStyle: {
        backgroundColor: 'red'
      }
    }
  })

const AppContainer = createAppContainer(AppNavigator); //Cria componente de container com as rotas previamente declaradas

export default class App extends React.Component {
  render() {
    return <AppContainer />;         
  }
} 