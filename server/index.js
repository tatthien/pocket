const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const transactions = require('./routes/transactions')
const reports = require('./routes/reports')
const auth = require('./routes/auth')

require('dotenv').config()

const app = express()
app.use(bodyParser.json())

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

db.connect((err) => {
  if (err) {
    console.log('Cannot connect to database')
  }

  console.log('Connected to database')
})
global.db = db

app.use('/api/transactions', transactions)
app.use('/api/reports', reports)
app.use('/api/auth', auth)

const port = process.env.POST || 3000
app.listen(port, () => console.log(`Server is running on port ${port}`))