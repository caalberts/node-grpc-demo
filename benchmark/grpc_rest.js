const Benchmark = require('benchmark')
const GrpcClient = require('../grpc/client')
const http = require('http')

const config = require('../config.js')
const grpcClient = new GrpcClient(config.grpcServerPort)

const suite = new Benchmark.Suite

suite
  .add('GRPC#greet', {
    defer: 'true',
    fn: function(deferred) {
      grpcClient
        .call('John', (err, res) => {
          deferred.resolve()
        })
    }
  })
  .add('REST#greet', {
    defer: 'true',
    fn: function(deferred) {
      http
        .get(`http://localhost:${config.restServerPort}/greet?name=John`, (res) => {
          rawData = ''
          res.on('data', (chunk) => rawData += chunk)
          res.on('end', () => {})
          deferred.resolve()
        })
        .on('error', console.log)
    }
  })
  .on('cycle', e => {
    console.log(String(e.target))
  })
  .on('complete', function () {
    console.log('completed benchmark')
    console.log(`Fastest is ${this.filter('fastest').map('name')}`)
  })
  .run()
