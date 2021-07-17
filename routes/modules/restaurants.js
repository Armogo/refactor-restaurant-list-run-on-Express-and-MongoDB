// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用Restaurant model
const Restaurant = require('../../models/restaurant.js')


// search bar
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.replace(/ +/g, "")
  return Restaurant.find()
    .lean()
    .then(rstrts => {
      const searchResult = rstrts.filter(rstrt => {
        return rstrt.category.toLowerCase().includes(keyword.toLowerCase()) ||
          rstrt.name.toLowerCase().includes(keyword.toLowerCase())
      })
      res.render('index', { rstrts: searchResult, keyword: keyword })
    })
})

// route page for creating new restaurant data
router.get('/new', (req, res) => {
  return Restaurant.find()
    .lean()
    .then(rstrts => {
      const catg = []
      for (let i = 0; i < rstrts.length; i++) {
        catg.push(rstrts[i].category)
      }
      const categories = Array.from(new Set(catg)) // 取得資料庫中現有的餐廳類型
      res.render('new', { categories })
    })
})

// send new restaurant data to database
router.post('/', (req, res) => {
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
router.get('/:id', (req, res) => {
  return Restaurant.findById(req.params.id)
    .lean()
    .then(rstrt => res.render('show', { rstrt }))
    .catch(error => console.log(error))
})

// route page for editing restaurant data
router.get('/:id/edit', (req, res) => {
  return Restaurant.find()
    .lean()
    .then(rstrts => {
      const catg = []
      for (let i = 0; i < rstrts.length; i++) {
        catg.push(rstrts[i].category)
      }
      const categories = Array.from(new Set(catg)) // 取得資料庫中現有的餐廳類型
      const rstrt = rstrts.find(rs => rs._id.toString() === req.params.id) // 取得指定餐廳的資料以代入表單，供使用者編輯
      res.render('edit', { rstrt, categories })
    })
    .catch(error => console.log(error))
})

// send edited restaurant data to database
router.put('/:id', (req, res) => {
  const name = req.body.name // 從 req.body 拿出表單裡的資料
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description

  return Restaurant.findById(req.params.id)
    .then(rstrt => {
      rstrt.name = name
      rstrt.name_en = name_en
      rstrt.category = category
      rstrt.image = image
      rstrt.location = location
      rstrt.phone = phone
      rstrt.google_map = google_map
      rstrt.rating = rating
      rstrt.description = description
      return rstrt.save()
    })
    .then(() => res.redirect(`/restaurants/${req.params.id}`)) // 完成新增資料後導回首頁
    .catch(error => console.log(error))
})

// delete restaurant data from database
router.delete('/:id', (req, res) => {
  return Restaurant.findById(req.params.id)
    .then(rstrt => rstrt.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


// 匯出路由器
module.exports = router