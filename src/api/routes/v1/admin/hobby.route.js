const express = require('express');
const validate = require('express-validation');
const controller = require('../../../controllers/admin/hobby.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../../middlewares/auth');
const {
  listHobbies,
  createhobbies,
} = require('../../../validations/admin/hobby.validation');

const router = express.Router();
router
.route('/')
/**
   * @api {get} v1/hobby List Hobbies
   * @apiDescription Get a list of Hobbies
   * @apiVersion 1.0.0
  * @apiName ListHobbies
   * @apiGroup Hobby
   * @apiPermission admin/user/any
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Hobbies per page
   * @apiParam  {String}             [name]       Hobbies's name
   * @apiParam  {String=active,inactive}  [role]       Hobbies's status
   *
   * @apiSuccess {Object[]} Hobbies List of Hobbies.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(validate(listHobbies), controller.list)
  /**
   * @api {post} v1/hobby Create Hobby
   * @apiDescription Create a new Hobby
   * @apiVersion 1.0.0
    * @apiName ListHobbies
   * @apiGroup Hobby
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Hobbies access token
   *
   * @apiParam  {String}             Name     Hobbies's Name
   * @apiParam  {String=active,inactive}  [status]    Hobbies status
   *
   * @apiSuccess (Created 201) {String}  id         Hobbies id
   * @apiSuccess (Created 201) {String}  name       Hobbies Name
   * @apiSuccess (Created 201) {String}  status     Hobbies status
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(ADMIN), validate(createhobbies), controller.create);

  router
  .route('/:hobbyId')
  /**
   * @api {patch} v1/hobby/:id Delete User
   * @apiDescription Delete a Hobby
   * @apiVersion 1.0.0
   * @apiName DeleteHobby
   * @apiGroup Hobby
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
