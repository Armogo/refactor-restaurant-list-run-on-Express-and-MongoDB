// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用Restaurant model
const Restaurant = require('../../models/restaurant.js')

// 定義首頁路由
router.get('/', (req, res) => {
  return Restaurant.find() // 取出 restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(rstrts => res.render('index', { rstrts })) // 將資料傳給 index 樣板
    .catch(error => console.log(error)) // 錯誤處理
})

router.get('/sort-asc', (req, res) => {
  return Restaurant.find() // 取出 restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ name: 'asc' }) // 照名稱升序排列
    .then(rstrts => res.render('index', { rstrts })) // 將資料傳給 index 樣板
    .catch(error => console.log(error)) // 錯誤處理
})

router.get('/sort-desc', (req, res) => {
  return Restaurant.find() // 取出 restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ name: 'desc' }) // 照名稱降序排列
    .then(rstrts => res.render('index', { rstrts })) // 將資料傳給 index 樣板
    .catch(error => console.log(error)) // 錯誤處理
})

router.get('/sort-category', (req, res) => {
  return Restaurant.find() // 取出 restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({category: 'asc' }) // 照種類排列
    .then(rstrts => res.render('index', { rstrts })) // 將資料傳給 index 樣板
    .catch(error => console.log(error)) // 錯誤處理
})

router.get('/sort-location', (req, res) => {
  return Restaurant.find() // 取出 restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({location: 'asc' }) // 照地址排列
    .then(rstrts => res.render('index', { rstrts })) // 將資料傳給 index 樣板
    .catch(error => console.log(error)) // 錯誤處理
})

// 匯出路由器
module.exports = router