
const router = require('express').Router();

const { 
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
 } = require("../../controllers/thoughtController");

//  /api/thoughts
router.route('/')
  .get(getAllThoughts)
  .post(createThought)

//  /api/thoughts/:thoughtId
router.route('/:id')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought)

//  /api/thoughts/:thoughtId/reaction
router.route('/:id/reaction')
  .post(createReaction)
  .delete(deleteReaction)


module.exports = router;