const express = require("express");
const router = express.Router();
const Client = require("../models/client.module");
const { nanoid } = require("nanoid");

// CREATE STUDENT
router.post("/students/create", async (req, res) => {
  try {
    const { firstName, lastName, phone, gender } = req.body;

    if (!firstName || !lastName || !phone || !gender) {
      return res.status(400).json({ message: "Barcha maydonlar kerak" });
    }

    if (!/^\+998\d{9}$/.test(phone)) {
      return res.status(400).json({ message: "Telefon raqam noto‘g‘ri formatda" });
    }

    const exists = await Client.findOne({ phone });
    if (exists) {
      return res.status(409).json({ message: "Bu telefon raqam allaqachon ro‘yxatda" });
    }

    const generatedPassword = nanoid(6);

    const newStudent = new Client({
      firstName,
      lastName,
      phone,
      gender,
      role: "student",
      password: generatedPassword,
    });

    await newStudent.save();

    res.status(201).json({
      message: "Student muvaffaqiyatli yaratildi",
      student: {
        id: newStudent._id,
        phone: newStudent.phone,
        coreId: newStudent.coreId,
        password: generatedPassword,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server xatosi", error: err });
  }
});

// LOGIN
router.post("/students/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "Telefon va parol kerak" });
    }

    const user = await Client.findOne({ phone });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Telefon yoki parol noto‘g‘ri" });
    }

    res.status(200).json({
      message: "Kirish muvaffaqiyatli",
      student: {
        id: user._id,
        coreId: user.coreId,
        fullName: `${user.firstName} ${user.lastName}`,
        phone: user.phone,
        gender: user.gender,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server xatosi", error: err });
  }
});

// GET all students
router.get("/students", async (req, res) => {
  try {
    const students = await Client.find({ role: "student" });
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// GET students by group
router.get("/students/group/:groupId", async (req, res) => {
  try {
    const students = await Client.find({ group: req.params.groupId, role: "student" });
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

module.exports = router;
