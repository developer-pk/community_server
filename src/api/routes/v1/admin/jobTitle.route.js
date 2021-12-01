const express = require('express');
const validate = require('express-validation');
const controller = require('../../../controllers/admin/jobTitle.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../../middlewares/auth');
const {
  listJobtitle,
  createJobtitle,
} = require('../../../validations/admin/jobTitle.validation');

const router = express.Router();
router
.route('/')
/**
   * @api {get} v1/jobtitle List Jobtitle
   * @apiDescription Get a list of Jobtitle
   * @apiVersion 1.0.0
  * @apiName ListJobtitle
   * @apiGroup Jobtitle
   * @apiPermission admin/user/any
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Jobtitle per page
   * @apiParam  {String}             [name]       Jobtitle's name
   * @apiParam  {String=active,inactive}  [role]       Jobtitle's status
   *
   * @apiSuccess {Object[]} Jobtitle List of Jobtitle.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(validate(listJobtitle), controller.list)
  /**
   * @api {post} v1/jobtitle Create jobtitle
   * @apiDescription Create a new jobtitle
   * @apiVersion 1.0.0
    * @apiName CreateJobtitle
   * @apiGroup Jobtitle
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Jobtitle access token
   *
   * @apiParam  {String}             Name     jobtitle's Name
   * @apiParam  {String=active,inactive}  [status]    Jobtitle status
   *
   * @apiSuccess (Created 201) {String}  id         Jobtitle id
   * @apiSuccess (Created 201) {String}  name       Jobtitle Name
   * @apiSuccess (Created 201) {String}  status       Jobtitle status
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(ADMIN), validate(createJobtitle), controller.create);
  router
  .route('/:jobtitleId')
  /**
   * @api {patch} v1/jobtitle/:id Delete jobtitle
   * @apiDescription Delete a jobtitle
   * @apiVersion 1.0.0
   * @apiName Deletejobtitle
   * @apiGroup Jobtitle
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
