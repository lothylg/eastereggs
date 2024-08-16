const router = require('express').Router();
const { User, Discussion } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req,res) => {
    res.render("homepage")
    //every page we want has handlebars, it must be xyz.handlebars then 
    //res.render("xyz")
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




