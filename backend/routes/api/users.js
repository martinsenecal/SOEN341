const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../../config/config');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Follow = require('../../models/Follow');
const mongoose = require('mongoose');

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
    // Find Follow (followers and following) of this user.
    // const follow = await Follow.find({ follower: profile }); // might break something
    // Find all the posts of this user.


    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/users/follow
// @desc    Follow a user
// @access  Private
router.put(
  '/follow',
  [auth, [check('following_id', 'User ID is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newFollower = {
        following_id: mongoose.Types.ObjectId(req.body.following_id),
      };

      user.following.unshift(newFollower);

      await user.save();

      res.json(user.following);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


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
