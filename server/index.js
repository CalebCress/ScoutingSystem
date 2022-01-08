const express = require('express')
const mongoose = require('mongoose');


/****************************/
/*         Database         */
/****************************/
let db

function dbSubmit(data, scout, team){
    let document = {
        team: team,
        scout: scout,
        data: data
    }
    db.collection("data").instertOne(document, (err, res) => {
        if (err) throw err
    })
}

/****************************/
/*        Webserver         */
/****************************/

const app = express()
const port = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/submit', (req, res) => {
    let body = req.body
    console.log(body)
    dbSubmit(body.data, body.scout, body.teamNumber)
    res.send(200)
})

app.get('/', (req, res) => {
    res.send('scouting system root')
})


async function main() {
  await mongoose.connect('mongodb://localhost:27017/scouting');
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

main().catch(err => console.log(err));