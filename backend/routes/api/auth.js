const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../../config/config');
const { check, validationResult } = require('express-validator'); //Validators

const User = require('../../models/User');

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Authenticate User & Get Token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //Bad Request
    }

    const { email, password } = req.body; //Destructuring

    try {
      //See if User Exists
      let user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] }); //Have same message than line #47 to avoid giving too much details to an hacker
      }

      //Return jsonwebtoken: to be able to access protected routes
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.JWTSECRET,
        { expiresIn: 360000000000000000000000000 }, //modify to 3600 before deployment
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      //Something is wrong with the server:
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
