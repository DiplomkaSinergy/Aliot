
const uuid = require('uuid')
const path = require('path');
const {
  User,
  Product
} = require('../models/models')
const ApiError = require('../error/ApiError');

class AdminController {


  async getUsers(req, res, next) {

    const users = await User.findAndCountAll()

    if (!users) {
      return next(ApiError.badRequest('Пользователи не найдены'))
    }

    return res.json(users)
    
  }
  async getProducts(req, res, next) {

    const products = await Product.findAndCountAll()

    if (!products) {
      return next(ApiError.badRequest('Пользователи не найдены'))
    }

    return res.json(products)
    
  }
  async updateRole(req, res, next) {
    const {userId, role} = req.body

    console.log(userId, role);

    const user = await User.findOne({where: {id: userId}})

    if (!user) {
      return next(ApiError.badRequest('Пользователь не найден'))
    }
    user.role = role
    await user.save()

    return res.json(user)
    
  }
  

}

module.exports = new AdminController()