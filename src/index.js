const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const clientRouter = require('./router/clientRouter');
const academicRouter = require('./router/academicRouter');
const groupRouter = require('./router/groupRouter');
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
connectDB()


// Sample routex`x
app.get('/', (req, res) => {
    res.send('Hello World!');
});


// http:/localhost:5000/api/academic/create
app.use("/api", clientRouter)
app.use("/api", academicRouter)
app.use("/api", groupRouter)


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});