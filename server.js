const path = require('path')

const express = require('express')
const app = express()

app.use(express.static('public'))
app.use('/shaders',express.static('shaders'))
app.use(express.static('dist'))

app.get('/', function (req, res) {
  res.sendFile(path.resolve('./public/index.html'))
})

app.listen(3000)