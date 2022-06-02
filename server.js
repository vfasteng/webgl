const path = require('path')

const express = require('express')
const app = express()

const glob = require('./glob')


app.use(express.static('./'))
app.use(express.static('dist'))
//app.use('/scripts',express.static('scripts'))


app.get('/files.json', function (req, res) {
  const files=glob('./scripts/').map(file=>file.replace('./scripts//','/scripts/'))
  //console.log(files);
  //for(const file of files)
  res.json(files)
})

app.get('/', function (req, res) {
  res.sendFile(path.resolve('./index.html'))
})

app.listen(3000)