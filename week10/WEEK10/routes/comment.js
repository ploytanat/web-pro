const express = require("express");
const pool = require("../config");
const router = express.Router();
const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './static/uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })

// Create new comment
router.post("/:blogId/comments",upload.single('comment_image'), async function (req, res, next) {
  const file = req.file
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  const blogId = req.params.blogId
  const comment = req.body.comment
  const like = req.body.like || 0
  const comment_by_id = req.body.comment_by_id || null
  const conn = await pool.getConnection()
  await conn .beginTransaction()
    try {
      const [result] = await conn.query("INSERT INTO comments (blog_id, comment, `like`, comment_by_id) VALUES (?, ?, ?, ?)",
        [blogId, comment, like, comment_by_id]);   
      // Check if there is a file upload

        await conn.query("INSERT INTO images (blog_id, comment_id, file_path, upload_date, main) VALUES (?, ?, ?, CURRENT_TIMESTAMP, 0)",
          [req.params.blogId, result.insertId, file.path.substring(6)]
        );
      
        await conn.commit()
      // Return to blog when comment success
        res.redirect(`/blogs/${req.params.blogId}`);
    } catch (err) {
      await conn.rollback()
    } finally{
      console.log('finally')
      await conn.release()
  }
  });


// Get comment 
router.get('/:blogId/comments', async function(req, res, next) {
  try {
    // Get the comments for the specified blog from the MySQL database
    const [rows] = await pool.execute('SELECT * FROM comments WHERE blog_id = ?', [
      req.params.blogId
  ]);
    // Return the comments as the response
    return res.status(200).json(rows);
  } catch (err) {
    return next(err);
  }
});


// Update comment by ID
router.put('/comments/:commentId', async function(req, res, next) {
  try {
    // Update the comment in the MySQL database
    const [result] = await pool.execute('UPDATE comments SET blog_id = ?, comment = ?, `like` = ?, comment_date = ?, comment_by_id = ? WHERE id = ?', [
      req.body.blog_id || 0 ,
      req.body.comment,
      req.body.like || 0 ,
      req.body.comment_date,
      req.body.comment_by_id || null,
      req.params.commentId
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: `Comment with id ${req.params.commentId} not found` });
    }
    const [updatedComment] = await pool.execute('SELECT * FROM comments WHERE id = ?', [req.params.commentId]);

    return res.status(200).json({
      message: `Comment ID ${req.params.commentId} is updated.`,
      comment: updatedComment[0]
    });
  } catch (err) {
    return next(err);
  }
});

  
// Delete comment
router.delete('/comments/:commentId', async function(req, res, next) {
    try {
      const [result] = await pool.execute('DELETE FROM comments WHERE id = ?', [req.params.commentId]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: `Comment with id ${req.params.commentId} not found` });
      }
      return res.status(200).json({ message: `Comment ID ${req.params.commentId} is deleted.` });
    } catch (err) {
      return next(err);
    }
  });
  
// Delete comment
router.put('/comments/:commentId', async function(req, res, next) {
    try {
      const [rows] = await pool.execute('SELECT * FROM comments WHERE id = ?', [req.params.commentId]);
      if (rows.length === 0) {
        return res.status(404).json({ message: `Comment with id ${req.params.commentId} not found` });
      }
      const [result] = await pool.execute('DELETE FROM comments WHERE id = ?', [req.params.commentId]);
      return res.status(200).json({ message: `Comment ID ${req.params.commentId} is deleted.` });
    } catch (err) {
      return next(err);
    }
  });

// add comment like
router.put('/comments/addlike/:commentId', async function (req, res, next) {
  try {
    // Select the comment with the given ID
    const [rows] = await pool.execute('SELECT * FROM comments WHERE id = ?', [req.params.commentId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: `Comment with id ${req.params.commentId} not found` });
    }
    const [result] = await pool.execute('UPDATE comments SET `like` = `like` + 1 WHERE id = ?', [req.params.commentId]);

    const [updatedRows] = await pool.execute('SELECT * FROM comments WHERE id = ?', [req.params.commentId]);
    const updatedComment = updatedRows[0];
    return res.status(200).json({
      blogId: updatedComment.blog_id,
      commentId: updatedComment.id,
      likeNum: updatedComment.like
    });
  } catch (err) {
    return next(err);
  }
});


// POST add comment like
router.post('/comments/addlike/:commentId', async function (req, res, next) {
  try {
    
    const [rows] = await pool.execute('SELECT * FROM comments WHERE id = ?', 
    [req.params.commentId]);

    let likeNum = rows[0].like
    likeNum += 1

    const [result] = await pool.execute('UPDATE comments SET comments.like=? WHERE comments.id = ?', 
    [likeNum, req.params.commentId]);
    const [updatedRows] = await pool.execute('SELECT * FROM comments WHERE id = ?', 
    [ req.params.commentId]);
    const blogId = updatedRows[0].blog_id; //อัพเดตค่าใหม่
    res.redirect(`/blogs/${blogId}`);
  } catch (err) {
     next(err);
  }
});
  
exports.router = router