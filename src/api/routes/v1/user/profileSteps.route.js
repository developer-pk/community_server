const express = require('express');
const validate = require('express-validation');
const controller = require('../../../controllers/user/profileSteps.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../../middlewares/auth');
 const {
  createUserSetp3,
  createUserSetp4,
  createUserSetp5,
  createUserSetp6,
 } = require('../../../validations/user/profileSteps.validation');

const router = express.Router();

router
  .route('/step-2')
  /**
   * @api {post} v1/profile/step-2 User Profile
   * @apiDescription Get logged in user profile information
   * @apiVersion 1.0.0
   * @apiName UserProfile
   * @apiGroup User
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {String}  id         User's id
   * @apiSuccess {String}  name       User's name
   * @apiSuccess {String}  email      User's email
   * @apiSuccess {String}  role       User's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .post(authorize(LOGGED_USER), controller.step2);
  
  router.route('/step-3')
  /**
   * @api {post} v1/profile/step-3 User Profile
   * @apiDescription Get logged in user profile information
   * @apiVersion 1.0.0
   * @apiName UserProfile
   * @apiGroup User
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {String}  id               User's id 
   * @apiSuccess {String}  jobtitleId       UserProfile's jobtitleId
   * @apiSuccess {String}  industryId       UserProfile's industryId
   * @apiSuccess {String}  businessOwner    UserProfile's businessOwner
   * @apiSuccess {String}  linkedIn         UserProfile's linkedIn
   * @apiSuccess {String}  companyId        UserProfile's companyId
   * @apiSuccess {String}  steps            User's steps
   * @apiSuccess {Date}    createdAt        Timestamp
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .post(authorize(LOGGED_USER),validate(createUserSetp3), controller.step3);

  
  router.route('/step-4')
  /**
   * @api {post} v1/profile/step-4 User Profile
   * @apiDescription Get logged in user profile information
   * @apiVersion 1.0.0
   * @apiName UserProfile
   * @apiGroup User
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {String}  id               User's id 
   * @apiSuccess {String}  hobbiesID          UserProfile's hobbiesID
   * @apiSuccess {String}  serviceNeedID      UserProfile's serviceNeedID
   * @apiSuccess {String}  serviceOfferingID  UserProfile's serviceOfferingID
   * @apiSuccess {String}  steps            User's steps
   * @apiSuccess {Date}    createdAt        Timestamp
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .post(authorize(LOGGED_USER),validate(createUserSetp4), controller.step3);

    
  router.route('/step-5')
  /**
   * @api {post} v1/profile/step-5 User Profile
   * @apiDescription Get logged in user profile information
   * @apiVersion 1.0.0
   * @apiName UserProfile
   * @apiGroup User
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {String}  id               User's id 
   * @apiSuccess {String}  collegeID        UserProfile's college
   * @apiSuccess {String}  hiring           UserProfile's hiring
   * @apiSuccess {String}  newCareer        UserProfile's newCareer
   * @apiSuccess {String}  companySize      UserProfile's companySize
   * @apiSuccess {String}  companyRevenue   UserProfile's companyRevenue
   * @apiSuccess {String}  steps            User's steps
   * @apiSuccess {Date}    createdAt        Timestamp
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .post(authorize(LOGGED_USER),validate(createUserSetp5), controller.step5);

  router.route('/step-6')
  /**
   * @api {post} v1/profile/step-6 User Profile
   * @apiDescription Get logged in user profile information
   * @apiVersion 1.0.0
   * @apiName UserProfile
   * @apiGroup User
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {String}  id               User's id 
   * @apiSuccess {String}  meetJobTitleId   UserProfile's meetJobTitleId
   * @apiSuccess {String}  meetIndustryId   UserProfile's meetIndustryId
   * @apiSuccess {String}  meetCompanyId    UserProfile's meetCompanyId
   * @apiSuccess {String}  companySize      UserProfile's meetcompanySize
   * @apiSuccess {String}  companyRevenue   UserProfile's meetcompanyRevenue
   * @apiSuccess {String}  meetLocationId   UserProfile's meetLocationId
   * @apiSuccess {String}  steps            User's steps
   * @apiSuccess {Date}    createdAt        Timestamp
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .post(authorize(LOGGED_USER),validate(createUserSetp6), controller.step6);

  module.exports = router;