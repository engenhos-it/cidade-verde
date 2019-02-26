import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { ListItem } from 'react-native-elements'

const list = [
  {
    title: 'Pilhas',
    icon: 'av-timer',
    infoId : '2'
  },
  {
    title: 'Organico',
    icon: 'flight-takeoff',
    infoId: '1'
  },
]

export default class InfoScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    title: "Guia de reciclagem",
    headerStyle: { backgroundColor: 'green'},
    headerTitleStyle: { color: 'white'},     
    
  })

  onPress = (infoId) => {
    this.props.navigation.push('detailInfo', { infoId })
  }


  render() {
    return (
      <View>
      {
        list.map((item, i) => (
          <ListItem
            key={i}
            title={item.title}
            leftIcon={{ name: item.icon }}
            onPress={() => this.onPress(item.infoId)}
          />
        ))
      }      
    </View>
    )
  }
}
