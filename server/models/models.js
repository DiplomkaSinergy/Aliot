const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    firstName: {type: DataTypes.STRING},
    lastName: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})
const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const BasketProduct = sequelize.define('basket_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, allowNull: false},
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.STRING, allowNull: false},
})
const ProductInfo = sequelize.define('product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})


//////////////////////////////////////////////////////////////////////////////////////////////? Xарактеристики
const BreakingCapacityChar = sequelize.define('breaking_capacity_char', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
}, {timestamps: false})
const TypeOfMechanismChar = sequelize.define('type_of_mechanism_char', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
}, {timestamps: false})
const RatedCurrentChar = sequelize.define('rated_current_char', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
}, {timestamps: false})
const RatedVoltageChar = sequelize.define('rated_voltage_char', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
}, {timestamps: false})
const DegreeProtectionChar = sequelize.define('degree_protection_char', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
}, {timestamps: false})
const NumberPolesChar = sequelize.define('number_poles_char', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
}, {timestamps: false})
const ShutdownCruveChar = sequelize.define('shutdown_cruve_char', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
}, {timestamps: false})
const DisplayChar = sequelize.define('display_char', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
}, {timestamps: false})
const BrandsChar = sequelize.define('brands_char', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
}, {timestamps: false})

/////////////////////////////////////////

const СharacteristicТame = sequelize.define('characteristic_name', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
}, {timestamps: false})


User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

Product.hasMany(Rating)
Rating.belongsTo(Product)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

Product.hasMany(ProductInfo, {as: 'info'});
ProductInfo.belongsTo(Product)

//////////////////////////////////////////////////////////////////////////! Characreristic

BreakingCapacityChar.hasMany(Product)
Product.belongsTo(BreakingCapacityChar)

TypeOfMechanismChar.hasMany(Product)
Product.belongsTo(TypeOfMechanismChar)

RatedCurrentChar.hasMany(Product)
Product.belongsTo(RatedCurrentChar)

RatedVoltageChar.hasMany(Product)
Product.belongsTo(RatedVoltageChar)

DegreeProtectionChar.hasMany(Product)
Product.belongsTo(DegreeProtectionChar)

NumberPolesChar.hasMany(Product)
Product.belongsTo(NumberPolesChar)

ShutdownCruveChar.hasMany(Product)
Product.belongsTo(ShutdownCruveChar)

DisplayChar.hasMany(Product)
Product.belongsTo(DisplayChar)

BrandsChar.hasMany(Product)
Product.belongsTo(BrandsChar)

//////////////////////////////////////////////////////////////////////////////////////////////*

СharacteristicТame.hasMany(BreakingCapacityChar)
BreakingCapacityChar.belongsTo(СharacteristicТame)

СharacteristicТame.hasMany(TypeOfMechanismChar)
TypeOfMechanismChar.belongsTo(СharacteristicТame)

СharacteristicТame.hasMany(RatedCurrentChar)
RatedCurrentChar.belongsTo(СharacteristicТame)

СharacteristicТame.hasMany(RatedVoltageChar)
RatedVoltageChar.belongsTo(СharacteristicТame)

СharacteristicТame.hasMany(DegreeProtectionChar)
DegreeProtectionChar.belongsTo(СharacteristicТame)

СharacteristicТame.hasMany(NumberPolesChar)
NumberPolesChar.belongsTo(СharacteristicТame)

СharacteristicТame.hasMany(ShutdownCruveChar)
ShutdownCruveChar.belongsTo(СharacteristicТame)

СharacteristicТame.hasMany(DisplayChar)
DisplayChar.belongsTo(СharacteristicТame)

СharacteristicТame.hasMany(BrandsChar)
BrandsChar.belongsTo(СharacteristicТame)



module.exports = {

    User,
    Basket,
    BasketProduct,
    Product,
    Rating,
    ProductInfo,

//////? char 
BreakingCapacityChar,
TypeOfMechanismChar,
RatedCurrentChar,
RatedVoltageChar,
DegreeProtectionChar,
NumberPolesChar,
ShutdownCruveChar,
DisplayChar,
BrandsChar,
СharacteristicТame
}