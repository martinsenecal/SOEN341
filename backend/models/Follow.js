const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowSchema = new mongoose.Schema({
  follower: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  followee: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

module.exports = Follow = mongoose.model('follow', FollowSchema);
