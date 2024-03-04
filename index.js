require('dotenv').config()

const express = require('express')
const app = express()
const db = require('./config/db')
const port = process.env.PORT || 9000
const { authenticate, checkUserExists, checkUserPassword } = require('./middlewares/userMiddleware')
const { addUser, loginUser, getLoggedUserData, logout } = require('./controllers/userController')

const { checkHospitalPassword, checkHospitalExists } = require('./middlewares/hospitalMiddleware')
const { addHospital, loginHospital, getLoggedHospitalData } = require('./controllers/hospitalController')

const { checkInsuranceExists, checkInsurancePassword } = require('./middlewares/insuranceMiddleware')
const { addInsurance, loginInsurance, getLoggedInsuranceData } = require('./controllers/insuranceController')

const cookies = require("cookie-parser");

app.use(express.json())
app.use(cookies());

const cors = require('cors')
app.use(cors())

// User
app.post('/register/user', checkUserExists, addUser)
app.post('/login/user', checkUserExists, checkUserPassword, loginUser)
app.get("/user", authenticate, getLoggedUserData)

// Hospital
app.post("/register/hospital", checkHospitalExists, addHospital)
app.post("/login/hospital", checkHospitalExists, checkHospitalPassword, loginHospital)
app.get("/hospital", authenticate, getLoggedHospitalData)

// Insurance
app.post("/register/insurance", checkInsuranceExists, addInsurance)
app.post("/login/insurance", checkInsuranceExists, checkInsurancePassword, loginInsurance)
app.get("/insurance", authenticate, getLoggedInsuranceData)

// Logout
app.delete("/logout", authenticate, logout);


app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
