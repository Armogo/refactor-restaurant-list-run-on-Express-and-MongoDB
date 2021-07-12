// include packages
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const rstrtList = require('./restaurant.json')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true }) // connect to mongoDB

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

// set up template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  Restaurant.find() // 取出 restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(rstrts => res.render('index', {rstrts})) // 將資料傳給 index 樣板
    .catch(error => console.log(error)) // 錯誤處理
})

// show specific restaurant details
app.get('/restaurants/:id', (req, res) => {
  const rstrt = rstrtList.results.find(rstrt => rstrt.id.toString() === req.params.id)
  res.render('show', {rstrt: rstrt})
})

// search bar
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.replace(/ +/g, "")
  const rstrts = rstrtList.results.filter(rstrt => {
    return rstrt.category.toLowerCase().includes(keyword.toLowerCase()) ||
    rstrt.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', {rstrts: rstrts, keyword: keyword})
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
}) 