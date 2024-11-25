const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user","manager"]
    },
    twoFactorSecret: { 
        type: String 
    }, // Secret for 2FA
    is2FAEnabled: {
         type: Boolean, 
         default: false 
    } // 2FA status
    },{
    timestamps: true,
})

module.exports = mongoose.model("User", userSchema);