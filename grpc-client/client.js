const path = require('path')
const grpc = require('grpc')
const greeter = grpc.load(path.resolve(__dirname + '/../proto/greeter.proto')).greeter

const PORT = 3000

class GreetingClient {
  constructor(port) {
    this.port = port
    this.client = new greeter.Greeter(`localhost:${port}`, grpc.credentials.createInsecure())
  }

  call(user) {
    this.client.greet({name: user}, (err, res) => {
      if (err) {
        console.log(err)
      }
      console.log(`Greeting: ${res.message}`)
    })
  }
}

const user = process.argv.length >= 3 ? process.argv[2] : 'world'

new GreetingClient(3000).call(user)
