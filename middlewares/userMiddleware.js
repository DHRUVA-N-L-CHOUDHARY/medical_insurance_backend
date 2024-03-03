const mongoose = require("mongoose")
const User = require("../models/user.db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(500).send("Authentication failed. No access token");
    else {
        const token_secret = process.env.JWT_SECRET;
        jwt.verify(token, token_secret, (err, userId) => {
            if (err) return res.status(500).send("Authentication failed. Invalid token")
            else {
                req.userId = userId;
                next()
            }
        })
    }
  };

const checkUserExists = async (req, res, next) => {
    try {
        const { email } = req.body
        const isUser = await User.exists({email: email})

        if (isUser) req.userExists = 1
        next()
        return
    } catch (err) {
        console.log(err)
    }
}

const checkPassword = async (req, res, next) => {
    try {
        if (!req.userExists) {
            res.send({
                status: 0,
                message: "Account not found. Please register"
            })
            return
        } else {
            const { email, password } = req.body
            const user = await User.findOne({email: email})

            const db_password = user.password

            if (!await bcrypt.compare(password, db_password)) {
                res.send({
                    status: 0,
                    message: "Email and password do not match"
                })
                return
            }
            next()
            return
        }
    } catch (err) {
        console.log(err)
    } 
}   

module.exports = {
    authenticateUser,
    checkUserExists,
    checkPassword
}