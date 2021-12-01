const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const industryRoutes = require('./admin/industry.route');
const jobTitleRoutes = require('./admin/jobTitle.route');
const countryRoutes = require('./common/country.route');
const hobbyRoutes = require('./admin/hobby.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/industry', industryRoutes);
router.use('/jobtitle', jobTitleRoutes);
router.use('/country', countryRoutes);
router.use('/hobby', hobbyRoutes);


module.exports = router;
