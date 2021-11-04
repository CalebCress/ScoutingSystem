import express from 'express'
import mongodb from 'mongodb'


const express = require('express')
const app = express()
const port = 3000

app.post('/submit', (req, res) => {
  res.send(200)
})

app.get('/', (req, res) => {
    res.send('scouting system root')
})

app.listen(4444, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})