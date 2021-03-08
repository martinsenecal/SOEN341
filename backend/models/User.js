const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: 'https://i.imgur.com/ruiqShX.png',
  },
  bio: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  following: [
    {
      user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      username: {
        type: String,
      },
      profilePicture: {
        type: String,
      },
    },
  ],
  followers: [
    {
      user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      username: {
        type: String,
      },
      profilePicture: {
        type: String,
      },
    },
  ],
});

module.exports = User = mongoose.model('user', UserSchema);
