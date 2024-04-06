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
      const breakingCapacity = await BreakingCapacityChar.findAll({
        include: [
          {
            model: СharacteristicТame,
            attributes: ['name']
          }
        ]
      });
      const degreeProtection = await DegreeProtectionChar.findAll({
        include: [
          {
            model: СharacteristicТame,
            attributes: ['name']
          }
        ]
      });
      const display = await DisplayChar.findAll({
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
      const ratedCurrent = await RatedCurrentChar.findAll({
        include: [
          {
            model: СharacteristicТame,
            attributes: ['name']
          }
        ]
      });
      const ratedVoltage = await RatedVoltageChar.findAll({
        include: [
          {
            model: СharacteristicТame,
            attributes: ['name']
          }
        ]
      });
      const shutdownCruve = await ShutdownCruveChar.findAll({
        include: [
          {
            model: СharacteristicТame,
            attributes: ['name']
          }
        ]
      });
      const typeOfMechanism = await TypeOfMechanismChar.findAll({
        include: [
          {
            model: СharacteristicТame,
            attributes: ['name']
          }
        ]
      });

      
      return res.json({
        brands,
        breakingCapacity,
        degreeProtection,
        display,
        numberPoles,
        ratedCurrent,
        ratedVoltage,
        shutdownCruve,
        typeOfMechanism
      });
    } catch (error) {
      return next(ApiError.internal(error.message))
    }
  }


}

module.exports = new FiltersController()