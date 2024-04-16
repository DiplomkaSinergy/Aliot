const uuid = require('uuid')
const path = require('path');
const {
    Device,
    DeviceInfo,
    Circuitbreakers,
    BreakingCapacityAvto,
    CharacteristicName,
    ShutdownCurveAvto,
    Product,
    ProductInfo
} = require('../models/models')
const ApiError = require('../error/ApiError');
const {
    json
} = require('express');

class ProductController {
    async createProduct(req, res, next) {
        try {
            let {
                name,
                price,
                info,
                breakingCapacityCharId,
                typeOfMechanismCharId,
                ratedCurrentCharId,
                ratedVoltageCharId,
                degreeProtectionCharId,
                numberPolesCharId,
                shutdownCruveCharId,
                displayCharId,
                brandsCharId,
            } = req.body
            
            const {picture} = req.files
            let fileName = uuid.v4() + ".jpg"
            picture.mv(path.resolve(__dirname, '..', 'static', fileName))


              const filteredBody = Object.keys(req.body)
              .filter(key => req.body[key] !== '')
              .reduce((obj, key) => {
                obj[key] = req.body[key];
                return obj;
              }, {});


              console.log(filteredBody);
            

              const productData = {
                name,
                price,
                info,
                img: fileName,
                ...filteredBody
              };


            const product = await Product.create(productData);

            if (info) {
                info = JSON.parse(info)
                info.forEach(item =>
                    ProductInfo.create({
                        title: item.title,
                        description: item.description,
                        productId: product.id
                    })
                )
            }

            return res.json(item)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }


    async getOne(req, res) {
        const {id} = req.params
        console.log('backend: ' + id);
        const product = await Product.findOne({
            where: {id},
            include: [{
                model: ProductInfo,
                as: 'info'
            }]
        }, )
        return res.json(product)
    }


    async getAllProducts(req, res, next) {
        const product = await Product.findAll()
        return res.json(product)
    }


}

module.exports = new ProductController()