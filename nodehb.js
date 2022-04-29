let express = require('express');
let app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const mongoUrl = "mongodb+srv://chhutimistry:testChhuti@cluster0.qmuiy.mongodb.net/HealingBlues?retryWrites=true&w=majority"
const dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 1607;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

// Welcome page
app.get('/',(req,res) => {
     res.send("<h1>Welcome to server of Healing Blues</h1>")
})

// Category details
app.get('/category',(req,res) => {
     db.collection(`category`).find().toArray((err, result) => {
          if(err) throw err;
          res.send(result)
     })
})

// Sort (Low to High)
app.get('/sortfromlow',(req,res) => {
     let sort = {price:1}
     let query = {}
     if(req.query.sort){
          sort={cost:Number(req.query.sort)}
     }
     db.collection('services').find(query).sort(sort).toArray((err,result) => {
          if(err) throw err;
          res.send(result)
     })
})

// Sort (High to Low)
app.get('/sortfromhigh',(req,res) => {
     let sort = {price:-1}
     let query = {}
     if(req.query.sort){
          sort={cost:Number(req.query.sort)}
     }
     db.collection('services').find(query).sort(sort).toArray((err,result) => {
          if(err) throw err;
          res.send(result)
     })
})

// Service details
app.get('/services',(req,res) => {
     db.collection(`services`).find().toArray((err, result) => {
          if(err) throw err;
          res.send(result)
     })
})

// Place Order
app.post('/placeOrder',(req, res) => {
     db.collection('orders').insert(req.body,(err, result) => {
          if(err) throw err;
          res.send('Order Placed')
     })
})

// View Order
app.get('/viewOrder',(req, res) => {
     let email = req.query.email;
     let query = {};
     if(email){
          query = {"email": email}
     }
     db.collection('orders').find(query).toArray((err, result) => {
          if(err) throw err;
          res.send(result)
     })
})

// Connection with db
MongoClient.connect(mongoUrl, (err, client) => {
     if(err) console.log(`Error while connecting`);
     db = client.db('HealingBlues');
     app.listen(port,() => {
          console.log(`Server is running on port ${port}`)
     })
})