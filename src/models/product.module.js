const mongoose = require('mongoose')

const productScheme = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: [
        {
            path: String
        }
    ],
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0,
        required: true
    }
})

module.export = mongoose.model('product', productScheme)