const router = require('express').Router();

const { 
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
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

//  /api/users/:userId/friends/:friendId
router.route('/:id/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend)


module.exports = router;