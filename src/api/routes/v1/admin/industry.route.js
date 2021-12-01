const express = require('express');
const validate = require('express-validation');
const controller = require('../../../controllers/admin/industry.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../../middlewares/auth');
const {
  listIndustries,
  createIndustry,
} = require('../../../validations/admin/industry.validation');

const router = express.Router();
router
.route('/')
/**
   * @api {get} v1/industry List Industries
   * @apiDescription Get a list of Industries
   * @apiVersion 1.0.0
  * @apiName ListIndustries
   * @apiGroup Industry
   * @apiPermission admin/user/any
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Industries per page
   * @apiParam  {String}             [name]       Industries's name
   * @apiParam  {String=active,inactive}  [role]       Industries's status
   *
   * @apiSuccess {Object[]} Industries List of Industries.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(validate(listIndustries), controller.list)
  /**
   * @api {post} v1/industry Create Industry
   * @apiDescription Create a new Industry
   * @apiVersion 1.0.0
    * @apiName ListIndustries
   * @apiGroup Industry
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Industries access token
   *
   * @apiParam  {String}             Name     Industry's Name
   * @apiParam  {String=active,inactive}  [status]    Industries status
   *
   * @apiSuccess (Created 201) {String}  id         Industries id
   * @apiSuccess (Created 201) {String}  name       Industries Name
   * @apiSuccess (Created 201) {String}  status       Industries status
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(ADMIN), validate(createIndustry), controller.create);
  router
  .route('/:industryId')
  /**
   * @api {patch} v1/industry/:id Delete User
   * @apiDescription Delete a Industry
   * @apiVersion 1.0.0
   * @apiName DeleteIndustry
   * @apiGroup Industry
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
