require('dotenv').config()
const express = require('express')

// get MongoDB driver connection
const dbo = require('./db/conn')
const cors = require('cors')

const PORT = 5000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(require('./routes/record'))

app.get("/", (req, res) => {
  res.send("scouting system")
})

// Global error handling
app.use(function (err, _req, res) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err)
    process.exit()
  }

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
  })
})