const Benchmark = require('benchmark')
const GrpcClient = require('../grpc/client')
const http = require('http')

const config = require('../config.js')
const grpcClient = new GrpcClient(config.grpcServerPort)

const suite = new Benchmark.Suite

suite
  .add('GRPC#greet', {
    defer: 'true',
    fn: grpcGreet
  })
  .add('GET#greet', {
    defer: 'true',
    fn: restGreet
  })
  .add('GRPC#greetWithName', {
    defer: 'true',
    fn: grpcGreetWithName
  })
  .add('POST#greetWithName', {
    defer: 'true',
    fn: postGreetWithName
  })
  .on('cycle', e => console.log(String(e.target)))
  .on('complete', () => console.log('completed benchmark'))
  .run()

function grpcGreet(deferred) {
  grpcClient
    .greet((err, res) => {
      deferred.resolve()
    })
}

function restGreet(deferred) {
  http
    .get(`http://localhost:${config.restServerPort}/greet`, (res) => {
      rawData = ''
      res.on('data', (chunk) => rawData += chunk)
      res.on('end', () => {
        deferred.resolve()
      })
    })
    .on('error', console.log)
}

function grpcGreetWithName(deferred) {
  grpcClient
    .greetWithName('Albert', (err, res) => {
      deferred.resolve()
    })
}

function postGreetWithName(deferred) {
  const postData = JSON.stringify({'name': 'Albert'})
  const opts = {
    hostname: 'localhost',
    port: config.restServerPort,
    path: '/greetWithName',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  }

  const req = http.request(opts, (res) => {
    rawData = ''
    res.on('data', (chunk) => rawData += chunk)
    res.on('end', () => {
      deferred.resolve()
    })
  })
  req.on('error', console.log)
  req.write(postData)
  req.end()
}
