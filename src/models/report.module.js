const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "client"
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    files: [
        {
            path: String
        }
    ],
    status: {
        type: String,
        enum: ["active", "solved"]
    }

})

module.exports = mongoose.model('report', reportSchema)