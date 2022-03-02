const httpStatus = require('http-status');
const { omit } = require('lodash');
const Hobby = require('../../models/admin/hobby.model');

/**
 * Create new Hobby
 * @public
 */
 exports.create = async (req, res, next) => {
  
    try {
      const hobby = new Hobby(Object.assign({ createdBy: req.user._id },req.body));
      const savedHobby = await hobby.save();
      res.status(httpStatus.CREATED);
      res.json(savedHobby.transform());
    } catch (error) {
      next(Hobby.checkDuplicateHobby(error));
    }
  };

  /**
 * Get Hobby list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const hobby = await Hobby.list(req.query);
    const transformedhobby = hobby.map((hobby) => hobby.transform());
    res.json(transformedhobby);
  } catch (error) {
    next(error);
  } 
};
/**
 * Delete Hobby
 * @public
 */
 exports.remove = async (req, res, next) => {
  try {
   const hobby = await Hobby.findByIdAndDelete(req.params.hobbyId);
   res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  } 
};