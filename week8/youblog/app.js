
const express = require('express')
const app = express()
const path = require('path')
// Setup ejs เพื่อใช้templateของejsร่วมกัน
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Setup static path พวกรูปภาพ
app.use(express.static(path.join(__dirname, 'public')))
// Config Router ทำการใช้routerที่แยกไว้เป็นสัดส่วน
const indexRouter = require('./routes/index')
const blogRouter = require('./routes/blog')

app.use('/', indexRouter)
app.use('/blog', blogRouter)

app.listen(3000, () => {
  console.log('Start server at port 3000.')
})

// ดึงข้อมูล json มาเก็บไว้ในตัวแปร
const article = require('./article-db')
// กำหนดให้ path blogapi แสดงข้อมูลบทความทั้งหมดในรูปแบบ json
app.get('/blogapi', (req, res) => {
  res.json(article)
})
// กำหนดให้ path blogapi/id แสดงข้อมูลบทความตาม id ที่กำหนด
app.get('/blogapi/:id', (req, res) => {
  res.json(article.find(article => article.id === req.params.id))
})


