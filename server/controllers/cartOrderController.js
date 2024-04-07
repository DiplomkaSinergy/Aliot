const uuid = require('uuid')
const path = require('path');
const {
  BasketProduct
} = require('../models/models')
const ApiError = require('../error/ApiError');

class CartOrderController {


  async getAllCartOrdersItems(basketId) {
    const orderItems = await BasketProduct.findAll({where: {basketId: basketId}})

    if (!orderItems) {
      return next(ApiError.badRequest('Товары не найдены'))
    }

    return res.json(orderItems)
    
  }

  addCartOrdersItem() {
    
  }
  deleteCartOrdersItem() {

  }

  clearCartOrdersItems() {

  }

}

module.exports = new CartOrderController()