const express = require('express');
const validate = require('express-validation');
const controller = require('../../../controllers/admin/college.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../../middlewares/auth');
const {
  listCollege,
  createcollege,
} = require('../../../validations/admin/college.validation');

const router = express.Router();
router
.route('/')
/**
   * @api {get} v1/college List College
   * @apiDescription Get a list of College
   * @apiVersion 1.0.0
  * @apiName ListCollege
   * @apiGroup College
   * @apiPermission admin/user/any
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  College per page
   * @apiParam  {String}             [name]       College's name
   * @apiParam  {String=active,inactive}  [role]  College's status
   *
   * @apiSuccess {Object[]} College List of College.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(validate(listCollege), controller.list)
  /**
   * @api {post} v1/college Create College
   * @apiDescription Create a new College
   * @apiVersion 1.0.0
    * @apiName ListCollege
   * @apiGroup College
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   College access token
   *
   * @apiParam  {String}             Name     College's Name
   * @apiParam  {String=active,inactive}  [status]    College status
   *
   * @apiSuccess (Created 201) {String}  id         College id
   * @apiSuccess (Created 201) {String}  name       College Name
   * @apiSuccess (Created 201) {String}  status     College status
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(ADMIN), validate(createcollege), controller.create);

  router
  .route('/:collegeId')
  /**
   * @api {patch} v1/College/:id Delete User
   * @apiDescription Delete a createcollege
   * @apiVersion 1.0.0
   * @apiName Deletecreatecollege
   * @apiGroup createcollege
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Admin's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      User does not exist
   */
   .delete(authorize(ADMIN), controller.remove);

module.exports = router;
