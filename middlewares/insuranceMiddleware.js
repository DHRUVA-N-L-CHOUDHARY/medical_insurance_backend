const mongoose = require("mongoose")
const Insurance = require("../models/insurance.db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const checkInsuranceExists = async (req, res, next) => {
    try {
        const { email } = req.body
        const isInsurance = await Insurance.exists({email: email})

        if (isInsurance) req.insuranceExists = 1
        next()
        return
    } catch (err) {
        console.log(err)
    }
}

const checkInsurancePassword = async (req, res, next) => {
    try {
        if (!req.insuranceExists) {
            res.send({
                status: 0,
                message: "Account not found. Please register"
            })
            return
        } else {
            const { email, password } = req.body
            const insurance = await Insurance.findOne({email: email})

            const db_password = insurance.password
            
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
  checkInsuranceExists,
  checkInsurancePassword
}