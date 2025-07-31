const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Academic",
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "client",
    },
  ],
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
  dateStart: {
    type: Date,
    default: Date.now,
  },
  dateEnd: {
    type: Date,
    default: Date.now,
  },
  lessonDays: {
    type: Number,
    default: 0,
  },
  coin: {
    type: Number,
    default: 0,
  },
});

groupSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  this.coin = this.students.length * 70;

  next();
});

module.exports = mongoose.model("Group", groupSchema);
