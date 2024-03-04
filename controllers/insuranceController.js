const mongoose = require("mongoose")
const Insurance = require("../models/insurance.db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const addInsurance = async (req, res) => {
  try {
      if (req.insuranceExists) {
          res.send({
              status: 0,
              message: "An account already exists with this email address"
          })
          return
      }

      const { name, email, password, policies } = req.body
      const hashedPwd = await bcrypt.hash(password, 10);

      const insurance = await Insurance.create({
          name: name,
          email: email,
          password: hashedPwd,
          policies: policies,
          address: ""
      })
      res.status(200).send({
          status: 1,
          message: "Insurance Company registered successfully. Please login",
          data: insurance
      })
  } catch (err) {
      console.log(err)
  }
}

const loginInsurance = async (req, res) => {
  try {
      const { email } = req.body
      const insurance = await Insurance.findOne({ email: email })
      
      const token_secret = process.env.JWT_SECRET
      const access_token = jwt.sign(String(insurance._id), token_secret)

      res.cookie("accessToken", access_token, {
          httpOnly: true,
          expires: new Date(Date.now() + 8640000),
      })

      res.status(200).send({
          status: 1,
          message: "Logged in successfully",
          data: insurance
      })
  } catch (err) {
      console.log(err)
  }
}

const getLoggedInsuranceData = async (req, res) => {
  try {
      const insurance = await Insurance.findById(req._id)
      res.status(200).send({
          data: insurance
      })
  } catch (err) {
      console.log(err)
  }
}

module.exports = {
  addInsurance,
  loginInsurance,
  getLoggedInsuranceData
}