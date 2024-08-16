const router = require('express').Router();
const { User, Discussion } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req,res) => {
    res.render("homepage")
    //every page we want has handlebars, it must be xyz.handlebars then 
    //res.render("xyz")
})

router.get('/login', async (req,res) => {
    res.render('login')
})

router.get('/profile', async (req,res) => {
    res.render('profile')
})

router.get('/discussion', (req, res) => {

    res.render('discussion');
});

router.get('/search', async (req, res) => {
    const query = req.query.q;
    const apiKey = 'c5d6f49c';
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.render('search', { movies: data.Search });
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
            password: req.body.password, // This will be hashed in the model's hook
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

router.post('/login', async (req, res) => {
    try {
        // Implement login logic, such as checking email and password
        // For example, use the User model to find a user and verify the password
        const user = await User.findOne({ where: { email: req.body.email } });
        if (user && await user.checkPassword(req.body.password)) { // Assume checkPassword is a method on User model
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




