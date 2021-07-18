const rstrtList = require('../../restaurant.json')
const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')

db.once('open', () => {
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
  console.log('seed data successfully generated.')
})