const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const transactions = require('./routes/transactions')
const reports = require('./routes/reports')
const auth = require('./routes/auth')

const app = express()
app.use(bodyParser.json())

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'finance'
})

db.connect((err) => {
  if (err) {
    throw err
  }

  console.log('Connected to database')
})
global.db = db

app.use('/api/transactions', transactions)
app.use('/api/reports', reports)
app.use('/api/auth', auth)

app.listen(3000, () => console.log('Server is running...'))