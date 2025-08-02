const mongoose = require('mongoose')

const homeworkSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "client",
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    comment: {
        type: String
    },
    files: [],
    score: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('homework', homeworkSchema)