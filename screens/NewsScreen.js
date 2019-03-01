import React, { Component } from 'react'
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native'
import { Card, Button, Icon, Image } from 'react-native-elements'
import { WebBrowser } from 'expo'
import ErrorComponent from '../components/ErrorComponent'
import HTMLView from 'react-native-htmlview'


 const FEED_URL = 'https://9fi7ayotae.execute-api.us-east-1.amazonaws.com/dev/feed/';

export default class NewsScreen extends Component {
        
    constructor(props) {
      super(props)
    
      this.state = {
         newsList: [], 
         hasInternalError: false,
         isLoading: true
      }
    }
    
    componentDidMount(){
        this.getNewsList();
    }

    openLink = async (url) => {
        await WebBrowser.openBrowserAsync(url);
    }

    getNewsList = () => fetch(FEED_URL, {method: "GET"})
                            .then(res => res.json())
                            .then(newsList => this.setState({newsList}))
                            .catch(e => this.setState({hasInternalError: true}))
                            .finally(e => this.setState({isLoading: false}))


    getNewsImage = image => {
        if (image)
            return (<Image style={styles.newsImageStyle}
                            source={{ uri: image }}
                            PlaceholderContent={<ActivityIndicator />} />)
    }

    render() {
        
        let { newsList, hasInternalError, isLoading } = this.state;

        if(isLoading){
            return (
                <View style={[styles.containerStyle, { justifyContent: 'center' }]}>
                    <ActivityIndicator size="large" color="#408237" />
                </View>
            )
        }

        if (hasInternalError) {
            return (
                <ErrorComponent buttonMessage = "Ir para o mapa"
                                onPressCallback={() => this.props.navigation.navigate('mapScreen')}
                                errorMessage="Aconteceu um erro e estamos trabalhando nisso! Tente acessar a página novamente mais tarde"/>                
             )
        }        
        
        return (            
            <ScrollView style={styles.containerStyle}>                
                {newsList.map(news =>
                    <Card title={news.title} key={news.guid}>
                        {this.getNewsImage(news.image)}                        
                        <HTMLView  value={news.summary || ''}/>
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
        backgroundColor: '#b9e0b4',
        flex: 1        
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