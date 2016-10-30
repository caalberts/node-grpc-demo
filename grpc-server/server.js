const path = require('path')
const grpc = require('grpc')
const greeter = grpc.load(path.resolve(__dirname + '/../proto/greeter.proto')).greeter

const PORT = 3000

class Server {
  constructor(port) {
    this.server = new grpc.Server()
    this.handlers = {
      greet: this.greet
    }
    this.port = port
  }

  greet(call, callback) {
    callback(null, {message: `Hello ${call.request.name}`})
  }

  start() {
    this.server.addProtoService(greeter.Greeter.service, this.handlers)
    this.server.bind(`0.0.0.0:${this.port}`, grpc.ServerCredentials.createInsecure())
    console.log(`GRPC server running on localhost:${this.port}`);
    this.server.start()
  }
}

new Server(PORT).start()
