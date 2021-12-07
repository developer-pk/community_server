const express = require('express');
const validate = require('express-validation');
const controller = require('../../../controllers/admin/company.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../../middlewares/auth');
const {
  listCompany,
  createcompany,
} = require('../../../validations/admin/company.validation');

const router = express.Router();
router
.route('/')
/**
   * @api {get} v1/company List Company
   * @apiDescription Get a list of Company
   * @apiVersion 1.0.0
  * @apiName ListCompany
   * @apiGroup Company
   * @apiPermission admin/user/any
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Company per page
   * @apiParam  {String}             [name]       Company's name
   * @apiParam  {String=active,inactive}  [role]  Company's status
   *
   * @apiSuccess {Object[]} Company List of Company.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(validate(listCompany), controller.list)
  /**
   * @api {post} v1/company Create Company
   * @apiDescription Create a new Company
   * @apiVersion 1.0.0
    * @apiName ListCompany
   * @apiGroup Company
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Company access token
   *
   * @apiParam  {String}             Name     Company's Name
   * @apiParam  {String=active,inactive}  [status]    Company status
   *
   * @apiSuccess (Created 201) {String}  id         Company id
   * @apiSuccess (Created 201) {String}  name       Company Name
   * @apiSuccess (Created 201) {String}  status     Company status
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(ADMIN), validate(createcompany), controller.create);

  router
  .route('/:companyId')
  /**
   * @api {patch} v1/company/:id Delete User
   * @apiDescription Delete a createcompany
   * @apiVersion 1.0.0
   * @apiName Deletecreatecompany
   * @apiGroup createcompany
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
