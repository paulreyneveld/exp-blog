const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// GET Generic redirect
router.get('/', async (req, res) => {
  let data = await Post.find({})/*.limit(10)*/.catch(err => console.log(err));
  console.log(JSON.stringify(data));
  res.render('data', { data: data });
});

// GET Retrieve new post form 
router.get('/new', (req, res) => {
  res.render('post_form');
});

// POST Send new post data 
router.post('/new', (req, res, next) => {
  console.log(req.body);
  let post = new Post( 
  {
   content: req.body.content, 
   author: req.body.author,   
  });
  post.save(function(err) {
    if (err) {return next(err);}
    res.send('Success');
  });
});

module.exports = router;
