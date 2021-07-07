// include packages
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const rstrts = require('./restaurant.json')

// set up template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', {rstrts: rstrts.results})
})

// show specific restaurant details
app.get('/restaurants/:id', (req, res) => {
  const rstrt = rstrts.results.find(rstrt => rstrt.id.toString() === req.params.id)
  res.render('show', {rstrt: rstrt})
})

// search bar

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
}) 