const express = require('express');
const validate = require('express-validation');
const controller = require('../../../controllers/admin/serviceNeed.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../../middlewares/auth');
const {
  listServiceNeed,
  createserviceNeed,
} = require('../../../validations/admin/serviceNeed.validation');

const router = express.Router();
router
.route('/')
/**
   * @api {get} v1/serviceNeed List ServiceNeed
   * @apiDescription Get a list of ServiceNeed
   * @apiVersion 1.0.0
  * @apiName ListServiceNeed
   * @apiGroup ServiceNeed
   * @apiPermission admin/user/any
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  ServiceNeed per page
   * @apiParam  {String}             [name]       ServiceNeed's name
   * @apiParam  {String=active,inactive}  [role]  ServiceNeed's status
   *
   * @apiSuccess {Object[]} ServiceNeed List of ServiceNeed.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(validate(listServiceNeed), controller.list)
  /**
   * @api {post} v1/serviceNeed Create ServiceNeed
   * @apiDescription Create a new ServiceNeed
   * @apiVersion 1.0.0
    * @apiName ListServiceNeed
   * @apiGroup ServiceNeed
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   ServiceNeed access token
   *
   * @apiParam  {String}             Name     ServiceNeed's Name
   * @apiParam  {String=active,inactive}  [status]    ServiceNeed status
   *
   * @apiSuccess (Created 201) {String}  id         ServiceNeed id
   * @apiSuccess (Created 201) {String}  name       ServiceNeed Name
   * @apiSuccess (Created 201) {String}  status     ServiceNeed status
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(ADMIN), validate(createserviceNeed), controller.create);

  router
  .route('/:serviceNeedId')
  /**
   * @api {patch} v1/serviceNeed/:id Delete User
   * @apiDescription Delete a createserviceNeed
   * @apiVersion 1.0.0
   * @apiName DeletecreateserviceNeed
   * @apiGroup createserviceNeed
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
