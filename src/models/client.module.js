const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    min: 13,
    max: 13,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  group: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Group',
    // required: true,
  },
  birthday: {
    type: Date,
    required: false,
  },
  image: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  attendance: [],
  courses: [],
  role: {
      type: String,
      enum: ["student", "parent"],
      required: true,
    },

  balance:[],
  coin:[],
  gender:{
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
});

module.exports = mongoose.model("client", clientSchema);
