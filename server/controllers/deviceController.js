const uuid = require('uuid')
const path = require('path');
const {Device, DeviceInfo, Circuitbreakers, BreakingCapacityAvto, CharacteristicName, ShutdownCurveAvto} = require('../models/models')
const ApiError = require('../error/ApiError');
const { json } = require('express');

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }


    async getOne(req, res) {
        const {id} = req.query
        console.log('backend: ' + id);
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }


    async getAll(req, res) {
        const {type} = req.params
        
        let transformedProducts
        let filters = {}
        let products;

        switch(type) {
            case 'circuit_breakers':

                const [breakingCapacityFilters, shutdownCurveFilters] = await Promise.all([
                    BreakingCapacityAvto.findAll({attributes: ['value']}),
                    ShutdownCurveAvto.findAll({attributes: ['value']})
                ]);

                filters.char1 = breakingCapacityFilters;
                filters.char2 = shutdownCurveFilters;

                    products = await Circuitbreakers.findAll({
                        include: [
                            {
                                model: Device,
                            },
                            {
                                model: BreakingCapacityAvto,
                                attributes: ['value'],
                                include: [
                                    {
                                        model: CharacteristicName
                                    }
                                ]
                            },
                            {
                                model: ShutdownCurveAvto,
                                attributes: ['value'],
                                include: [
                                    {
                                        model: CharacteristicName
                                    }
                                ]
                            },
                        ]
                    })
                transformedProducts = products.map(product => ({
                    ...product.toJSON(),
                    char1: {value: product.breaking_capacity_avto.value, title: product.breaking_capacity_avto.characteristic_name.value},
                    char2: {value: product.shutdown_curve_avto.value, title: product.shutdown_curve_avto.characteristic_name.value},
                  })),
                transformedProducts.forEach(product =>{
                    delete product.breaking_capacity_avto
                    delete product.shutdown_curve_avto
                    delete product.breakingCapacityAvtoId
                    delete product.deviceId
                    delete product.shutdownCurveAvtoId
                    delete product.shutdownCurveAvtoId
                    delete product.updatedAt
                    delete product.createdAt
                }),
                
                products = transformedProducts,
                console.log(filters)
                
                break
            case 'pure_steel':
            case 'household_cabinets':
            case 'differential_automata':

        }

        console.log(type);

        return res.json({filters, products});
    }

    
}

module.exports = new DeviceController()