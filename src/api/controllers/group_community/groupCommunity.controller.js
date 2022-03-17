const httpStatus = require('http-status');
const { omit } = require('lodash');
const User = require('../../models/user.model');
const GroupCommunity = require('../../models/groupCommunity/groupCommunity.model');
const GroupMember = require('../../models/groupCommunity/groupMembers.model');
const GroupDiscussion = require('../../models/groupCommunity/groupDiscussion.model');

/**
 * Create new groupCommunity
 * @public 
 */
 exports.create = async (req, res, next) => {
  console.log(req.body);
   console.log(req);   
  try {
    const groupCommunity = new GroupCommunity(Object.assign({ createdBy: req.user._id,image:req.file.filename },req.body));
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
    const groupCommunity = await GroupCommunity.find().populate({
         path    : 'groupMember',
         populate: [
             { path: 'userId' },
         ]
    });
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

exports.getSingleCommunity = async (req, res, next) => {
  try {
    const groupCommunity = await GroupCommunity.findOne(req.body.groupId).populate({
         path    : 'groupMember',
         populate: [
             { path: 'userId' },
         ]
    });
   const transformedgroupCommunity =  groupCommunity.transform();
    res.json(transformedgroupCommunity);
  } catch (error) {
    next(error);
  } 
};

exports.createDiscussion = async (req, res, next) => {
  try {
    const groupDiscussion = new GroupDiscussion(Object.assign({ userId: req.user._id },req.body));
    const savedgroupDiscussion = await groupDiscussion.save();
    res.status(httpStatus.CREATED);
    res.json(savedgroupDiscussion);
  } catch (error) {
    next(error);
  }
  
};