const mongoose = require("mongoose");

const academicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
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
  groups: [],
  salary: {
    fixed: {
      type: Number,
      default: 0,
    },
    bonus: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  birthday: {
    type: Date,
    required: false,
  },
  image: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
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
  attendance: [],
  specialization: [],
  role: [
    {
      type: String,
      enum: ["mentor", "tutor", "instuctor", "intern"],
      required: true,
    },
  ],
});

const Academic = mongoose.model("Academic", academicSchema);
