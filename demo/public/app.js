class App {
  callGrpc() {
    name = document.querySelector('#name').value
    window.fetch(`http://localhost:8080/call-grpc?name=${name}`)
      .then(res => res.json())
      .then(response => this.showResponse(response.message))
      .catch(console.log)
  }

  showResponse(message) {
    document.querySelector('#response').value = message
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
