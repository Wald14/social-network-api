/*
  username
    - String
    - Unique
    - Required
    - Trimmed
  
  email
    - String
    - Required
    - Unique
    - Must match a valid email address (look into Mongoose matching validations)

  Schemea
    - create a virtual call friendCount that retrieves the length of the user's friends array field on query
*/

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
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      },
      required: [true, 'User email address required']
    }
  }
)


const User = mongoose.model('User', userSchema)
module.exports = User;