import React, { Component } from 'react'
import { Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native'
import { Card, Button, Icon, Image } from 'react-native-elements'
import { WebBrowser } from 'expo'

const newsList = [
    {
        title: "Hello",
        imageUri: 'https://wallpaperbrowse.com/media/images/423678.jpg',
        description: 'The idea with React Native Elements is more about component structure than actual design.',
        url: 'https://github.com/facebook/react-native',
        key: '1'        
    },    
    {
        title: "World",
        imageUri: 'https://wallpaperbrowse.com/media/images/423678.jpg',
        description: 'The idea with React Native Elements is more about component structure than actual design.',
        url: 'https://github.com/facebook/react-native',
        key: '2'        
    }
]



export default class NewsScreen extends Component {
        
    openLink = async (url) => {
        await WebBrowser.openBrowserAsync(url);
    }

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
                            title='Ver notícia'
                            onPress={() => this.openLink(news.url)} />
                    </Card>
                )}
            </ScrollView>  
         
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        marginTop: 25,
        backgroundColor: '#81cd77'
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