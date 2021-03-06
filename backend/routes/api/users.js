const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../../config/config');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Follow = require('../../models/Follow');

// @route   Post api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('username', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, name, email, password } = req.body;

    //See if user exists
    try {
      let user = await User.findOne({ email });
      let existingUsername = await User.findOne({ username });

      if (existingUsername) {
        return res.status(400).json({ errors: [{ msg: 'Username is taken' }] });
      }

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        username,
        name,
        email,
        password,
      });
      //create salt
      const salt = await bcrypt.genSalt(10);
      //hash password
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      //Encrypt password

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.JWTSECRET,
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/users/:username
// @desc    Get current users profile
// @access  Private
router.get('/:username', auth, async (req, res) => {
  try {
    const profile = await User.findOne({
      username: req.params.username,
    }).select('-password');

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/users/posts/:username
// @desc    Get all posts by user
// @access  Private
router.get('/posts/:username', auth, async (req, res) => {
  try {
    const posts = await Post.find({
      username: req.params.username,
    }).select();

    if (posts.length === 0) {
      return res.status(400).json({ msg: 'No posts found for user' });
    }

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/users/settings/:username
// @desc    Get user settings
// @access  Private
router.get('/settings/:username', auth, async (req, res) => {
  try {
    const profile = await User.findOne({
      username: req.params.username,
    }).select('-password');

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/users/settings
// @desc    Modify user settings
// @access  Private
router.put(
  '/settings',
  [auth, [check('username', 'Username is required').not().isEmpty()]],
  async (req, res) => {
    // To Do: Let user modify his: bio, name, profile picture.

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { bio, profilePicture, name } = req.body;

    //Build User Object
    const userFields = {
      profilePicture,
      name,
      bio,
    };

    let user = await User.findOne(req.user_id);
    // let existingUsername = await User.findOne({ username });

    // if (user.username !== username && existingUsername) {
    //   return res
    //     .status(400)
    //     .json({ errors: [{ msg: 'Username already exists' }] });
    // }

    try {
      let user = await User.findOneAndUpdate(
        { id: req.user_id },
        { $set: userFields },
        { new: true, setDefaultsOnInsert: true, useFindAndModify: false }
      );

      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route   GET api/users/search/:search_term
// @desc    Get user objects matching search term
// @access  Private
router.get('/search/:search_term', auth, async (req, res) => {
  try {
    //return array of users
    const users = await User.find({
      //match either username or name to search term
      $or: [
        { username: { $regex: req.params.search_term, $options: 'i' } },
        { name: { $regex: req.params.search_term, $options: 'i' } },
      ],
    }).select('-password');

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
