const router = require('express').Router();
const { User, Discussion } = require('../models');
const fetch = require('node-fetch');
const apiKey = 'c5d6f49c';
const withAuth = require('../utils/auth');

async function randomMovieGroup() {
    const keywords = ["new", "fire", "back", "dead", "dog", "cat", "dragon", "cops", "law", "detective", "report", "study", "love", "death", "lost", "big", "world", "star", "american", "war"]
    const searchQuery = keywords[Math.floor(Math.random() * keywords.length)];
    const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`);
    
    if (!response.ok) {
        throw new Error(`OMDb API responded with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.Search || data.Search.length === 0) {
        throw new Error('No movies found from OMDb API');
    }

    const sortedMovies = data.Search;

    const randomMovies = sortedMovies.slice(0, 15);
    return randomMovies
}

router.get('/', async (req, res) => {
    try {
        const randomMovies = await randomMovieGroup()
        const apiKey = 'c5d6f49c';
        const avatarId = 'tt0499549'
        const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${avatarId}`;
        const response = await fetch(url)
        const avatar = await response.json()
        const discussionsData = await Discussion.findAll({
            where: {movie_id: 'tt0499549'}
        })
        res.render('homepage', {randomMovies, avatar, discussions: discussionsData} );
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch recent movies', details: err.message });
    }
});

// router.get('/', async (req,res) => {
//     const apiKey = 'c5d6f49c';
//     const avatarId = 'tt0499549'
//     const url = `http://www.omdbapi.com/?apikey=${apiKey}&i=${avatarId}`;
//     const response = await fetch(url)
//     const avatar = await response.json()
//     console.log(avatar)
//     const discussionsData = await Discussion.findAll({
//         where: {movie_id: 'tt0499549'}
//     })
//     const discussions = discussionsData.map(discussion => discussion.get({plain:true}))
//     res.render("homepage", {avatar, discussions})

// });

router.get('/login', async (req,res) => {
    res.render('login')
});

router.get('/profile', async (req, res) => {
    try {

        // const userId = req.session.user_id;
        const userId = '2';

        const user = await User.findByPk(userId);
        const userData = user.get({ plain: true })

        if (!user) {
            return res.status(404).send('User not found');
        }

        const discussions = await Discussion.findAll({
            where: { user_id: userId }
        });

        const discussionsData = discussions.map(discussion => discussion.get({ plain: true }));

        res.render('profile', {
            user: userData,
            discussions: discussionsData
        });
    } catch (error) {
        console.error('Error fetching user and discussions:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/discussion', (req, res) => {
    //should add a bunch of discussions
    res.render('discussion');
});

router.get('/me', async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.redirect('/login');
        }

        // Render the 'profile' view using the 'movie' layout and pass user data
        res.render('profile')
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/search', async (req, res) => {
    const query = req.query.q;
    const apiKey = 'c5d6f49c';
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;

    try {
        const randomMovies = await randomMovieGroup()
        const response = await fetch(url);
        const data = await response.json();
        res.render('search', { movies: data.Search, randomMovies });
    } catch(err){
        console.log(err)
    }
});


// Route to handle user registration
router.post('/register', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.displayName,
            email: req.body.email,
            password: req.body.password, 
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

router.post('/login', async (req, res) => {
    try {

        const user = await User.findOne({ where: { email: req.body.email } });
        if (user && await user.checkPassword(req.body.password)) { 
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
});

router.get('/movie/:id', withAuth, async (req, res) => {
    try {
        const movieId = req.params.id; // Get movie_id from route parameter

        // Fetch discussions for the specific movie
        const discussions = await Discussion.findAll({
            where: {
                movie_id: movieId
            }
        });

        // Render the 'discussions' view with the fetched discussions
        res.render('discussions', {
            discussions
        });
    } catch (error) {
        console.error('Error fetching discussions:', error);
        res.status(500).send('Internal Server Error');
    }
});




module.exports = router;




