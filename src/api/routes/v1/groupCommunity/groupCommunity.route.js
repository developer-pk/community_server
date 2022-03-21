const express = require('express');
const validate = require('express-validation');
const uuidv4 = require('uuid/v4');
const controller = require('../../../controllers/group_community/groupMember.controller');
const groupCommunityController = require('../../../controllers/group_community/groupCommunity.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../../middlewares/auth');
 const {
  listGroupCommunity,
  createGroupCommunity,
 } = require('../../../validations/groupcommunity/groupcommunity.validation');
 var path = require('path')
 const multer  = require('multer');
 
 const storage = multer.diskStorage({
   destination: function(req, file, cb) {
       cb(null, 'uploads/groupImages/');
   },
 
   filename: function(req, file, cb) {
 
    //  console.log("hjgjhgj  ",req.body);
       cb(null, uuidv4()+path.extname(file.originalname));
   }
 });
 
 var upload = multer({ storage: storage });


const router = express.Router();

router
  .route('/member-add')
  /**
   * @api {post} v1/group/member-add  
   * @apiDescription Get logged in user information
   * @apiVersion 1.0.0
   * @apiName groupMember
   * @apiGroup Group
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {String}  id         User's id
   * @apiSuccess {String}  groupId       Group's id
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .post(authorize(LOGGED_USER), controller.create);
  

  router
  .route('/members')
  /**
   * @api {get} v1/group/members
   * @apiDescription Get logged in user information
   * @apiVersion 1.0.0
   * @apiName groupMembers
   * @apiGroup Group
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {String}  id         groupMember's id
   * @apiSuccess {String}  groupId       Group's id
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .get(controller.list);
  
router
.route('/community-add')
/**
 * @api {post} v1/group/community-add
 * @apiDescription Get logged in user information
 * @apiVersion 1.0.0
 * @apiName groupCommunity
 * @apiGroup Group
 * @apiPermission user and admin
 *
 * @apiHeader {String} Authorization   User's access token
 * @apiParam  {String}             Name             groupCommunity's Name
 * @apiParam  {String}            description       groupCommunity Description
 * @apiParam  {String}            type              groupCommunity's Type
 * @apiParam  {String}            typeId            groupCommunity's TypeId
 * @apiParam  {String}            createdBy         groupCommunity's CreatedBy
 * @apiParam  {String}            createdType       groupCommunity's CreatedType 
 * @apiParam  {String=active,inactive}  [status]    groupCommunity Status
 *
 * @apiSuccess {String}  id               groupCommunity's id
 * @apiSuccess {String}  name             groupCommunity's Name
 * @apiSuccess {String}  description      groupCommunity's Description
 * @apiSuccess {String}  type             groupCommunity's Type
 * @apiSuccess {String}  typeId           groupCommunity's TypeId
 * @apiSuccess {String}  createdBy        groupCommunity's CreatedBy
 * @apiSuccess {String}  createdType      groupCommunity's CreatedType 
 * @apiSuccess {String}  status           groupCommunity's Status 
 * @apiSuccess {Date}    createdAt        Timestamp
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
.post(authorize(ADMIN),upload.single('image'),validate(createGroupCommunity), groupCommunityController.create);


router
.route('/community')

/**
   * @api {get} v1/group/community List groupCommunity
   * @apiDescription Get a list of groupCommunity
   * @apiVersion 1.0.0
  * @apiName ListgroupCommunity
   * @apiGroup GroupCommunity
   * @apiPermission admin/user/any
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  groupCommunity per page
   * @apiParam  {String}             [name]       groupCommunity's name
   * @apiParam  {String=active,inactive}  [role]  groupCommunity's status
   *
   * @apiSuccess {Object[]} groupCommunity List of groupCommunity.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(validate(listGroupCommunity), groupCommunityController.list);

  

  router
  .route('/single/:groupId')
  /**
   * @api {post} v1/group/member-add  
   * @apiDescription Get logged in user information
   * @apiVersion 1.0.0
   * @apiName groupMember
   * @apiGroup Group
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {String}  id         User's id
   * @apiSuccess {String}  groupId       Group's id
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .get(authorize(), groupCommunityController.getSingleCommunity);

  router
  .route('/community/delete/:groupCommunityId')
  /**
   * @api {patch} v1/group/community/delete/:groupCommunityId Delete User
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
   .delete(authorize(ADMIN), groupCommunityController.remove);

   
router
.route('/add-discussion')
/**
 * @api {post} v1/group/member-add  
 * @apiDescription Get logged in user information
 * @apiVersion 1.0.0
 * @apiName groupMember
 * @apiGroup Group
 * @apiPermission user
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiSuccess {String}  id         User's id
 * @apiSuccess {String}  groupId       Group's id
 * @apiSuccess {Date}    createdAt  Timestamp
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
.post(authorize(LOGGED_USER), groupCommunityController.createDiscussion);

router
.route('/discussion')
/**
 * @api {post} v1/group/member-add  
 * @apiDescription Get logged in user information
 * @apiVersion 1.0.0
 * @apiName groupMember
 * @apiGroup Group
 * @apiPermission user
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiSuccess {String}  id         User's id
 * @apiSuccess {String}  groupId       Group's id
 * @apiSuccess {Date}    createdAt  Timestamp
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
 */
.get(authorize(), groupCommunityController.getdiscussion);

  module.exports = router;
