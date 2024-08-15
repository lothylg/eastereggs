const router = require('express').Router();
// Import the User model from the models folder
const { Comment } = require('../../models');

router.get('/', async (req, res) => {
    // check if a tpoc id was provided
    const topic_id = req.query.topic

  try {
    const comments = await Comment.findAll({
        where: {
            topic_id: topic_id
        }
    });
    res.json({ comments })
  } catch (err) {
    res.status(400).json(err);
  }
});



module.exports = router;
