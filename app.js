// include packages
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const methodOverride = require('method-override') // 載入 method-override
const routes = require('./routes') // 引用路由器

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

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
}) 