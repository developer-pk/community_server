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

    console.log("hiii000000i")
    const groupCommunity = await GroupCommunity.findOne(req.body.groupId).populate({
         path    : 'groupMember',
         populate: [
             { path: 'userId' },
         ]
       
    }).populate({ 
      path: 'groupDiscussions',
      options: {sort: {createdAt: -1} },
      populate: [
        { path: 'userId' },
    ]
 }).populate({ 
    path: 'discussionsCount'
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
    const savedgroupDiscussion = await groupDiscussion.save().then((discussion) => {
      GroupCommunity.findByIdAndUpdate(
        req.body.groupId,
        { $push: { discussions: discussion._id } },
        { new: true, useFindAndModify: false },
        (err, post) => {
          if (err) {
            return res.status(500).json({ success: false, msg: err.message });
          }
          res.status(httpStatus.CREATED).json({ success: true, discussion });
        }
      );
    });
    // res.status(httpStatus.CREATED);
    // res.json(savedgroupDiscussion);
  } catch (error) {
    next(error);
  }
  
};


exports.getdiscussion = async (req, res, next) => {
  console.log("hiiii")
  try {
    console.log(req.params.groupId)
    const groupCommunity = await GroupDiscussion.find({groupId:req.params.groupId}).populate({
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