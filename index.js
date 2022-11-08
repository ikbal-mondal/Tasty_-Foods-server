const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()
// middle wares
app.use(cors());
app.use(express.json());

app.get('/' , (req, res) => {
    res.send('Hello assignment 11 Server How are You  ? ')
})


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hr4tb9l.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const serviceCollection = client.db('Tasty_Foods').collection('services')


 function run() {

    try{
  
         app.get('/services', async (req,res) => {

            const query = {};
            const cursor =  serviceCollection.find(query);
            const service = await cursor.toArray();
            res.send(service)

         })
         
  
    }
    finally{

       
    }
}
run()


app.listen(port, () => {
    console.log(' server in running : ' , {port});
})