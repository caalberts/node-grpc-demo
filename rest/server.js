const express = require('express')
const bodyParser = require('body-parser')
const config = require('../config')

const app = express()

app.use(bodyParser.json())

app.get('/greet', (req, res) => {
  res.json({message: 'Hello world!'})
})

app.post('/greetWithName', (req, res) => {
  res.json({message: `Hello ${req.body.name}`})
})

app.listen(config.restServerPort, () => {
  console.log(`REST server listening on port ${config.restServerPort}`);
})
