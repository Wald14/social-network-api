const { Thought, User} = require('../models')

module.exports = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const payload = await User
        .find()
        .select('-__v');
      res.json({status: 'success', payload})
    } catch (err) {
      res.status(500).json({status: 'error', payload: err.message});
    }
  },

  // Get single user
  async getSingleUser(req, res) {
    try {
      const payload = await User
        .findOne({ _id: req.params.id })
        .populate({ path: 'thoughts' })
        .select('-__v');
      res.json(payload)
    } catch (err) {
      res.status(500).json({status: 'error', payload: err.message});
    }
  },

  // Create a user
  async createUser(req, res) {
    try {
      const payload = await User.create(req.body);
      res.json(payload)
    } catch (err) {
      res.status(500).json({status: 'error', payload: err.message});
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const payload = await User.findOneAndUpdate(
        { _id: req.params.id},
        { $set: req.body },
        { runValidators: true, new: true }
      );
      res.json(payload)
    } catch (err) {
      res.status(500).json({status: 'error', payload: err.message});
    }
  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      const userInfo = await User
        .findOne({ _id: req.params.id })
        .populate({ path: 'thoughts' })
        .select('-__v');

      userInfo.thoughts.forEach(async (thought) => {
        try {
          const payload = await Thought.findOneAndDelete({ _id: thought }
          );
        } catch (err) {
          res.status(500).json({status: 'error', payload: err.message});
        }
      })

      const payload = await User.findOneAndDelete({ _id: req.params.id }
      );
      // res.json(payload)
      res.json(`The user ${payload.username} has been deleted from the database`)
    } catch (err) {
      res.status(500).json({status: 'error', payload: err.message});
    }
  },

  // Add a friend to User
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )

      if (!user) {
        return res.status(404).json({
          message: 'No user with that ID found',
        });
      } else {
        res.json({status: `Successfully added friend to ${user.username}'s friend list`})
      }

    } catch (err) {
      res.status(500).json({status: 'error', payload: err.message});
    }
  },

  // Delete a Friend from a User
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )

      if (!user) {
        return res.status(404).json({
          message: 'No user with that ID found',
        });
      } else {
        res.json({status: `Successfully removed friend from ${user.username}'s friend list`})
      }

    } catch (err) {
      res.status(500).json({status: 'error', payload: err.message});
    }
  },

}