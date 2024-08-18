// Import just the router express
const router = require('express').Router();

const apiRoutes = require('./api');
const pageRoutes = require('./pageRoutes');


router.use('/api', apiRoutes);
router.use('/', pageRoutes)



module.exports = router;
