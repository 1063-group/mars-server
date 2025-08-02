const groupSchema = require("../models/group.module")
const express = require("express")
const router = express.Router()

// task list 
// create group

router.post("/group", async (req, res) => {
    try {
        const { name, branch, lessonTime, startTime, teacher } = req.body

        // validation

        if (!name || !branch || !lessonTime || !startTime || !teacher) {
            return res.status(400).json({ message: "Barcha maydonlar kerak" })
        }

        const newGroup = new groupSchema({
            name,
            branch,
            lessonTime,
            startTime,
            teacher
        })

        await newGroup.save()
        return res.status(201).json({ message: "Group muvaffaqiyatli qo'shildi", group: newGroup })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error", error })
    }
})

//  get all groups

router.get("/group", async (req, res) => {
    try {
        const groups = await groupSchema.find()
        // validation
        if (!groups) {
            return res.status(404).json({ message: "Groups topilmadi" })
        }
        return res.status(200).json({ message: "Groups list", groups })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error", error })
    }
})

// get group by id 

router.get("/group/:id", async (req, res) => {
    try {
        const { id } = req.params
        const groupFind = await groupSchema.findById(id)
        // validation
        if (!groupFind) {
            return res.status(404).json({ message: "Group topilmadi" })
        }
        return res.status(200).json(groupFind)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error", error })
    }
})

// update group by id

router.patch("/group/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { name, branch, lessonTime, startTime, teacher } = req.body
        const groupFind = await groupSchema.findById(id)
        // validation
        if (!groupFind) {
            return res.status(404).json({ message: "Group topilmadi" })
        }
        
        if (name !== undefined) groupFind.name = name
        if (branch !== undefined) groupFind.branch = branch
        if (lessonTime !== undefined) groupFind.lessonTime = lessonTime
        if (startTime !== undefined) groupFind.startTime = startTime
        if (teacher !== undefined) groupFind.teacher = teacher
        
        await groupFind.save()
        return res.status(200).json({ message: "Group muvaffaqiyatli o'zgartirildi", groupFind })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error", error })
    }
})

// delete group by id

router.delete("/group/:id", async (req, res) => {
    try {
        const { id } = req.params
        const groupFind = await groupSchema.findByIdAndDelete(id)
        // validation
        if (!groupFind) {
            return res.status(404).json({ message: "Group topilmadi" })
        }
        return res.status(200).json({ message: "Group muvaffaqiyatli o'chirildi", groupFind })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error", error })
    }
})

// filter group by teachername

router.get("/group/teacher/:teachername", async (req, res) => {
    try {
        const { teachername } = req.params
        const groupFilter = await groupSchema.find({ teacher: teachername })
        // validation
        if (!groupFilter) {
            return res.status(404).json({ message: "Bunday teacher mavjud emas" })
        }
        return res.status(200).json(groupFilter)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error", error })
    }
})

module.exports = router