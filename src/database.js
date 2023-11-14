// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://crm-mongo:crm-nocnx-1298@crm-cluster.5mewjsu.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongoose = require('mongoose')
require('dotenv').config();

// const username = "crm-mongo";
// const password = "crm-nocnx-1298";
// const cluster = "crm-cluster.5mewjsu";
// const dbname = "sample_mflix";
// let URI2 = `mongodb://crm-mongo:${password}@ac-jl1mzc8-shard-00-00.5mewjsu.mongodb.net:27017,ac-jl1mzc8-shard-00-01.5mewjsu.mongodb.net:27017,ac-jl1mzc8-shard-00-02.5mewjsu.mongodb.net:27017/nocnx?ssl=true&replicaSet=atlas-h24spz-shard-0&authSource=admin&retryWrites=true&w=majority`
let URI = process.env.URI
console.log("===process env",  process.env.NODE_ENV,"==uri",process.env.URI)
const connectToDb = async () => {
mongoose.connect( URI, { useNewUrlParser: true, useUnifiedTopology: true } )
.then((res) => console.debug("=== connected to data base"))
.catch((e) => console.debug("ERROR IN CONNECTING OT DATABSE",e))
}

connectToDb();
module.exports = connectToDb

