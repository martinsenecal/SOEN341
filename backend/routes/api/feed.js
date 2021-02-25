const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('../../../config/config');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');

// APIs regarding: like / comment photo, post photo, get feed (photos of the users we are following)

// @route   Post api/feed
// @desc    Create a post
// @access  Private
router.post('/', auth, async (req, res) => {
  const { user, description, postedPicture } = req.body;

  try {
    const userTemp = await User.findById(user._id).select('-password');

    const newPost = new Post({
      description,
      user,
      postedPicture,
      username: userTemp.username,
      profilePicture: userTemp.profilePicture,
    });

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/feed/posts/:id
// @desc    Get post by ID
// @access  Private
router.get('/posts/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    console.log(post);
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   Get api/users/:id/posts
// @desc    Get posts in the feed
// @access  Private
router.get('/:username/posts', (req, res) => {
  try {
    // ToDo: wrong here.. we need private routes
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   Get api/feed
// @desc    Get posts in the feed (Custom)
// @access  Private
router.get('/feed/:username', async (req, res) => {
  try {
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    GET api/feed
// @desc     Get all posts
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }); //Sort by most recent
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/feed/edit/id
// @desc    Add a comment to a post
// @access  private
router.put(
  '/edit/:id',

  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        //Not a new collection in db
        text: req.body.text,
        name: user.name,
        user: req.user.id,
      };

      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/feed/comment/:id/:comment_id
// @desc    Delete comment
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    //Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    //Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    //Get remove index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
 

module.exports = router;
