const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../../config/config');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
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

      const newFollowing = {
        following_id: mongoose.Types.ObjectId(req.body.following_id),
      };

      user.following.unshift(newFollowing);

      await user.save();

      res.json(user.following);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/users/follow/:id/:followee_id
// @desc    Remove a user following
// @access  Private
router.delete('/follow/:id/:followee_id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    //Pull out a user being followed (followee)
    const followee = user.following.find(
      (followee) => followee.id === req.params.followee_id
    );

    //Make sure user exists
    if (!followee) {
      return res.status(404).json({ msg: 'User does not exist' });
    }

    //Get remove index
    const removeIndex = user.following
      //.map((followee) => followee.user.toString())
      .indexOf(req.user.id);

    user.following.splice(removeIndex, 1);

    await user.save();

    return res.json(user.following);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/users/follower
// @desc    Another user following the logged in user
// @access  Private
router.put(
  '/follower',
  [auth, [check('follower_id', 'User ID is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newFollower = {
        follower_id: mongoose.Types.ObjectId(req.body.follower_id),
      };

      user.followers.unshift(newFollower);

      await user.save();

      res.json(user.followers);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/users/follower/:id/:follower_id
// @desc    Remove a user follower
// @access  Private
router.delete('/follower/:id/:follower_id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    //Pull out a follower
    const follower = user.followers.find(
      (follower) => follower.id === req.params.follower_id
    );

    //Make sure user exists
    if (!follower) {
      return res.status(404).json({ msg: 'User does not exist' });
    }

    //Get remove index
    const removeIndex = user.followers
      //.map((follower) => follower.user.toString())
      .indexOf(req.user.id);

    user.followers.splice(removeIndex, 1);

    await user.save();

    return res.json(user.followers);
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
