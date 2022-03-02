const httpStatus = require('http-status');
const { omit } = require('lodash');
const Company = require('../../models/admin/company.model');

/**
 * Create new Company
 * @public 
 */
 exports.create = async (req, res, next) => {
     
    try {
      const company = new Company(Object.assign({ createdBy: req.user._id },req.body));
      const savedcompany = await company.save();
      res.status(httpStatus.CREATED);
      res.json(savedcompany.transform());
    } catch (error) {
      next(Company.checkDuplicateHobby(error));
    }
  };

  /**
 * Get Company list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const company = await Company.list(req.query);
    const transformedcompany = company.map((company) => company.transform());
    res.json(transformedcompany);
  } catch (error) {
    next(error);
  } 
};
/**
 * Delete company
 * @public
 */
 exports.remove = async (req, res, next) => {
   try {
   const company = await Company.findByIdAndDelete(req.params.companyId);
   res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  } 
};