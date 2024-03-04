const mongoose = require('mongoose')

const policySchema = new mongoose.Schema({
  _id: {
    type: mongoose.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },  
  duration: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  limit: {
    type: Number,
    required: true
  },
  deductible: {
    type: Number,
    required: true
  }
})

const insuranceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  policies: {
    type: [policySchema]
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
})

module.exports = mongoose.model('insuranceCompanies', insuranceSchema)
