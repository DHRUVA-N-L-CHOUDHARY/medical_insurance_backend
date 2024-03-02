require('dotenv').config()

const express = require('express')
const app = express()
const db = require('./config/db')
const port = process.env.PORT || 9000
const { addUser, loginUser } = require('./controllers/userController')
const { checkUserExists, checkPassword } = require('./middlewares/userMiddleware')

app.use(express.json())

const cors = require('cors')
app.use(cors())

app.post('/signup', checkUserExists, addUser)

app.post('/login', checkUserExists, checkPassword, loginUser)

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
