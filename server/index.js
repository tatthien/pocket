const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
const transactions = require('./routes/transactions')
const reports = require('./routes/reports')
const auth = require('./routes/auth')

const app = express()
app.use(bodyParser.json())

// Read config
let config = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, 'config.yml')), 'utf8')

const db = mysql.createConnection({
  host: config.database.host,
  user: config.database.username,
  password: config.database.password,
  database: config.database.name
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

app.listen(config.port || 3000, () => console.log(`Server is running on port ${config.port}`))