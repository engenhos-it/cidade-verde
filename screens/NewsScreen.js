import React, { Component } from 'react'
import { Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native'
import { Card, Button, Icon, Image } from 'react-native-elements'
import { WebBrowser } from 'expo'
import HTML from 'react-native-render-html'

const newsList = [
    {
        "summary": "<p>Instituições se associaram para desenvolver, no Brasil, pesquisa com insights do consumidor sobre vida saudável e sustentável</p>\n<p>O post <a rel=\"nofollow\" href=\"https://www.akatu.org.br/noticia/akatu-e-globescan-sao-parceiras-em-pesquisa-sobre-as-tendencias-dos-consumidores-brasileiros/\">Akatu e GlobeScan são parceiras em pesquisa sobre as tendências dos consumidores brasileiros</a> apareceu primeiro em <a rel=\"nofollow\" href=\"https://www.akatu.org.br\">Akatu</a>.</p>",
        "guid": "https://www.akatu.org.br/?post_type=noticia&p=15811",
        "image": "https://www.akatu.org.br/wp-content/uploads/2019/02/rawpixel-974545-unsplash-1024x716.jpg",
        "title": "Akatu e GlobeScan são parceiras em pesquisa sobre as tendências dos consumidores brasileiros",
        "url": "https://www.akatu.org.br/noticia/akatu-e-globescan-sao-parceiras-em-pesquisa-sobre-as-tendencias-dos-consumidores-brasileiros/"
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
                    <Card title={news.title} key={news.guid}>
                        <Image style={styles.newsImageStyle}
                            source={{ uri: news.image }}
                            PlaceholderContent={<ActivityIndicator />} />                     
                            <HTML html={news.summary}/>                        
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
        backgroundColor: '#b9e0b4'
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