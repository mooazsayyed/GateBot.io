const User = require("../models/user-models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const home = async (req, res) => {
    try {
        res.status(200).send("home page");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error1" });
    }
};

const register = async (req, res) => {
    try {
        const { email, password1, password2, wing, flatNumber, isAdmin } = req.body;

        if (password1 !== password2) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already taken" });
        }

        const saltRound = 10;
        const hash_password = await bcrypt.hash(password1, saltRound);

        try {
            const user = new User({
                email,
                password1: hash_password,
                password2: hash_password,
                wing,
                flatNumber,
                isAdmin
            });
            await user.save();
            res.status(201).json({ message: "User registered successfully", token: await user.generateToken(), userId: user._id.toString() });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error2" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error3" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password1 } = req.body;

        const userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password1, userExist.password1);

        if (isPasswordValid) {
            res.status(200).json({ message: "User logged in successfully", token: await userExist.generateToken(), userId: userExist._id.toString() });
        } else {
            res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error4" });
    }
};

module.exports = { home, register, login };
