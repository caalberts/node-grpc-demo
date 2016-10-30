const path = require('path')
const grpc = require('grpc')
const proto = grpc.load(path.resolve(__dirname + '/../proto/greeter.proto'))
const greeter = proto.greeter

function greet(call, callback) {
  callback(null, {message: `Hello ${call.request.name}`})
}

function main() {
  const server = new grpc.Server()
  server.addProtoService(greeter.Greeter.service, {greet: greet})
  server.bind('0.0.0.0:3000', grpc.ServerCredentials.createInsecure())
  console.log('GRPC server running on localhost:3000');
  server.start()
}

main()
