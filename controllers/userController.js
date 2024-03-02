const mongoose = require("mongoose")
const User = require('../models/User.db')
const bcrypt = require("bcrypt")

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
        })
        res.status(200).send({
            status: 1,
            message: "User registered successfully. Please login"
        })
    } catch (err) {
        console.log(err)
    }
}

const loginUser = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email: email })

        res.status(200).send({
            status: 1,
            message: "Logged in successfully",
            userData: {
                email: user.email
            }
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    addUser,
    loginUser
}
