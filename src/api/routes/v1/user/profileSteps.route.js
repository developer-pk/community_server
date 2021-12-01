const express = require('express');
const validate = require('express-validation');
const controller = require('../../../controllers/user/profileSteps.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
// const {
//   listUsers,
//   createUser,
//   replaceUser,
//   updateUser,
// } = require('../../../validations/user/profileSteps.validation');

const router = express.Router();

router
  .route('/step2')
  /**
   * @api {get} v1/users/profile User Profile
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
  .get(authorize(), controller.step2);