const path = require('path')
const grpc = require('grpc')
const greeter = grpc.load(path.resolve(__dirname + '/greeter.proto')).greeter

class GreetingClient {
  constructor(port) {
    this.port = port
    this.client = new greeter.Greeter(`localhost:${port}`, grpc.credentials.createInsecure())
  }

  call(name, callback) {
    return this.client.greet({name: name}, (err, res) => {
      if (err) {
        console.log(err)
      }
      callback(null, res)
    })
  }
}

module.exports = GreetingClient
