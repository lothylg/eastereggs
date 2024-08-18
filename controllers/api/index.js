const router = require('express').Router();
// Import the routes. This is how we make our routes modular.
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const discussionRoutes = require('./discussionRoutes');


// When a request is made to the /users or /projects path, it will be directed to the index.js in the /users or /projects folder.
router.use('/comments', commentRoutes);
router.use('/discussions', discussionRoutes);
router.use('/users', userRoutes);




module.exports = router;
