require('dotenv').config()

const express = require('express')
const app = express()
const db = require('./config/db')
const port = process.env.PORT || 9000
const { addUser, loginUser, getLoggedUserData, logout } = require('./controllers/userController')
const { authenticateUser, checkUserExists, checkPassword } = require('./middlewares/userMiddleware')
const cookies = require("cookie-parser");

app.use(express.json())
app.use(cookies());

const cors = require('cors')
app.use(cors())

app.post('/signup', checkUserExists, addUser)

app.post('/login', checkUserExists, checkPassword, loginUser)

app.get("/user", authenticateUser, getLoggedUserData)

app.delete("/logout", authenticateUser, logout);

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
