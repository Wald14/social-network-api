/*
  /api/users

  GET all users
  
  GET a single user by _id and populated thought and friend data

  POST a new user

    // example data
      {
        "username": "lernantino",
        "email": "lernantino@gmail.com"
      }

  PUT to update a user by its _id

  DELETE to remove user by its _id

  BONUS remove user's associated thoughts when deleted
*/


/*
  /api/users/:userId/friends/:friendId

  POST to add a new friend to a user's friend list

  DELETE to remove a friend from a user's friend list
*/

const router = require('express').Router();

const { 
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
 } = require("../../controllers/userController");

//  /api/Users
router.route('/')
  .get(getAllUsers)
  .post(createUser)

//  /api/users/:userId
router.route('/:id')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser)

module.exports = router;