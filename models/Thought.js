/*
  toughtText
    - String
    - Required
    - Must be between 1 and 280 characters

  createdAt
    - Date
    - Set default value to the current timestamp
    - Use a getter method to format the timestam on query

  username (the user that created this thought)
    - String
    - Required

  reactions (aka replies)
    - Array of nested documents created with the reactionSchema

  Schema's
    - create a virtual call friendCount that retrieves the length of the user's friends array field on query
    - Reation (Schema Only - this will not be a model, but rather be used as the reaction field's subdocument schema in the Thought model)
        + reationId
            - Use Monngoose's ObjectId data type
            - Default value is set to a new ObjectId
        + reactionBody
            - String
            - Required
            - 280 character maximum
        + username
            - string
            - required
        + createdAt
            - date
            - set default value to the current timestamp
            - user a getter method to format the timestamp on query
*/
const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema(
  
)






const Thought = mongoose.model('Thought', thoughtSchema)
module.exports = Thought;