const express = require('express')
const { MongoClient } = require('mongodb')


/****************************/
/*         Database         */
/****************************/
// Connection URI
const uri =
  "mongodb+srv://localhost:27017/scouting" //uses scouting database

// Create a new MongoClient
const client = new MongoClient(uri)
async function run() {
  try {
    // Connect the client to the server
    await client.connect()
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 })
    console.log("Connected successfully to server")
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

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