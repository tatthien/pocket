const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/', (req, res) => {
  let username = req.body.username
  let password = req.body.password

  let sql = "SELECT * FROM users WHERE username = ?"
  db.query(sql, [username], (err, result) => {
    if (err) {
      return res.status(500).json({
        'msg': 'Something wrong'
      })
    }
    
    if (result.length === 0) {
      return res.status(401).json({
        'msg': 'Please check your username or password'
      })
    }

    if (bcrypt.compareSync(password, result[0].password)) {
      delete result[0].password
      let user = result[0]

      // Create token
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
      })

      user.token = token
      return res.status(200).json({
        'user': user
      })
    } else {
      return res.status(401).json({
        'msg': 'Please check your username or password'
      })
    }
  })
})

router.post('/verify', (req, res) => {
  let token = req.headers['x-access-token']
  if (!token) {
    return res.status(401).json({
      'msg': 'No token provided'
    })
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, encoded) => {
    if (err) {
      return res.status(401).json({
        'msg': 'Failed to authenticate token'
      })
    }
    
    // Check if user exists
    let sql = "SELECT * FROM users WHERE id = ?"
    db.query(sql, [encoded.id], (err, result) => {
      if (err) {
        return res.status(401).json({
          'msg': 'Something wrong'
        })
      }

      if (result.length === 0) {
        return res.status(401).json({
          'msg': 'No user found'
        })
      }
      
      let user = result[0]
      delete user.password
      return res.status(200).json({
        'user': user
      })
    })
  })
})

module.exports = router