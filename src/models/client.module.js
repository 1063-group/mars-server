// CEO - Chief Executive Officer (FOUNDER) - Atham Shaisaev
// COO - Chief Operating Officer - Ibrohim
// - Audit
// - HR
// - Recruiter

// CTO - Chief Technology Officer - Ruslan
// CPO - Chief Product Officer - Ruslan
// Academy
// - Tutor
// - Mentor
// - Head of Academy
// - Head of Tutors
// - Internship
// - Head of Internship


// CMO - Chief Marketing Officer - Damir
// - Target 
// - SMM
// - Mobilograph

// CFO - Chief Financial Officer - Zafar
// - Buhgalter

// CDO - Chief Data Officer - Gulom

// CSO - Chief Sales Officer - Asadbek
// - Administrator 
// - Call center 

// CVO - Chief Visionary Officer - Bekzod
// - Methodology
// - QA 
// 



const mongoose = require("mongoose");
const { nanoid } = require("nanoid");

const clientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        min: 13,
        max: 13,
    },
    password: {
        type: String,
        default: () => nanoid(6),
    },
    coreId: {
        type: String,
        required: false,
        unique: true,
        default: () => nanoid(6),
    },
    // group: {
    //     // type: mongoose.Schema.Types.ObjectId,
    //     // ref: 'Group',
    //     // required: true,
    // },
    birthday: {
        type: Date,
        required: false,
    },
    image: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // attendance: [],
    // courses: [],
    role: {
        type: String,
        enum: ["student", "parent"],
        required: true,
    },

    balance: [],
    coin: [],
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
    },
});

module.exports = mongoose.model("client", clientSchema);
