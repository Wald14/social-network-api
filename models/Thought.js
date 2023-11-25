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
    - Create a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.



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


const reactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      min: [1, "min of 1 character needed"],
      max: [280, 'Max of 280 characters']
    },
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    // },
    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
)


const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: [1, "min of 1 character needed"],
      max: [280, "Max of 280 characters allowed"]
    },
    createdAt: { type: Date, default: Date.now },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
)

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length
})

const Thought = mongoose.model('Thought', thoughtSchema)
module.exports = Thought;