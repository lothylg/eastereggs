const router = require('express').Router();
// Import the Project model from the models folder
const { User } = require('../../models');


router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });
module.exports = router;