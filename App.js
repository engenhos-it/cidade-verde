import React from 'react';
import { Text, View } from 'react-native';
import MapScreen from './screens/MapScreen'
import NewsScreen from './screens/NewsScreen'
import InfoScreen from './screens/InfoScreen'
import DetailInfoScreen from './screens/DetailInfoScreen'
import { createBottomTabNavigator,
         createAppContainer,
         createStackNavigator} from 'react-navigation';


/*Additional Information:
  O código abaixo faz parte da library React Navigation, uma solução para navegação amplamente utilizada
  em aplicações react. O link da documentação oficial é: https://reactnavigation.org/docs/en/getting-started.html
*/

//Cria navigator no formato bottomTab, vinculando a rota "mapScreen" para o componente MapScreen e etc.

const AppNavigator = createBottomTabNavigator({
  mapScreen: { screen: MapScreen },
  infoStack: createStackNavigator({
    infoScreen: { screen: InfoScreen  },
    detailInfo: { screen: DetailInfoScreen }
  }),
  newScreen: { screen: NewsScreen }
})

const AppContainer = createAppContainer(AppNavigator); //Cria componente de container com as rotas previamente declaradas

export default class App extends React.Component {
  render() {
    return <AppContainer />;         
  }
} 