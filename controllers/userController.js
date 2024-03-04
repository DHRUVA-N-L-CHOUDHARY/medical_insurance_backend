const mongoose = require("mongoose")
const User = require("../models/user.db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const addUser = async (req, res) => {
    try {
        if (req.userExists) {
            res.send({
                status: 0,
                message: "An account already exists with this email address"
            })
            return
        }

        const { name, email, phone, password, aadhaar } = req.body
        const hashedPwd = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name,
            email: email,
            phone: phone,
            aadhaar: aadhaar,
            password: hashedPwd,
            address: ""
        })
        res.status(200).send({
            status: 1,
            message: "User registered successfully. Please login",
            data: user
        })
    } catch (err) {
        console.log(err)
    }
}

const loginUser = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email: email })
        
        const token_secret = process.env.JWT_SECRET
        const access_token = jwt.sign(String(user._id), token_secret)

        res.cookie("accessToken", access_token, {
            httpOnly: true,
            expires: new Date(Date.now() + 8640000),
        })

        res.status(200).send({
            status: 1,
            message: "Logged in successfully",
            data: user
        })
    } catch (err) {
        console.log(err)
    }
}

const getLoggedUserData = async (req, res) => {
    try {
        const user = await User.findById(req._id)
        res.status(200).send({
            data: user
        })
    } catch (err) {
        console.log(err)
    }
}

const logout = (req, res) => {
    res.clearCookie("accessToken");
    res.send("Logged out");
  };

module.exports = {
    addUser,
    loginUser,
    getLoggedUserData,
    logout
}
