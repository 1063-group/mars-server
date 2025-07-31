const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const clientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^\+998\d{9}$/, "Telefon raqam +998XXXXXXXXX formatda bo‘lishi kerak"],
  },
  password: {
    type: String,
    default: () => nanoid(6), // Plain parol
  },
  coreId: {
    type: String,
    unique: true,
    default: () => nanoid(6),
  },
  birthday: Date,
  image: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  role: {
    type: String,
    enum: ["student", "parent"],
    required: true,
  },
  balance: [],
  coin: [],
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
});

module.exports = mongoose.model("client", clientSchema);
