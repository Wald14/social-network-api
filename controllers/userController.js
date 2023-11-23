/*
  /api/users

  DONE GET all users
  
  DONE GET a single user by _id and populated thought and friend data

  POST a new user

    // example data
      {
        "username": "lernantino",
        "email": "lernantino@gmail.com"
      }

  DONE PUT to update a user by its _id

  DONE DELETE to remove user by its _id

  BONUS remove user's associated thoughts when deleted
*/


/*
  /api/users/:userId/friends/:friendId

  POST to add a new friend to a suer's friend list

  DELETE to remove a friend from a user's friend list
*/

const { Thought, User} = require('../models')

module.exports = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const payload = await User.find();
      res.json({status: 'success', payload})
    } catch (err) {
      res.status(500).json({status: 'error', payload: err.message});
    }
  },

  // Get single user
  async getSingleUser(req, res) {
    try {
      const payload = await User.findOne({ _id: req.params.id });
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
      const payload = await User.findOneAndDelete({ _id: req.params.id }
      );
      res.json(payload)
    } catch (err) {
      res.status(500).json({status: 'error', payload: err.message});
    }
  },

}