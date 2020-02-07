var express = require('express')
var app = express()
var gpiop = require('rpi-gpio').promise

app.use(express.static('dist'))

/// / reply to request with "Hello World!"
// app.get('/', function (req, res) {
//  res.render('index.html')
// })

app.get('/pin/:pinnum', (req, res) => {
  const pin = Number(req.params.pinnum)
  console.log(pin)

  return gpiop.setup(pin, gpiop.DIR_OUT)
    .then(() => gpiop.write(pin, true))
    .then(() => {
      res.send(200)
    })
    .catch((err) => {
      console.log('Error: ', err.toString())
      res.send(500, err.toString())
    })
})

app.get('/pins', async (req, res) => {
  const pins = [
    7,
    11
  ]

  const data = []

  for (const pin of pins) {
    const enabled = await gpiop.setup(pin, gpiop.DIR_OUT)
      .then(() => gpiop.read(pin))
      .catch((err) => {
        console.log('Error: ', err.toString())
        res.send(500, err.toString())
      })

    data.push({
      pin,
      enabled
    })
  }

  res.json(data)
})

// start a server on port 80 and log its start to our console
var server = app.listen(80, function () {
  var port = server.address().port
  console.log('Example app listening on port ', port)
})
