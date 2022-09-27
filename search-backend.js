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
            collection.find({}).limit(10).toArray().then(doc=>{
                res.send(doc);
            })
            
          })
    })

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
