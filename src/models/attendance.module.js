const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: ["client", "management", "reception"]
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('attendance', attendanceSchema)