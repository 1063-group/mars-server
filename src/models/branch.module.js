const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true
  },
  district: {
    type: String,
    enum: [
      'Chilonzor', 'Yunusobod', 'Mirobod', 'Yakkasaroy', 'Shayxontohur',
      'Olmazor', 'Yashnobod', 'Uchtepa', 'Bektemir', 'Sergeli', 'Mirzo Ulugbek',
      'Yangihayot'
    ],
    required: true
  },
  location: {
    // Map location (latitude & longitude)
    type: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    required: true
  },
  phone: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group'
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Branch', branchSchema);
