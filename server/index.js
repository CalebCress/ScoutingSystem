import express from 'express'
import mongodb from 'mongodb'


const express = require('express')
const app = express()
const port = 3000

app.post('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/', (req, res) => {
    res.send('scouting system root')
})

app.listen(4444, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})