const uuid = require('uuid')
const path = require('path');
const {ShutdownCurveAvto} = require('../models/models')
const ApiError = require('../error/ApiError');

class FiltersController {

  async getShutdownCurveAvto() {
    let arr = []
    const fil = await ShutdownCurveAvto.findAll()
    fil.forEach(item => {
      arr.push(item.value)
    })
    console.log(arr);
  }
}

module.exports = new FiltersController()