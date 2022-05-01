# 專案簡介
使用 restaurant.json 檔內8家餐廳資料作為 seed data，設置連接 MongoDB 資料庫以支援 CRUD 操作，運用 MongoDB 內的資料做成一個透過 Node.js 及 Express 運作的餐廳資訊網頁。

## 功能
1. 首頁上方有 search bar 讓使用者輸入關鍵字，快速查找餐廳名稱以及餐廳分類，畫面右側有排序顯示按鈕。

2. 使用可者以在首頁看到所有餐廳的簡單資料：
  - 餐廳照片
  - 餐廳名稱
  - 餐廳分類
  - 餐廳評分

3. 點選個別餐廳後，會導向該餐廳的詳細資訊頁面，顯示:
  - 類別
  - 地址
  - 電話
  - 描述
  - 圖片  

4. 使用者可以新增一家餐廳

5. 使用者可以瀏覽全部所有餐廳

6. 使用者可以編輯一家餐廳的資訊

7. 使用者可以刪除一家餐廳

<img src="./public/img/demo.gif" width="1000"></img>

---

## 安裝
1. 開啟終端機(Terminal) cd 到欲存放專案的本機位置  
  例如: `cd C:\Users\Public`
2. 執行git指令

```
git clone https://github.com/Armogo/restaurant-list-run-on-Express-and-MongoDB.git
```

2. 初始設定  
```
cd restaurant-list-run-on-Express-and-MongoDB

npm install
```

3. 安裝MongoDB Community Server 4.2.X 版本 https://www.mongodb.com/try/download/community

4. 確認 MongoDB 伺服器已啟動

5. 下載 Roto 3T(搭配 MongoDB 的圖形介面。) https://robomongo.org/

6. 開啟Roto 3T ->Connect to localhost -> Create Database -> Database Name: **restaurant**

---

## 執行程式
1. 開啟程式

```
npm run dev
```
終端機顯示"`Express is listening on localhost:3000`"及"`mongodb connected!`"即成功啟動，請至 http://localhost:3000 體驗程式。


2. 產生種子資料(執行 restaurantSeeder.js 產生 seed data 並儲存於 MongoDB)
```
npm run seed
```
終端機顯示"`seed data successfully generated.`"即成功將 seed data 儲存於 MongoDB 的 restaurant 資料庫。

3. 終止執行

在終端機(Terminal)畫面同時按 `Ctrl`+`C` 2次以終止 server 運作。

---

## 使用工具
- Visual Studio Code - 開發環境
- Express 4.17.1 - 應用程式架構
- Express-Handlebars 5.3.2 - 模板引擎
- Express-body-parser - read HTTP POST data
- Express router - 根據 Separation of Concerns (關注點分離)原則，將 route 設定從 app.js 抽出，獨立放入 routes 資料夾管理
- nodemon - 實時偵測檔案更動部分且自動重新執行應用程式
- MongoDB - database
- Roto 3T - 搭配 MongoDB 的圖形介面
- mongoose 5.13.2 - 操作 MongoDB 資料庫
- method-override 3.0.0 - 使 HTTP request 動詞可更改為 RESTful 風格，路由語義化
