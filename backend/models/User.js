const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    phone: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    flatNo: {
        type: String,
        default: ""
    },

    block: {
        type: String,
        default: ""
    },

    residentType: {
        type: String,
        enum: ["Owner", "Tenant"],
        default: "Owner"
    },

    role: {
        type: String,

        enum: [
            "user",
            "Admin",
            "Super Admin"
        ],

        default: "user"
    },

    status: {
        type: Boolean,
        default: true
    }

},
{
    timestamps: true
})

module.exports =
    mongoose.model("User", userSchema)