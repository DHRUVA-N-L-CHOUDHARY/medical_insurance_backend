const mongoose = require("mongoose")
const Hospital = require("../models/hospital.db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const checkHospitalExists = async (req, res, next) => {
    try {
        const { email } = req.body
        const isHospital = await Hospital.exists({email: email})

        if (isHospital) req.hospitalExists = 1
        next()
        return
    } catch (err) {
        console.log(err)
    }
}

const checkHospitalPassword = async (req, res, next) => {
    try {
        if (!req.hospitalExists) {
            res.send({
                status: 0,
                message: "Account not found. Please register"
            })
            return
        } else {
            const { email, password } = req.body
            const hospital = await Hospital.findOne({email: email})

            const db_password = hospital.password

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
  checkHospitalExists,
  checkHospitalPassword
}