const mongoose = require('mongoose')

const planSchema = new mongoose.Schema({
  _id: {
    type: mongoose.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },  
  name: {
    type: String,
    required: true
  },
  typeOfTreatment: {
    type: String,
    required: true
  },
  premiumAmount: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  maturityAmount: {
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
  plans: {
    type: [planSchema]
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
