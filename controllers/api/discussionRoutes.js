//discussion = topic
//comment = replies
const router = require('express').Router();
// Import the Project model from the models folder
const { Discussion, User } = require('../../models')



// This is where we look up all discussions by a movie id provided in the query params
router.get('/', async (req, res) => { //I updated
  const movieId = req.query.movie
  const discussions = await Discussion.findAll({
    where: {
      movie_id: movieId
    }
  })
  res.json({ payload: discussions })
});


// If a POST request is made to /api/projects, a new project is created. If there is an error, the function returns with a 400 error. 
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

// If a DELETE request is made to /api/projects/:id, that project is deleted. 
router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: 'No usert found with this id!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});



// const allProjects = await User.findAll({})
// let fixedProjectArr = []
// allProjects.forEach( project => )

module.exports = router;
