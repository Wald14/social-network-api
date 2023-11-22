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
  
)






const User = mongoose.model('User', userSchema)
module.exports = User;