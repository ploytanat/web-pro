const express = require('express')
const router = express.Router()
var article = require('../article-db')


router.get('/', function(req, res){
  res.send("ไม่พบหน้าที่ต้องการ")
})

router.get('/:id', function(req, res) {
    var id = parseInt(req.params.id)
    if (isNaN(id) || id < 1 || id > article.length) { //ตรวจสอบid
        res.send('ไม่พบหน้าที่ต้องการ')
    } else {
        var data = { article:article[id-1] }
        res.render('detail', data)
    }
})

module.exports = router
