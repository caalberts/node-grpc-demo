class App {
  callGrpc() {
    window.fetch('http://localhost:8080/call-grpc')
      .then(res => res.json())
      .then(response => console.log(response))
      .catch(console.log)
  }
}

window.onload = function() {
  app = new App()
  document.querySelector('.call-grpc')
    .addEventListener('click', event => {
      event.preventDefault()
      app.callGrpc()
    })
}
