const express = require('express')
const PORT = 5000
const HOST = '0.0.0.0'


const app = express()
const productRoutes = require('./routes')
const mongoose = require('mongoose')

mongoose.connect('mongodb cluster 주소', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.use(express.json())
app.use('/api/products', productRoutes)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
