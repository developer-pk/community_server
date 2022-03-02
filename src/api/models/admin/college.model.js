const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const moment = require('moment-timezone');
const APIError = require('../../errors/api-error');

const statuses = ['active', 'inactive'];

 const collegeSchema = new mongoose.Schema({
    name: String,
    slug: {
      type: String,
      unique: true
    },
    status: {
        type: String,
        enum: statuses,
        default: 'active',
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    
  }, {
    timestamps: true,
  });
  
  /**
   * @typedef collegeSchema
   */
  
   
   collegeSchema.pre('save', async function save(next) {
    try {
      this.slug = slugify(this.name);
      return next();
    } catch (error) {
      return next(error);
    }
  });
/**
 * Methods
 */
 collegeSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'name', 'status','createdAt'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

/**
 * Statics
 */
 collegeSchema.statics = {
   /**
   * Return new validation error
   * if error is a mongoose duplicate key error
   *
   * @param {Error} error
   * @returns {Error|APIError}
   */
    checkDuplicateHobby(error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return new APIError({
        message: 'Validation Error',
        errors: [{
          field: 'name',
          location: 'body',
          messages: ['"College" already exists'],
        }],
        status: httpStatus.CONFLICT,
        isPublic: true,
        stack: error.stack,
      });
    }
    return error;
  },
  /**
   * List users in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
   list({
    page = 1, perPage = 30, name, slug, status,
  }) {
    const options = omitBy({ name, slug, status }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
 };

  function slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

  const college = mongoose.model('College', collegeSchema);
  
  module.exports = college;
  