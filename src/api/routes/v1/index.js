const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const industryRoutes = require('./admin/industry.route');
const jobTitleRoutes = require('./admin/jobTitle.route');
const countryRoutes = require('./common/country.route');
const hobbyRoutes = require('./admin/hobby.route');
const profileRoutes = require('./user/profileSteps.route');
const serviceNeedRoutes = require('./admin/serviceNeed.route');
const serviceOfferingRoutes = require('./admin/serviceOffering.route');
const companyRoutes = require('./admin/company.route');
const collegeRoutes = require('./admin/college.route');
const groupRoutes = require('./groupCommunity/groupCommunity.route');
//const groupDicussionRoutes = require('./groupCommunity/groupDiscussion.route');

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
router.use('/profile', profileRoutes);
router.use('/serviceNeed', serviceNeedRoutes);
router.use('/serviceOffering', serviceOfferingRoutes);
router.use('/company', companyRoutes);
router.use('/college', collegeRoutes);
router.use('/group',groupRoutes);
//router.use('/',groupDicussionRoutes);


module.exports = router;
