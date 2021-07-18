const mongoose = require('mongoose')
// connect to mongoDB
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true }) 

// status of connection
const db = mongoose.connection
// error message
db.on('error', () => {
  console.log('mongodb error!')
})
// connection succeeds
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db