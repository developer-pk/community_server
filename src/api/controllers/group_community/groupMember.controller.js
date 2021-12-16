const httpStatus = require('http-status');
const { omit } = require('lodash');
const User = require('../../models/user.model');
const GroupMember = require('../../models/groupCommunity/groupMembers.model');
const GroupCommunity = require('../../models/groupCommunity/groupCommunity.model');



/**
 * Create new groupMember
 * @public 
 */
 exports.create = async (req, res, next) => {
    try {
      const groupMember = new GroupMember(Object.assign({ userId: req.user._id },req.body));
      const savedgroupMember = await groupMember.save();
      if(savedgroupMember.status == 'active'){
        const groupCommunity = await GroupCommunity.findOneAndUpdate(
            { _id: savedgroupMember.groupId },
            { $inc: { memberCount: 1 } }, 
            {new: true, upsert: true },
            function(err, response) {
                if (err) {
                //callback(err);
                res.json(err);
                } 
              }
      );
      }
      res.status(httpStatus.CREATED);
      res.json(savedgroupMember);
    } catch (error) {
      next(GroupMember.checkDuplicateGroupMember(error));
    }
  };



   /**
 * Get GroupMember list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const data = await GroupMember.find().populate([
      { path    : 'groupId' },
      { path: 'userId' }
    ]
      );
    console.log(data);
    res.json(data);
  } catch (error) {
    next(error);
  } 
};