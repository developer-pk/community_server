const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const moment = require('moment-timezone');
const APIError = require('../../errors/api-error');

const statuses = ['active', 'inactive'];

 const groupDiscussionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GroupCommunity',
        required: true,
        }, 
        discussion: {
          type: String,
          default: null,
      },
    status: {
        type: String,
        enum: statuses,
        default: 'active',
        }
    
  }, {
    timestamps: true,
  });
  groupDiscussionSchema.virtual('postedBy', {
    ref: 'User',
    localField: '_id',
    foreignField: 'userId', 
});
groupDiscussionSchema.set('toJSON', { virtuals: true });
groupDiscussionSchema.set('toObject', { virtuals: true });  
  groupDiscussionSchema.method({
    transform() {
      const transformed = {};
      const fields = ['id', 'userId','groupId','discussion','status','postedBy','groupDiscussions','discussionsCount'];
  
      fields.forEach((field) => {
        transformed[field] = this[field];
      });
  
      return transformed;
    },
  });
  /**
 * Statics
 */
//    groupDiscussionSchema.statics = {
//     /**
//     * Return new validation error
//     * if error is a mongoose duplicate key error
//     *
//     * @param {Error} error
//     * @returns {Error|APIError}
//     */
//      checkDuplicateGroupMember(error) {
//      if (error.name === 'MongoError' && error.code === 11000) {
//        return new APIError({
//          message: 'Validation Error',
//          errors: [{
//            field: 'name',
//            location: 'body',
//            messages: ['"GroupMember" already exists'],
//          }],
//          status: httpStatus.CONFLICT,
//          isPublic: true,
//          stack: error.stack,
//        });
//      }
//      return error;
//    },

// }
  
  const groupDiscussion = mongoose.model('GroupDiscussion', groupDiscussionSchema);
  
  module.exports = groupDiscussion;
  