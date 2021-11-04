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
    let document = {
        team: team,
        scout: scout,
        data: data
    }
    db.collection("data").instertOne(document, (err, res) => {
        if (err) throw err
        console.log("1 document inserted to data:")
        console.log(document)
        db.close()
    })
}

/****************************/
/*           API            */
/****************************/

const app = express()
const port = 3000

app.post('/submit', (req, res) => {
    let body = await req.body
    dbSubmit(body.data, body.scout, body.teamNumber)
    res.send(200)
})

app.get('/', (req, res) => {
    res.send('scouting system root')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})