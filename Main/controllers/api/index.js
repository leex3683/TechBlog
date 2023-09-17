const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const Blogpost = require('./blogpostRoutes');

router.use('/users', userRoutes);
// router.use('/blogposts', Blogpost);

module.exports = router;
