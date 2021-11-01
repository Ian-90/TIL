require('dotenv').config()
const express = require('express')
const PORT = 5000
const HOST = '0.0.0.0'

const app = express()
const productRoutes = require('./routes')
const mongoose = require('mongoose')
const { MONGODB_USER, MONGODB_PASSWORD } = process.env

mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@newcluster.4pnxy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
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

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})
app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)

module.exports = app
