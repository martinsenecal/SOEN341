const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../../config/config');
const auth = require('../../middleware/auth');

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

// Goal: add APIs regarding: modifying profile info, delete users/profile, follow/unfollow users, get profile (by id)

// @route   GET api/users/:id
// @desc    Get current users profile
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const profile = await User.findById(req.params.id).select('-password');
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

// @route   PUT api/users/:id
// @desc    Modify user settings
// @access  Private

//Add get request

router.put(
    '/settings',
    [
      auth,
      [
        check('username', 'Username is required').not().isEmpty(),
      ],
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {
        username,
        bio,
        profilePicture,
        name
      } = req.body;
  
      //Build User Object
      const userFields = {
        profilePicture,
        username,
        name
      };
  
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
  

module.exports = router;
