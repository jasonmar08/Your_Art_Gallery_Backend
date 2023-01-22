const mongoose = require('mongoose')
require('dotenv').config()

let dbUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI
    : process.env.MONGODB_LOCAL

const app = require('express')()

if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true)
}

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB!')
    // Start the server once the connection is established
    app.listen(process.env.PORT || 3001, () => {
      console.log('Server started on port 3001')
    })
  })
  .catch((e) => {
    console.error('Connection error', e.message)
  })

const db = mongoose.connection

module.exports = db
