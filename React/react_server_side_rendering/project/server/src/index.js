const express = require('express')
const React = require('react')
const rednerToString = require('react-dom/server'),rednerToString
const Home = require('./client/components/Home').default
const app = express()

app.get('/', (req, res) => {
  const content = rednerToString(<Home />)

  res.send(content)
})

app.listen(3000, () => {
  console.log('Listening on port 300')
})