const express = require('express')
const GrpcClient = require('./grpc-client')
const config = require('../config')

const app = express()
const client = new GrpcClient(config.grpcServerPort)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  next()
})

app.get('/call-grpc', (req, res) => {
  client.call('message', (err, response) => {
    if (err) console.log(err)
    res.status(200).json(response)
  })
})

app.listen(config.demoServerPort, () => {
  console.log(`Demo app listening on port ${config.demoServerPort}`);
})
