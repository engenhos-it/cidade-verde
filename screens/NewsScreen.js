import React, { Component } from 'react'
import { Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native'
import { Card, Button, Icon, Image } from 'react-native-elements'


const newsList = [
    {
        title: "Hello",
        imageUri: 'https://wallpaperbrowse.com/media/images/423678.jpg',
        description: 'The idea with React Native Elements is more about component structure than actual design.',
        url: '',
        key: '1'        
    },    
    {
        title: "World",
        imageUri: 'https://wallpaperbrowse.com/media/images/423678.jpg',
        description: 'The idea with React Native Elements is more about component structure than actual design.',
        url: '',
        key: '2'        
    }
]

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
            <ScrollView style={styles.containerStyle}>
                {newsList.map(news =>
                    <Card title={news.title} key={news.key}>
                        <Image style={styles.newsImageStyle}
                            source={{ uri: news.imageUri }}
                            PlaceholderContent={<ActivityIndicator />} />
                        <Text style={styles.descriptionStyle}>
                            {news.description}
                        </Text>
                        <Button
                            icon={<Icon name='code' color='#ffffff' />}
                            backgroundColor='#03A9F4'
                            buttonStyle={styles.buttonStyle}
                            title='Ver notícia' />
                    </Card>
                )}
            </ScrollView>  
         
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        marginTop: 25
    },
    newsImageStyle: {
         width: null,
         height: 150 
    },
    descriptionStyle:{
        marginBottom: 10 
    },
    buttonStyle:{
        borderRadius: 0, 
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0 
    }
  });