const express = require('express')
const router = express.Router()
var article = require('../article-db')

router.get('/', function(req, res, next) {
    
    if(req.query.search == '' || req.query.search == null){
        var searchData = article; 
    }else{ 
        var searchValue = req.query.search; //เก็บข้อมูลที่ถูกส่งมาจาก client
        var searchData = [];
        article.map((val) =>{ 
            if(val.title.toLowerCase().includes(searchValue.toLowerCase())){
                searchData.push(val)
            }
        })
    }

    var data = { title: 'YOUBLOG', article: searchData }
    res.render('index', data) //render data ไปที่ index.ejs
})


module.exports = router
 
 
