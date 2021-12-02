const httpStatus = require('http-status');
const { omit } = require('lodash');
const ServiceOffering = require('../../models/admin/serviceNeed.model');

/**
 * Create new ServiceOffering
 * @public 
 */
 exports.create = async (req, res, next) => {
     
    try {
      const serviceOffering = new ServiceOffering(Object.assign({ createdBy: req.user._id },req.body));
      const savedserviceOffering = await serviceOffering.save();
      res.status(httpStatus.CREATED);
      res.json(savedserviceOffering.transform());
    } catch (error) {
      next(ServiceOffering.checkDuplicateHobby(error));
    }
  };

  /**
 * Get ServiceOffering list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const serviceOffering = await ServiceOffering.list(req.query);
    const transformedserviceOffering = serviceOffering.map((serviceOffering) => serviceOffering.transform());
    res.json(transformedserviceNeed);
  } catch (error) {
    next(error);
  } 
};
/**
 * Delete ServiceOffering
 * @public
 */
 exports.remove = async (req, res, next) => {
   try {
   const serviceOffering = await ServiceOffering.findByIdAndDelete(req.params.serviceOfferingId);
   res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    next(error);
  } 
};