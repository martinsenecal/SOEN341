const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('../../../config/config');
const Post = require('../../models/Post');
const auth = require('../../middleware/auth');
 
// APIs regarding: like / comment photo, post photo, get feed (photos of the users we are following)
 
 
// @route   Post api/feed
// @desc    Post a post
// @access  Public
router.post(
   '/',
   async (req, res) => {
     const { user, description, likes, comments, date, postedPicture } = req.body;
      
     try {
      
        post = new Post({
         user,
         description,
         likes,
         comments,
         date,
         postedPicture,
       });
        await post.save();
 
        res.json(post);
     } catch (err) {
       console.error(err.message);
       res.status(500).send('Server error');
     }
   }
 );

// @route   GET api/posts/:postid
// @desc    Get a user's post
// @access  Public
router.get('/posts/:postid', auth,async(req, res) => {
  const postid = req.params.postid

     
    try {
      const post = await Post.findOne({"postid":req.post_id});
    
      if (!profile) {
        return res.status(400).json({ msg: 'There is no  post with this id' });
      }


       res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//do we need this here or we'll put it in users after profile???
//also here I'd change id to username (in the users.js)
// @route   Get api/users/:id/posts
// @desc    Get posts in the feed
// @access  Public
router.get('/:username/posts', (req, res) => {

     
    try {



       res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   Get api/feed
// @desc    Get posts in the feed
// @access  Public
router.get('/feed/:username', async(req, res) => {

     
  try {



     res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}
);



 module.exports = router;