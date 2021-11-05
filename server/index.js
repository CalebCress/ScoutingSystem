const express = require('express')
const { MongoClient } = require('mongodb')


/****************************/
/*         Database         */
/****************************/

// Connection URI
const url = "mongodb://localhost:27017/"

// Create a new MongoClient
let db

MongoClient.connect(url, function(err, dbc) {
    if (err) throw err
    db = dbc.db("scouting")
    console.log("connected to db")
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
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.post('/submit', (req, res) => {
    let body = req.body
    console.log(req)
    dbSubmit(body.data, body.scout, body.teamNumber)
    res.send(200)
})

app.get('/', (req, res) => {
    res.send('scouting system root')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})