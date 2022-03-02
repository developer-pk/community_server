const express = require('express');
const validate = require('express-validation');
const controller = require('../../../controllers/admin/serviceOffering.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../../middlewares/auth');
const {
  listServiceOffering,
  createserviceOffering,
} = require('../../../validations/admin/serviceOffering.validation');

const router = express.Router();
router
.route('/')
/**
   * @api {get} v1/serviceOffering List ServiceOffering
   * @apiDescription Get a list of ServiceOffering
   * @apiVersion 1.0.0
  * @apiName ListServiceOffering
   * @apiGroup ServiceOffering
   * @apiPermission admin/user/any
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  ServiceOffering per page
   * @apiParam  {String}             [name]       ServiceOffering's name
   * @apiParam  {String=active,inactive}  [role]  ServiceOffering's status
   *
   * @apiSuccess {Object[]} ServiceOffering List of ServiceOffering.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(validate(listServiceOffering), controller.list)
  /**
   * @api {post} v1/serviceOffering Create ServiceOffering
   * @apiDescription Create a new ServiceOffering
   * @apiVersion 1.0.0
    * @apiName ListServiceOffering
   * @apiGroup ServiceOffering
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   ServiceOffering access token
   *
   * @apiParam  {String}             Name     ServiceOffering's Name
   * @apiParam  {String=active,inactive}  [status]    ServiceOffering status
   *
   * @apiSuccess (Created 201) {String}  id         ServiceOffering id
   * @apiSuccess (Created 201) {String}  name       ServiceOffering Name
   * @apiSuccess (Created 201) {String}  status     ServiceOffering status
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(ADMIN), validate(createserviceOffering), controller.create);

  router
  .route('/:serviceOfferingId')
  /**
   * @api {patch} v1/serviceOffering/:id Delete User
   * @apiDescription Delete a createserviceOffering
   * @apiVersion 1.0.0
   * @apiName DeletecreateserviceOffering
   * @apiGroup createserviceOffering
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
