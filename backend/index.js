const express = require('express');
const mongoose = require("mongoose");
const noticeRoutes = require("./routes/noticeRoutes");
const eventJoinRoutes = require("./routes/eventJoinRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const settingRoutes = require("./routes/settingRoutes")
const faqRoutes = require("./routes/faqRoutes")
const eventRoutes = require("./routes/eventRoutes")
const residentRoutes = require("./routes/residentRoutes")
const newsletterRoutes = require("./routes/newsletterRoutes")
const featureRoutes = require("./routes/featureRoutes")
const contactUsRoutes = require("./routes/contactUsRoutes")

const testimonialRoutes = require("./routes/testimonialRoutes")
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/contactus", contactUsRoutes)
app.use("/api/newsletter", newsletterRoutes)
app.use("/api/testimonial", testimonialRoutes)
app.use("/api/feature", featureRoutes)
app.use("/eventJoin", eventJoinRoutes);
app.use("/api/setting", settingRoutes)
app.use("/api/resident", residentRoutes)
app.use("/api/faq", faqRoutes)
app.use("/api/events", eventRoutes)
// MongoDB Atlas connect
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes

app.use('/api/complaint', complaintRoutes);


const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);
app.use("/api/notice", noticeRoutes);
// Test route
app.get('/test', (req, res) => {
    res.send('Hello World!');
});

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});