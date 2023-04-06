const express = require("express");
const path = require("path")
const pool = require("../config");
router = express.Router();

const multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './static/uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })

router.get("/blogs/search", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query(
      `SELECT b.*, i.file_path FROM blogs b 
      LEFT JOIN images i ON b.id = i.id 
      WHERE b.title LIKE ?`,
      [`%${req.query.search}%`]
    );
    return res.json(rows);
  } catch (err) {
    return next(err);
  }
});


router.get("/blogs/create", async function (req, res, next) {
  res.render('blogs/create')
});

//อัพเดตเพิ่ม แสดงรูปภาพในdetail
router.get("/blogs/:id", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query("SELECT * FROM blogs WHERE id=?", [
      req.params.id,
    ]);
    const blog = rows[0];
    const [commentRows, commentFields] = await pool.query(
      "SELECT * FROM comments WHERE blog_id=?",
      [req.params.id]
    );
    const comments = commentRows;
    const [imageRows, imageFields] = await pool.query(
      "SELECT * FROM images WHERE blog_id=?",
      [req.params.id]
    );
    const images = imageRows;
    res.json({
      blog: blog,
      comments: comments,
      images: images,
    });
  } catch (err) {
    return next(err);
  }
});


// POST - create new blog with single upload file
router.post('/blogs', upload.single('myImage'), async function (req, res, next) {
  const file = req.file
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  const title = req.body.title
  const content = req.body.content
  const status = req.body.status
  const pinned = req.body.pinned ? 1 : 0
  const conn = await pool.getConnection()
  await conn .beginTransaction()
  try{
    let results = await conn.query("INSERT INTO blogs(title, content, status, pinned, `like`,create_date) VALUES(?, ?, ?, ?, 0,CURRENT_TIMESTAMP);",
      [title, content, status, pinned])
      const blogId = results[0].insertId;
      
    await conn.query('INSERT INTO images(blog_id, file_path, upload_date, main) VALUES(?, ?, CURRENT_TIMESTAMP, 1)',
      [blogId, file.path.substring(6)])
    
    await conn.commit()
    console.log("add post success!")
    res.redirect("/");
  } catch(err){
      await conn.rollback()
  } finally{
      console.log('finally')
      await conn.release()
  }
  res.redirect("/");
});

//POST เพิ่มจำนวน LIKE ของ blog
router.post("/blogs/addlike/:blogId", async function (req, res, next) {
  //ทำการ select ข้อมูล blog ที่มี id = req.params.blogId
  try{
    const [rows, fields] = await pool.query("SELECT * FROM blogs WHERE id=?", [
      req.params.blogId,
    ]);
    console.log('Selected blogs =', rows)
    let likeNum = rows[0].like
    console.log('Like num =', likeNum)
    likeNum += 1
    //Update จำนวน Like กลับเข้าไปใน DB
    const [rows2, fields2] = await pool.query("UPDATE blogs SET blogs.like=? WHERE blogs.id=?", [
      likeNum, req.params.blogId,
    ]);
    //Redirect ไปที่หน้า index เพื่อแสดงข้อมูล
    res.json({ like: likeNum });
  } catch (err) {
    return next(err);
  }
});

router.post("/blogs/addlike/:blogId", async function (req, res, next) {
  // ทำการ select ข้อมูล blog ที่มี id = req.params.blogId
  try {
    const [rows, fields] = await pool.query("SELECT * FROM blogs WHERE id=?", [
      req.params.blogId,
    ]);
    console.log("Selected blogs =", rows);
    let likeNum = rows[0].like;
    console.log("Like num =", likeNum);
    likeNum += 1;
    // Update จำนวน Like กลับเข้าไปใน DB
    const [rows2, fields2] = await pool.query("UPDATE blogs SET `like`=? WHERE id=?", [
      likeNum,
      req.params.blogId,
    ]);
    // ส่งข้อมูลใหม่กลับเป็น JSON แทนที่จะใช้ res.redirect('/')
    res.json({ likes: likeNum });
  } catch (err) {
    return next(err);
  }
});
//  Update Blog
router.put('/blogs/:id', upload.single('myImage'), async (req, res, next) => {

  const conn = await pool.getConnection()
  await conn.beginTransaction();

  try {
    const file = req.file;

    if (file) {
      await conn.query(
        "UPDATE images SET file_path=? WHERE id=?",
        [file.path, req.params.id])
    }

    await conn.query('UPDATE blogs SET title=?,content=?, pinned=?, blogs.like=?, create_by_id=? WHERE id=?', [req.body.title, req.body.content, req.body.pinned, req.body.like, null, req.params.id])
    conn.commit()
    res.json({ message: "Update Blog id " + req.params.id + " Complete" })
  } catch (error) {
    await conn.rollback();
    return next(error)
  } finally {
    console.log('finally')
    conn.release();
  }
});

//DELETE blogs
router.delete('/blogs/:id', async (req, res, next) => {

  const conn = await pool.getConnection()
  await conn.beginTransaction();

  try {
    // check blog has comment?
    let comments = await conn.query('SELECT * FROM comments WHERE blog_id=?', [req.params.id])

    if (comments[0].length > 0) {
      res.status(409).json({ message: "Can't Delete because this blog has comment!!!" })
    } else {
      await conn.query('DELETE FROM blogs WHERE id=?;', [req.params.id]) // delete blog
      await conn.query('DELETE FROM images WHERE blog_id=?;', [req.params.id]) // delete image
      await conn.commit()
      res.json({ message: 'Delete Blog id ' + req.params.id + ' complete' })
    }
  } catch (error) {
    await conn.rollback();
    next(error);
  } finally {
    console.log('finally')
    conn.release();
  }
});
exports.router = router;
