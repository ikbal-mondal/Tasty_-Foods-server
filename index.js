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


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hr4tb9l.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



 function run() {

    try{
    const serviceCollection = client.db('Tasty_Foods').collection('services')
    const reviewCollection = client.db('Tasty_Foods').collection('reviews')
         app.get('/services', async (req,res) => {

            const query = {};
            const cursor =  serviceCollection.find(query);
            const service = await cursor.limit(3).toArray();
            res.send(service)

         })
         app.get('/allService', async (req,res) => {

            const query = {};
            const cursor =  serviceCollection.find(query);
            const service = await cursor.toArray();
            res.send(service)

         })
         
         app.get('/services/:id', async(req,res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const service = await serviceCollection.findOne(query);
            res.send(service)
         })
        
         
         app.get('/reviews', async(req,res) => {
           let query = {};
           if(req.query.email){
            query = {
               email: req.query.email
            }
           }
           const cursor = reviewCollection.find(query);
           const reviews = await cursor.toArray();
           res.send(reviews)
         })
         app.post('/reviews', async(req,res)=> {
            const review = req.body;
            const result = await reviewCollection.insertOne(review)
            res.send(result);
         })
  
         
    }
    finally{

       
    }
}
run()


app.listen(port, () => {
    console.log(' server in running : ' , {port});
})