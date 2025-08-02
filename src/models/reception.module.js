const mongoose = require('mongoose')

const receptionSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    birthDate: {
        type: Date
    },
    role: {
        type: String,
        enum: ["call center", "administrator"]
    },
    creactedDate: {
        type: Date,
        required: true
    },
    workTime: []
})

module.exports = mongoose.model('reception', receptionSchema)