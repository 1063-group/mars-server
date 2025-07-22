const express = require("express");
const Client = require("../models/client.module");
const router = express.Router();

// POST | create student
router.post("/students/create", async (req, res) => {
    try {
        //     Bekzod       ""       +998946150908 2132131231 male
        const { firstName, lastName, phone, password, gender } = req.body

        // validation 
        if(!firstName || !lastName || !phone || !password || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // "+998993151516".length // 13
        if(phone.length !== 13) {
            return res.status(400).json({ message: "Telefon raqam 13 ta belgidan iborat bo'lishi kerak" });
        }

        const existingClient = await Client.find({ phone })

        if(!existingClient) {
            return res.status(400).json({ message: "Bu telefon raqam bilan mijoz mavjud" });
        }

        const newStudent = new Client({
            firstName,
            lastName,
            phone,
            password, // Parolni xotiraga saqlashdan oldin hash qilish kerak
            gender,
            role: "student",
        })

        const newParent = new Client({
            firstName,
            lastName,
            phone,
            password, // Parolni xotiraga saqlashdan oldin hash qilish kerak
            gender,
            role: "parent",
        })

        await newParent.save();
        await newStudent.save();

        res.status(201).json({ message: "Mijoz muvaffaqiyatli qo'shildi", student: newStudent, parent: newParent });

    } catch(error) {
        res.status(500).json({ message: "Server error", error });
    }
})

// POST | login student

router.post("/students/login", async (req, res) => {
    try{
        const { phone, password } = req.body;
        if(!phone || !password) {
            return res.status(400).json({ message: "Telefon raqam va parolni kiriting" });
        }
        if(phone.length !== 13) {
            return res.status(400).json({ message: "Telefon raqam 13 ta belgidan iborat bo'lishi kerak" });
        }
        const existingClient = await Client.findOne({ phone , password });
        if(!existingClient) {
            return res.status(400).json({ message: "Telefon raqam yoki parol noto'g'ri" });
        }
        res.status(200).json({ message: "muvafaqqiyatli kirdingiz", student: existingClient });
    }catch(error) {
        res.status(500).json({ message: "Server error", error });
    }
})



// GET | get all students

// GET | get all students by group

// GET | get student by id
// GET | get student by phone
// GET | get student by course

// DELETE | delete student by id
// PUT | update student by id
