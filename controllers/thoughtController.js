/*
  /api/thoughts

  GET to get all thoughts

  GET to get a single thought by its _id

  POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

    // example data
      {
        "thoughtText": "Here's a cool thought...",
        "username": "lernantino",
        "userId": "5edff358a0fcb779aa7b118b"
      }

  PUT to update a thought by its _id

  DELETE to remove a thought by its _id

*/

/*
  POST to create a reaction stored in a single thought's reaction array field

  DELETE to pull and remove a reaction by the reaction's reactionId value
*/

const { Thought, User} = require('../models')

module.exports = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const payload = await Thought.find();
      res.json({status: 'success', payload})
    } catch (err) {
      res.status(500).json({status: 'error', payload: err.message});
    }
  },

  // Get single thought
  async getSingleThought(req, res) {
    try {
      const payload = await Thought.findOne({ _id: req.params.id });
      res.json(payload)
    } catch (err) {
      res.status(500).json({status: 'error', payload: err.message});
    }
  },

  // Create a thought
  async createThought(req, res) {
    try {
      const payload = await Thought.create(req.body);
      res.json(payload)
    } catch (err) {
      res.status(500).json({status: 'error', payload: err.message});
    }
  },

  // Update a thought
  async updateThought(req, res) {
    try {
      const payload = await Thought.findOneAndUpdate(
        { _id: req.params.id},
        { $set: req.body },
        { runValidators: true, new: true }
      );
      res.json(payload)
    } catch (err) {
      res.status(500).json({status: 'error', payload: err.message});
    }
  },

  // Delete a thought
  async deleteThought(req, res) {
    try {
      const payload = await Thought.findOneAndDelete({ _id: req.params.id }
      );
      res.json(payload)
    } catch (err) {
      res.status(500).json({status: 'error', payload: err.message});
    }
  },

}