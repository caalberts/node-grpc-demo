# Demo gRPC on node

## Set up project

1. `npm install`

## Run demo

Run the following in separate shells:

1. `npm start-server` to start GRPC server running on http://localhost:3000
2. `node grpc-client/client.js <NAME>` to call grpc server with optional <NAME>

## Generating protobuf

This demo uses dynamically generated protobuf at runtime, so `protoc` is not needed.
