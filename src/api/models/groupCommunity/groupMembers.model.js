const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const moment = require('moment-timezone');
const APIError = require('../../errors/api-error');

const statuses = ['active', 'inactive'];

 const groupMemberSchema = new mongoose.Schema({
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
    status: {
        type: String,
        enum: statuses,
        default: 'active',
        }
    
  }, {
    timestamps: true,
  });


  /**
 * Statics
 */
   groupMemberSchema.statics = {
    /**
    * Return new validation error
    * if error is a mongoose duplicate key error
    *
    * @param {Error} error
    * @returns {Error|APIError}
    */
     checkDuplicateGroupMember(error) {
     if (error.name === 'MongoError' && error.code === 11000) {
       return new APIError({
         message: 'Validation Error',
         errors: [{
           field: 'name',
           location: 'body',
           messages: ['"GroupMember" already exists'],
         }],
         status: httpStatus.CONFLICT,
         isPublic: true,
         stack: error.stack,
       });
     }
     return error;
   },

}
  
  const groupMember = mongoose.model('GroupMember', groupMemberSchema);
  
  module.exports = groupMember;
  