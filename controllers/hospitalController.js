const mongoose = require("mongoose")
const Hospital = require("../models/hospital.db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const addHospital = async (req, res) => {
  try {
      if (req.hospitalExists) {
          res.send({
              status: 0,
              message: "An account already exists with this email address"
          })
          return
      }

      const { name, email, phone, password, license } = req.body
      const hashedPwd = await bcrypt.hash(password, 10);

      const hospital = await Hospital.create({
          name: name,
          email: email,
          phone: phone,
          license: license,
          password: hashedPwd,
          address: ""
      })
      res.status(200).send({
          status: 1,
          message: "Hospital registered successfully. Please login",
          data: hospital
      })
  } catch (err) {
      console.log(err)
  }
}

const loginHospital = async (req, res) => {
  try {
      const { email } = req.body
      const hospital = await Hospital.findOne({ email: email })
      
      const token_secret = process.env.JWT_SECRET
      const access_token = jwt.sign(String(hospital._id), token_secret)

      res.cookie("accessToken", access_token, {
          httpOnly: true,
          expires: new Date(Date.now() + 8640000),
      })

      res.status(200).send({
          status: 1,
          message: "Logged in successfully",
          data: hospital
      })
  } catch (err) {
      console.log(err)
  }
}

const getLoggedHospitalData = async (req, res) => {
  try {
      const hospital = await Hospital.findById(req._id)
      res.status(200).send({
          data: hospital
      })
  } catch (err) {
      console.log(err)
  }
}

module.exports = {
  addHospital,
  loginHospital,
  getLoggedHospitalData
}