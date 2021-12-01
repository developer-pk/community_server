const httpStatus = require('http-status');
const { omit } = require('lodash');
const Industry = require('../../models/admin/industry.model');

/**
 * Create new Industry new mybranch
 * @public
 */
 exports.create = async (req, res, next) => {
    try {
      const industry = new Industry(Object.assign({ createdBy: req.user._id },req.body));
      const savedIndustry = await industry.save();
      res.status(httpStatus.CREATED);
      res.json(savedIndustry.transform());
    } catch (error) {
      next(Industry.checkDuplicateIndustry(error));
    }
  };

  /**
 * Get Industry list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const industry = await Industry.list(req.query);
    const transformedindustry = industry.map((industry) => industry.transform());
    res.json(transformedindustry);
  } catch (error) {
    next(error);
  }
};
/**
 * Delete Industry
 * @public
 */
 exports.remove = async (req, res, next) => {
   console.log(req.params.industryId);
   try {
   const industry = await Industry.findByIdAndDelete(req.params.industryId);
   res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  } 
};