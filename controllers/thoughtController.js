const { Thought, User} = require('../models')

module.exports = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const payload = await Thought
        .find()
        .populate({path: 'userId'})
        .select('-__v')
      ;
      res.json({status: 'success', payload})
    } catch (err) {
      res.status(500).json({status: 'error', payload: err.message});
    }
  },

  // Get single thought
  async getSingleThought(req, res) {
    try {
      const payload = await Thought
        .findOne({ _id: req.params.id })
        .populate({ path: 'userId'})
        .select("-__v");
      res.json(payload)
    } catch (err) {
      res.status(500).json({status: 'error', payload: err.message});
    }
  },

  // Create a thought
  async createThought(req, res) {
    try {
      const payload = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: payload._id } },
        { runValidators: true, new: true }
      )

      if (!user) {
        return res.status(404).json({
          message: 'Thought creation aborted, no user with that ID found',
        });
      } else {
        res.json(payload)
      }

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

      const user = await User.findOneAndUpdate(
        { _id: payload.userId },
        { $addToSet: { reactions: req.params.id } },
        { runValidators: true, new: true }
      )

      res.json(`${user.username}'s following thought has been deleted: ${payload.thoughtText}`)
    } catch (err) {
      res.status(500).json({status: 'error', payload: err.message});
    }
  },

  // Create a reaction
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      )

      if (!thought) {
        return res.status(404).json({
          message: 'Reaction creation aborted, no thought with that ID found',
        });
      } else {
        res.json(thought)
      }

    } catch (err) {
      res.status(500).json({status: 'error', payload: err.message});
    }
  },

  // Delete a Reaction from a Thought
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { reactions: {_id: req.body.reactionId} } },
        { runValidators: true, new: true }
      )

      if (!thought) {
        return res.status(404).json({
          message: 'Reaction creation aborted, no thought with that ID found',
        });

      } else {
        res.json({status: "successfully deleted reaction"})
      }

    } catch (err) {
      res.status(500).json({status: 'error', payload: err.message});
    }
  },
}