// CRUD
// Create
// Read
// Update
// Delete

const express = require("express");
const router = express.Router();
const Academic = require("../models/academic.module");

// API LIST

router.post("/academic/create", async (req, res) => {
    try {
        const {name, surname, phone, role} = req.body;

        if (!name || !surname || !phone || !role) {
            return res.status(400).json({ message: "Barcha maydonlar kerak" });
        }

        if (!/^\+998\d{9}$/.test(phone)) {
            return res.status(400).json({ message: "Telefon raqam noto‘g‘ri formatda" });
        }

        const exists = await Academic.findOne({ phone });
        if (exists) {
            return res.status(409).json({ message: "Bu telefon raqam allaqachon ro‘yxatda" });
        }

        const newAcademic = new Academic({
            name,
            surname,
            phone,
            role,
        });

        await newAcademic.save();
        res.status(201).json({
            message: "Academic account muvaffaqiyatli qo‘shildi",
            academic: newAcademic
        })
    } catch(err) {
        console.log("Academic API create Error: ", err)
        res.status(500).json({ message: "Server xatosi", error: err })
    }
})

router.get("/academic/list", async (req, res) => {
    try {
        const academics = await Academic.find();
        res.status(200).json({
            message: "Academics list",
            academics
        })
    } catch(err) {
        console.log("Academic API list Error: ", err)
        res.status(500).json({ message: "Server xatosi", error: err })
    }
})

// request: localhost:8000/api/academic/delete/685a92a9d1f58e03e089085a
router.delete("/academic/delete/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const academic = await Academic.findByIdAndDelete(id);
        res.status(200).json({
            message: "Academic muvaffaqiyatli o‘chirildi",
            academic
        })
    } catch(err) {
        console.log("Academic API delete Error: ", err)
        res.status(500).json({ message: "Server xatosi", error: err })
    }
})

router.patch("/academic/update/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {name, surname, phone, role} = req.body;
        const academic = await Academic.findByIdAndUpdate(id, {
            name,
            surname,
            phone,
            role
        }, {new: true});
        res.status(200).json({
            message: "Academic muvaffaqiyatli o‘zgartirildi",
            academic
        })
    } catch(err) {
        console.log("Academic API update Error: ", err)
        res.status(500).json({ message: "Server xatosi", error: err })
    }
})

module.exports = router