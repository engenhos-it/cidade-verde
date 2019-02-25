import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class NewsScreen extends Component {

    /*Additional Information:
        Aqui criamos uma variável padrão que ditará determinadas características que o React Navigation
        adicionará ao Navigator. Para mais informações: https://reactnavigation.org/docs/en/navigation-options-resolution.html#caution-the-navigationoptions-property-vs-configuration
    */
    static navigationOptions = ({ navigation }) => ({
        title: "Notícias"
    })


    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}
