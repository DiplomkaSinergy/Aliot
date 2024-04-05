const uuid = require('uuid')
const path = require('path');
const {
  BrandsChar,
  BreakingCapacityChar,
  DegreeProtectionChar,
  DisplayChar,
  NumberPolesChar,
  RatedCurrentChar,
  RatedVoltageChar,
  ShutdownCruveChar,
  TypeOfMechanismChar,
  СharacteristicТame
} = require('../models/models')
const ApiError = require('../error/ApiError');

class FiltersController {

  async getAllFilters(req, res, next) {
    try {
      const brands = await BrandsChar.findAll({
        include: [
          {
            model: СharacteristicТame,
            attributes: ['name']
          }
        ]
      });
      const breakingCapacities = await BreakingCapacityChar.findAll({
        include: [
          {
            model: СharacteristicТame,
            attributes: ['name']
          }
        ]
      });
      const degreesOfProtection = await DegreeProtectionChar.findAll({
        include: [
          {
            model: СharacteristicТame,
            attributes: ['name']
          }
        ]
      });
      const displays = await DisplayChar.findAll({
        include: [
          {
            model: СharacteristicТame,
            attributes: ['name']
          }
        ]
      });
      const numberPoles = await NumberPolesChar.findAll({
        include: [
          {
            model: СharacteristicТame,
            attributes: ['name']
          }
        ]
      });
      const ratedCurrents = await RatedCurrentChar.findAll({
        include: [
          {
            model: СharacteristicТame,
            attributes: ['name']
          }
        ]
      });
      const ratedVoltages = await RatedVoltageChar.findAll({
        include: [
          {
            model: СharacteristicТame,
            attributes: ['name']
          }
        ]
      });
      const shutdownCurves = await ShutdownCruveChar.findAll({
        include: [
          {
            model: СharacteristicТame,
            attributes: ['name']
          }
        ]
      });
      const typesOfMechanism = await TypeOfMechanismChar.findAll({
        include: [
          {
            model: СharacteristicТame,
            attributes: ['name']
          }
        ]
      });

      
      return res.json({
        brands,
        breakingCapacities,
        degreesOfProtection,
        displays,
        numberPoles,
        ratedCurrents,
        ratedVoltages,
        shutdownCurves,
        typesOfMechanism
      });
    } catch (error) {
      return next(ApiError.internal(error.message))
    }
  }


}

module.exports = new FiltersController()