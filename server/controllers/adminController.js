
const uuid = require('uuid')
const path = require('path');
const {
  User,
  Product,
  ProductInfo
} = require('../models/models')
const ApiError = require('../error/ApiError');

class AdminController {


  async getUsers(req, res, next) {
    let {page, limit} = req.query
    
    page = page || 1
    limit = limit || 5
    let offset = page * limit - limit

    const users = await User.findAndCountAll({limit, offset})

    if (!users) {
      return next(ApiError.badRequest('Пользователи не найдены'))
    }

    return res.json(users)
    
  }
  async getProducts(req, res, next) {

    let {page, limit} = req.query
    
    page = page || 1
    limit = limit || 3
    let offset = page * limit - limit

    const products = await Product.findAndCountAll({limit, offset})

    if (!products) {
      return next(ApiError.badRequest('Продукты не найдены'))
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
  async createProduct(req, res, next) {

    try {
      const {    
        name,
        price,
        info,
        brandId,
        breakingCapacityId,
        degreeProectionId,
        displayId,
        numberPolesId,
        ratedCurrentId,
        ratedVoltageId,
        shutdownCruveId,
        typeOfMechanismId} = req.body
        const {picture} = req.files
  
        let fileName = uuid.v4() + ".jpg"
        picture.mv(path.resolve(__dirname, '..', 'static', fileName))
  
        const product = await Product.create({
        name,
        price,
        brandCharId: brandId,
        breakingCapacityCharId: breakingCapacityId,
        degreeProectionCharId: degreeProectionId,
        displayCharId: displayId,
        numberPolesCharId: numberPolesId,
        ratedCurrentCharId: ratedCurrentId,
        ratedVoltageCharId: ratedVoltageId,
        shutdownCruveCharId: shutdownCruveId,
        typeOfMechanismCharId: typeOfMechanismId,
        img: fileName});    



      if (info) {
          info = await JSON.parse(info)
          await info.forEach(item =>
              ProductInfo.create({
                  title: item.title,
                  description: item.description,
                  productId: product.id
              })
          )
      }

      return res.json(product)
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  
  }
  
}

module.exports = new AdminController()