const mongoose = require('mongoose')

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: [],
    groups: [
        
    ],

})

module.exports = mongoose.model('branch', branchSchema)