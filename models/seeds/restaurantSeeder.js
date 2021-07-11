const mongoose = require('mongoose')
const rstrtList = require('../../restaurant.json')
const Restaurant = require('../restaurant')
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  rstrtList.results.forEach(rstrt => {
    Restaurant.create({
      name: `${rstrt.name}`,
      name_en: `${rstrt.name_en}`, 
      category: `${rstrt.category}`, 
      image: `${rstrt.image}`, 
      location: `${rstrt.location}`, 
      phone: `${rstrt.phone}`, 
      google_map: `${rstrt.google_map}`, 
      rating: rstrt.rating, 
      description: `${rstrt.description}`
    })
  })
})