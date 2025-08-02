const mongoose = require("mongoose");
const { type } = require("os");

const managementSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [
      "CEO",
      "COO",
      "CTO",
      "CPO",
      "CMO",
      "CFO",
      "CDO",
      "CSO",
      "CVO",
      "HR",
      "Head of Academy",
      "Head of Internship",
    ],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  },
  birthday: {
    type: Date,
    required: false,
  },
  attendance: [],
  salary: {
    type: Number,
    default: 0,
  },
});

const Management = mongoose.model("Management", managementSchema);
