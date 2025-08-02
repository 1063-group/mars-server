const groupSchema = require("../models/group.module");
const express = require("express");
const router = express.Router();

// task list:
// create group
router.post("/group", async (req, res) => {
    try {
        const { groupName, teacher } = req.body;
        if(!groupName || !teacher) {
            return res.status(400).json({ message: "Barcha maydonlar kerak" });
        }
        const newGroup = new groupSchema({ groupName, teacher });
        const group = await newGroup.save();
        res.status(200).json({ message: "Group muvaffaqiyatli yaratildi", group });
    } catch (error) {
        console.log("SERVER ERROR: | create group: ", error)
        res.status(500).json({ message: "server error", err: error.message})
    }
});

router.get("/group", async () => {
  try {
    const groups = await groupSchema.find();
    res.status(200).json({ message: "Group list", groups });
  } catch (e) {
    console.log("SERVER ERROR: | group list: ", e);
    res.status(500).json({ message: "Server xatosi", error: e });
  }
});
// get group by id
router.get("/group/:id", async () => {
  try {
    const { id } = req.params;
    const group = await groupSchema.findById(id);
    // validation
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.status(200).json({ message: "Group list", group });
  } catch (e) {
    console.log("SERVER ERROR: | get group by id: ", e);
    res.status(500).json({ message: "Server xatosi", error: e });
  }
});
// update group by id
router.patch("/group/:id", async () => {d}); // 100
// delete group by id
router.delete("/group/:id", async () => {});

// filter groups by teachername
router.get("/group/teacher/:teachername", async () => {
  try {
    const { teachername } = req.params;
    const groupFilter = await groupSchema.find({ teacher: teachername });
    // validation
    if (!groupFilter) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json({ message: "Group list", groupFilter });

  } catch (e) {
    console.log("SERVER ERROR: | filter by teachername: ", e);
    res.status(500).json({ message: "Server xatosi", error: e });
  }
});

module.exports = router;
