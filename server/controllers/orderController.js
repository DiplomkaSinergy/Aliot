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

  
      return res.json(order)
    } catch (error) {
      return next(ApiError.badRequest('Ошибка в запросе создания!'))
    }
  }


  async getAllOrdersById(req, res, next) {
    let { userId } = req.query
    
    console.log(userId);
    const orders = await Order.findAll({
      where: {userId: userId},
      include: {
        model: OrderProduct,
        include: Product
      }
    })

    if (!orders) {
      return res.status(404).json({ error: 'Заказ не найден' });
    }
    
    res.json(orders)

  }
  async getOneOrdersById(req, res, next) {
    let { orderId } = req.query
    
    console.log(orderId);
    const order = await Order.findOne({
      where: {id: orderId},
      include: {
        model: OrderProduct,
        include: Product
      }
    })

    console.log(order);
    if (!order) {
      return res.status(404).json({ error: 'Заказ не найден' });
    }
    
    res.json(order)

  }

}

module.exports = new OrderController()