const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password1: {
        type: String,
        required: true,
    },
    password2: {
        type: String,
        required: true,
    },
    wing: {
        type: String,
        required: true,

    },
    flatNumber: {
        type: String,
        required: true,

    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

// JSON Web Token

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            UserId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "10m",
        });
    } catch (error) {
        console.error(error);
    }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
