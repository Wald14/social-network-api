/*
  /api/thoughts

  DONE GET to get all thoughts

  DONE GET to get a single thought by its _id

  POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

    // example data
      {
        "thoughtText": "Here's a cool thought...",
        "username": "lernantino",
        "userId": "5edff358a0fcb779aa7b118b"
      }

  DONE PUT to update a thought by its _id

  DONE DELETE to remove a thought by its _id

*/


/*
  POST to create a reaction stored in a single thought's reaction array field

  DELETE to pull and remove a reaction by the reaction's reactionId value
*/

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