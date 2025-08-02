const mongoose = require('mongoose')

const shopSchema = new mongoose.Schema({
    products: [],
    discounts: []
})

module.exports = mongoose.model('shop', shopSchema)