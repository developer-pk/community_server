const httpStatus = require('http-status');
const { omit } = require('lodash');
const User = require('../../models/user.model');
const GroupCommunity = require('../../models/groupCommunity/groupCommunity.model');

/**
 * Create new groupMember
 * @public 
 */
 exports.create = async (req, res, next) => {
  console.log(req.body);
   console.log(req);   
  try {
    const groupCommunity = new GroupCommunity(Object.assign({ createdBy: req.user._id },req.body));
    const savedgroupCommunity = await groupCommunity.save();
    res.status(httpStatus.CREATED);
    res.json(savedgroupCommunity);
  } catch (error) {
    next(GroupCommunity.checkDuplicategroupCommunity(error));
  }
};

 /**
 * Get GroupCommunity list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const groupCommunity = await GroupCommunity.list(req.query);
    const transformedgroupCommunity = groupCommunity.map((groupCommunity) => groupCommunity.transform());
    res.json(transformedgroupCommunity);
  } catch (error) {
    next(error);
  } 
};

/**
 * Delete colgroupCommunitylege
 * @public
 */
 exports.remove = async (req, res, next) => {
   try {
   const groupCommunity = await GroupCommunity.findByIdAndDelete(req.params.groupCommunityId);
   res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  } 
};