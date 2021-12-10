const httpStatus = require('http-status');
const { omit } = require('lodash');
const User = require('../../models/user.model');
const GroupMember = require('../../models/groupCommunity/groupMembers.model');



/**
 * Create new groupMember
 * @public 
 */
 exports.create = async (req, res, next) => {
     
    try {
      const groupMember = new GroupMember(Object.assign({ userId: req.user._id },req.body));
      const savedgroupMember = await groupMember.save();
      res.status(httpStatus.CREATED);
      res.json(savedgroupMember);
    } catch (error) {
      next(GroupMember.checkDuplicateGroupMember(error));
    }
  };