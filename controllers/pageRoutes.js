const router = require("express").Router();
const { User, Comment, Discussion } = require('../models');
const { getRandomMovie, searchMovies } = require("../services/movie.service")
const { randomNumber } = require("../utils/random")

// Home page
router.get('/', async (req, res) => {
  try {
    const randomMovies = await getRandomMovie()
    const singleRandomMovie = randomMovies.find( (movie, idx) => idx === randomNumber(0, randomMovies.length-1) )
    const discussionsData = await Discussion.findAll({
        where: {movie_id: singleRandomMovie.imdbID}, include: { model: Comment, as: "comments" }
    })
    res.render('homepage', {random: randomMovies, single: singleRandomMovie, discussions: discussionsData} );
} catch (err) {
    console.error(err);22
    res.status(500).json({ error: 'Failed to fetch recent movies', details: err.message });
  }
});


// Login/signup page
router.get('/login', async (req,res) => {
  const random = await getRandomMovie()
  res.render('login', { random })
});


// User profile page
router.get('/profile', async (req, res) => {
  const randomMovies = await getRandomMovie()

  if( !req.session.user_id ){
   return res.redirect("/")
  }

  try {
    const user = await User.findByPk(req.session.user_id);
    const userData = user.get({ plain: true })

    if (!user) {
      return res.redirect("/")
    }

    const discussions = await Discussion.findAll({
      where: { user_id: req.session.user_id }
    });

    const discussionsData = discussions.map(discussion => discussion.get({ plain: true }));

      res.render('profile', {
          user: userData,
          random: randomMovies,
          discussions: discussionsData
      });
  } catch (error) {
      console.error('Error fetching user and discussions:', error);
      res.status(500).send('Internal Server Error');
  }
});


// Movie detail and discussion page
router.get('/movie/:id', async (req, res) => {
  const random = await getRandomMovie()

  // lookup the movie
  const movieId = req.params.id
  const movie = await searchMovies("id", movieId)

  // get all discussions
  const discussionData = await Discussion.findAll({ where: { movie_id: movieId }, include: { model: Comment, as: "comments" } })
  const discussions = discussionData.map( disc => disc.get({ plain: true}) )

  // if there was a topic id in the url, look up that also
  let currTopic = null
  if( req.query.topic ){
      const currTopicData = await Discussion.findByPk(req.query.topic, { include: { model: Comment, as: "comments" } } )
      currTopic = currTopicData.get({ plain: true })
  }
  
  res.render('movie', { 
      random,
      movie, 
      discussions, 
      currTopic,
      not_logged_in: req.session?.user_id === undefined,
      logged_in: req.session?.user_id !== undefined,
      user: req.session.user_id 
  });
});


// Search results page
router.get('/search', async (req, res) => {
  const random = await getRandomMovie()
  const result = await searchMovies("query", req.query.q)
  res.render('search', { movies: result, random });
});


module.exports = router;