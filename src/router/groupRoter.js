const groupSchema = require("../models/group.module");
const express = require("express");
const router = express.Router();

// task list:
// create group
router.post("/group", async () => {
    
});
router.get("/group", async () => {});
// get group by id
router.get("/group/:id", async () => {});
// update group by id
router.patch("/group/:id", async () => {}); // 100
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
