const uuid = require('uuid')
const path = require('path');
const {
  BasketProduct,
  Product,
  Order,
  OrderProduct
} = require('../models/models')
const ApiError = require('../error/ApiError');



class OrderController {

  async createOrder(req, res, next) {
    try {
      let { userId, basketId, price , address } = req.body
      console.log(userId, basketId);
      const products = await BasketProduct.findAll({where: {basketId: basketId},
        include: [
          {
            model: Product, 
          }
        ]
      })
      
      if (!products) {
        return next(ApiError.badRequest('Товары не найдены'))
      }

      const order = await Order.create({
        userId: userId,
        price,
        address
      })
            

      products.forEach(item => 
        OrderProduct.create({
          productId: item.product.id,
          orderId: order.id
        })
      )

  
      return res.json(orderProducts)
    } catch (error) {
      return next(ApiError.badRequest('Jib,rf!'))
    }
  }


  async getAllOrders(req, res, next) {
    let { userId } = req.query
    console.log(userId);
    const orders = await Order.findAll({where: {userId: userId}})
    

    return res.json(orederWithProducts)
  }

}

module.exports = new OrderController()