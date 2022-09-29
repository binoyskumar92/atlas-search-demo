const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()
app.use(cors());

const port = 6767
const connectionString = "mongodb+srv://mongoadmin:passwordone@search-cluster.hvabt.mongodb.net/?retryWrites=true&w=majority";
MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')

        app.get('/', (req, res) => {
            const collection = client.db('sample_mflix').collection('movies');
            collection.find({}).limit(10).toArray().then(doc => {
                res.send(doc);
            })

        })
        app.get('/search/:type/:query', async (req, res) => {
            const type = req.params['type'];
            const query = req.params['query'];
            const collection = client.db('sample_mflix').collection('movies');
            const aggregateQuery = getSearchAggregationBasedOnType(type, query)
            if (aggregateQuery.length > 0) {
                const aggCursor = collection.aggregate(aggregateQuery);

                responseArr = []
                for await (const doc of aggCursor) {
                    responseArr.push(doc)
                }
                res.send(responseArr)
            }
        })
    })
function getSearchAggregationBasedOnType(type, query) {
    const aggregation = []
    switch (type) {
        case 'Normal':
            aggregation.push({
                "$search": {
                    "text": {
                        "path": {
                            "wildcard": "*"
                        },
                        "query": query
                    }
                }
            })
            break;

        case 'Indexed':
            aggregation.push({
                "$search": {
                    "index": "plot",
                    "text": {
                        "path": ["plot"],
                        "query": query,
                    }
                }
            },
            {
                "$addFields":{
                    "score":{
                        "$meta": "searchScore"
                    }
                }
            })
            break;

        case 'Fuzzy':
            aggregation.push({
                "$search": {
                    "text": {
                        "path": ["title"],
                        "query": query,
                        "fuzzy": {
                            "maxEdits": 2
                        }
                    }
                }
            },{
                "$addFields":{
                    "score":{
                        "$meta": "searchScore"
                    }
                }
            })
            break;

        case 'Boosted':
            aggregation.push({
                "$search": {
                    "compound":{
                        "must":[{
                            "text":{
                                "query": query,
                                "path": ["title"],
                                "score": {
                                    "boost":{
                                        "value": 5
                                    }
                                }
                            }
                        },{
                            "text": {
                                "query": query,
                                "path": ["title","plot"],
                            }
                        }]
                    }
                }
            }, {
                "$project": {
                    "imdb": 1,
                    "plot": 1,
                    "title": 1,
                    "genres": 1,
                    "year": 1,
                    "poster": 1,
                    "score": {
                        "$meta": "searchScore"
                    }
                }
            })
            break;
    }
    return aggregation
}
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
// const smaple = {
//     "$search": {
//         "compound":{
//             "must":[{
//                 "text":{
//                     "query": query,
//                     "path": ["title"],
//                     "score": {
//                         "boost":{
//                             "value": 5
//                         }
//                     }
//                 }
//             },{
//                 "text": {
//                     "query": query,
//                     "path": ["title","plot"],
//                 }
//             }]
//         }
//     }
// }