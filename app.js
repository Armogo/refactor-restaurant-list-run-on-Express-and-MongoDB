// include packages
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
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

// set body-parser
app.use(express.urlencoded({ extended: true }))

// static files
app.use(express.static('public'))

// route landing page
app.get('/', (req, res) => {
  Restaurant.find() // 取出 restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(rstrts => res.render('index', {rstrts})) // 將資料傳給 index 樣板
    .catch(error => console.log(error)) // 錯誤處理
})

// route page for creating new restaurant data
app.get('/restaurants/new', (req, res) => {
  Restaurant.find()
    .lean()
    .then(rstrts => {
      const catg = []
      for (let i = 0; i < rstrts.length; i++) {
        catg.push(rstrts[i].category)
      }
      // 將現有的餐廳類別傳入new.handlebars，使用者新增餐廳資料時可以選取現有的餐廳類別
      const rstrtsCategory = Array.from(new Set(catg)) 
      res.render('new', {rstrtsCategory})
    })
    .catch(error => console.log(error))  
})

// send new restaurant data to database
app.post('/restaurants', (req, res) => {
  const name = req.body.name // 從 req.body 拿出表單裡的資料
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description }) // 存入資料庫
    .then(() => res.redirect('/')) // 完成新增資料後導回首頁
    .catch(error => console.log(error))
})

// show specific restaurant details
app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id)
    .lean()
    .then(rstrt => res.render('show', { rstrt}))
    .catch(error => console.log(error))
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