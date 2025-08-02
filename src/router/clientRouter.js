const express = require('express')
const Client = require("../models/client.module")
const router = express.Router();


// create student
router.post("/students/create", async (req, res) => {
    try {
        const { firstName, lastName, phone, gender } = req.body

        console.log("req.body", req.body)

        // validation
        if (!firstName || !lastName || !phone || !gender) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (phone.length !== 13) {
            return res.status(400).json({ message: "Telefon raqam 13 ta belgidan iborat bo'lishi kerak" })
        }

        const newStudent = new  Client({
            firstName,
            lastName,
            phone,
            gender,
            role: "student",
        })

         const newParent = new  Client({
            firstName,
            lastName,
            phone,
            gender,
            role: "parent",
        })

        await newParent.save()
        await newStudent.save()

        res.status(201).json({ message: "Mijoz muvaffaqiyatli qo'shildi", student: newStudent, parent: newParent})
    } catch (error) {
        res.status(500).json({ message: "Server error", error })
    }
})

//  login student

router.post("/student/login", async (req, res) => {
    try {
        const { phone, password } = req.body

        // validation

        if(!phone || password) {
            return res.status(400).json({ message: "Telefon raqam va password kiriting"})
        }

        if(phone.length !== 13) {
            res.status(400).json({ message: "Telefon raqam 13 ta belgidan iborat bo'lishi kerak"})
        }

        const existingClient = await Client.findOne({ phone, password})
        if(!existingClient) {
            return res.status(400).json({ message: "Telefon raqam yoki password noto'g'ri"})
        }
        res.status(200).json({ message: "Accauntda muvaffaqiyatli kirdingiz", student: existingClient})
    } catch (error) {
        res.status(500).json({ message: "Server error", error})
    }
})

// get all students

router.get("/student", async (req, res) => {
    try {
        const students = await Client.find({ role: "student"})
        res.status(200).json(students)
    } catch (error) {
        res.status(500).json({ message: "Serverda xatolik...", error})
    }
})

// get all students by group
router.get("/student/group/:id", async (req, res) => {
    try {
        const { id } = req.params
        const students = await Client.find({ group: id})
        res.status(200).json(students)
    } catch (error) {
        res.status(500).json({ message: "Serverda xatolik...", error})
    }
})

// get student by IDsdfdsfdsfds

router.get("/student/:id", async (req, res) => {
    try {
        const { id } = req.params
        const student = await Client.findById(id)
        res.status(200).json(student)
    } catch (error) {
        res.status(500).json({ message: "Serverda xatolik...", error})
    }
})


// get student by phone

router.get("/student/phone/:phone", async (req, res) => {
    try {
        const { phone } = req.params
        const student = await Client.findOne({ phone })
        res.status(200).json(student)    
    } catch (error) {
        res.status(500).json({ message: "Serverda xatolik...", error})
    }
})

module.exports = router;

// get student by course

// delete student by id 
// update student by id