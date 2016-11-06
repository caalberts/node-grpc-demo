# Demo gRPC on node

## Set up project

1. `npm install`

## Run demo

Run the following in separate shells:

1. `node grpc/server.js` to start GRPC server running on http://localhost:3000
2. `node rest/server.js` to start REST server running on http://localhost:4000
2. `node demo/server.js` to start demo server on http://localhost:8080

## Run Benchmark

1. `node benchmark/grpc_rest.js`

## Generating protobuf

This demo uses dynamically generated protobuf at runtime, so `protoc` is not needed.
