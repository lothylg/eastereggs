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
        res.render('homepage', {randomMovies} );
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch recent movies', details: err.message });
    }
});

router.get('/', async (req,res) => {
    res.render("homepage")
});

router.get('/login', async (req,res) => {
    res.render('login')
});

router.get('/me', async (req,res) => {
    res.render('profile')
});

router.get('/discussion', (req, res) => {
    res.render('discussion');
});
router.get('/me', async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.redirect('/login');
        }

        // Render the 'profile' view using the 'movie' layout and pass user data
        res.render('profile', {
            layout: 'movie',
            profile: {
                username: user.username,
                email: user.email         
            }
        });
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




module.exports = router;




