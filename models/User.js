const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username required'],
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(v) {
          return /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      },
      required: [true, 'User email address required']
    },

    thoughts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought'
    }],

    friends: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],

  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
)

userSchema.virtual('friendCount').get(function () {
  return this.friends.length
})

const User = mongoose.model('User', userSchema)
module.exports = User;