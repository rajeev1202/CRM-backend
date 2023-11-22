const mongoose = require('mongoose')
require('dotenv').config();
let URI = process.env.URI
console.log("===process env",  process.env.NODE_ENV,"==uri",process.env.URI)
const connectToDb = async () => {
mongoose.connect( URI, { useNewUrlParser: true, useUnifiedTopology: true } )
.then((res) => console.debug("=== connected to data base"))
.catch((e) => console.debug("ERROR IN CONNECTING OT DATABSE",e))
}

connectToDb();
module.exports = connectToDb

