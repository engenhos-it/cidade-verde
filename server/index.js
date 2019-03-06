// index.js

const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk');
const feedParser = require('feedparser-promised');

const FEED_TABLE = process.env.FEED_TABLE;

const IS_OFFLINE = process.env.IS_OFFLINE;
let dynamoDb;
if (IS_OFFLINE === 'true') {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  })
  console.log(dynamoDb);
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient();
};

app.use(bodyParser.json({ strict: false }));

// Get endpoint
app.get('/feed', function (req, res) {
  const params = {
    TableName: FEED_TABLE,    
  }

  dynamoDb.scan(params, (error, result) => {
      if(errorHandled(error, res)){
          return;
      }
      
      if (result.Items) {      
        res.json(result.Items);
      } else {
        res.status(404).json({ error: "Nenhum feed encontrado" });
    }
  });
})

// Create endpoint
app.post('/feed', function (req, res) {
    let lstUrlsFeeds = [
        'https://movimentolixocidadao.com.br/feed/',
        'https://www.akatu.org.br/feed/'
    ];

    let allPromises = [];

    lstUrlsFeeds.forEach(url => allPromises.push(getFeeds(url)));

    return Promise.all(allPromises).then(values => {
        let items = values.map(x => x.map(y => ({
            guid: y.guid,
            url: y.link,
            title: y.title,
            summary: y.summary,
            image: getImageUrl(y.description),
            date: y.date.toISOString()
        })))        
        .reduce(function(a, b){ return a.concat(b); }); 

        if(items && items.length)
            return updateDbFeeds(items, res);
    })
    .catch(err => {
        console.log('Erro ao consultar feeds: ' + err);
    });
})

function getImageUrl(description){
    let reImages = /(http[^\s]*(\.png|\.jpg|\.jpeg))+?/i;  

    if(!description)
        return null;

    let match = description.match(reImages);
    return match ? match[0] : null
}

function updateDbFeeds(items, res){
    const params = {
        TableName: FEED_TABLE, 
        ProjectionExpression: 'guid'   
    }

    items = items
        .sort((a, b) => ((a.date < b.date) ? -1 : 1)*-1)
        .slice(0,11);
    
    dynamoDb.scan(params, (error, result) => {
        if(errorHandled(error, res)){
            return;
        }

        var batchRequestItems = items.map(x => ({ PutRequest:{ Item: x } }));

        var batchRequest = {
            RequestItems: {
                [FEED_TABLE]: batchRequestItems
            }
        };   
        
        // Expurgo
        if (result.Items && result.Items.length) {            
            let allItems = [];
            allItems = allItems
                .concat(items)                
                .concat(result.Items.filter(x => !items.some(y => y.guid === x.guid)));
            
            let arrDelete = allItems.slice(11);

            if(arrDelete && arrDelete.length){
                var deleteRequests = arrDelete.map(x => ({ DeleteRequest:{ Key: { guid:  x.guid} } }));
                                
                batchRequestItems = batchRequestItems.concat(deleteRequests);
            }
        }      
        
        dynamoDb.batchWrite(batchRequest, (error, data) => {
        if (error) {
              console.log(error);
              res.status(400).json({ error: 'Não foi possível criar o feed' });
            }
              res.json(items);
        });
    });
}

function getFeeds(url){
    const httpOptions = {
        uri: url,
        timeout: 30000,
        gzip: true
      };
    
    return feedParser.parse(httpOptions);
}

function errorHandled(error, res){
    if (error) {
        console.log(error);
        res.status(400).json({ error: 'Não foi possível consultar os feeds' });
    }
}

module.exports.handler = serverless(app);