//discussion = topic
//comment = replies
const router = require('express').Router();
// Import the Project model from the models folder
const { Comment, Discussion, User } = require('../../models')



// This is where we look up all discussions by a movie id provided in the query params
router.get('/', async (req, res) => { //I updated
  console.log(req.query)
  const movieId = req.query.movie
  const discussions = await Discussion.findAll({
    where: { movie_id: movieId }, include: { model: Comment, as: "comments" }
  })
  res.json({ status: "success", payload: discussions })
});

router.get('/:id', async (req, res) => { //I updated
  try {
    const discussion = await Discussion.findByPk(req.params.id, { include: { model: Comment, as: "comments" } })
    res.json({ status: "success", payload: discussion })
  } catch(err) {
    console.log(err)
    res.status(500).json({ status: "error", payload: err.message })
  }
});


router.post('/', async (req, res) => {
  if( !req.session ){
    return res.status(400).json(err);
  }

  const discussionData = { movie_id: req.body.movie_id, text: req.body.text}

  try {
    const result = await Discussion.create({...discussionData, user_id: req.session.user_id});

    console.log(result)
    const parsedResult = result.get({ plain: true }) 

    // if a comment was also supplied, let's add that also
    if( result.id && req.body.comment ){
      await Comment.create({
        text: req.body.comment,
        discussion_id: parsedResult.id
        // user_id: req.session.user_id
      })
    }

    res.status(200).json({ status: "success", payload: result });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Discussion.destroy({
      where: {
        id: req.params.id
      },
    });
    res.status(200).json({status: "ok"});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
