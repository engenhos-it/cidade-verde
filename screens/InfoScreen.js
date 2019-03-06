import React, { Component } from 'react'
import { Text, ScrollView, Button } from 'react-native'
import { ListItem } from 'react-native-elements'
import infoList from '../data/initialInfoData'

export default class InfoScreen extends Component {
  /*Additional Information:
          Aqui criamos uma variável padrão que ditará determinadas características que o React Navigation
          adicionará ao Navigator. Para mais informações: https://reactnavigation.org/docs/en/navigation-options-resolution.html#caution-the-navigationoptions-property-vs-configuration
      */
     
  static navigationOptions = ({navigation}) => ({    
    title: "Como reciclar",
    headerStyle: { backgroundColor: '#56ab4b'},
    headerTitleStyle: { color: 'white'},         
  })

  onPress = (info) => {
    this.props.navigation.push('detailInfo', { info })
  }


  render() {
    return (
      <ScrollView>
        {
          infoList.map(info => {            
              return (
                <ListItem
                  key={info.id}
                  title={info.title}
                  leftIcon={{ name: info.icon, type: info.type }}                  
                  onPress={() => this.onPress(info)} />
              )            
          })
        }
      </ScrollView>
    )
  }
}
