const express = require('express')
const { MongoClient } = require('mongodb')


/****************************/
/*         Database         */
/****************************/

// Connection URI
const uri =
  "mongodb+srv://localhost:27017/scouting" //uses scouting database

// Create a new MongoClient
const mclient = new MongoClient(uri)
let db

MongoClient.connect(url, function(err, db) {
    if (err) throw err
    db = db.db("mydb")
})

function dbSubmit(data, scout, team){
    db.collection("data")
}

/****************************/
/*           API            */
/****************************/

const app = express()
const port = 3000

app.post('/submit', (req, res) => {
    
    res.send(200)
})

app.get('/', (req, res) => {
    res.send('scouting system root')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})