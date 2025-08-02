const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "branch",
        required: true
    },
    lessonTime: {
        type: Date,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "client"
        }
    ],
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Academic",
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    coin: {
        type: Number,
        default: 0
    }
})

groupSchema.pre("save", function (next) {
    this.coin = this.students.length * 70
    next()
})

module.exports = mongoose.model('group', groupSchema)