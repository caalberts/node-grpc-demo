const express = require('express')
const config = require('../config')

const app = express()

app.get('/greet', (req, res) => {
  response = {message: `Hello ${req.query.name}`}
  res.json(response)
})

app.listen(config.restServerPort, () => {
  console.log(`REST server listening on port ${config.restServerPort}`);
})
