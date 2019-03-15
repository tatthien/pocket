const express = require('express')
const formatDate = require('date-fns/format')

const router = express.Router()

router.get('/', (req, res) => {
  let sql = "SELECT * FROM transactions ORDER BY created_at DESC"

  db.query(sql, (err, results) => {
    if (err) {
      throw err
    }
    
    // Group transactions by date
    let transactions = results.reduce((acc, obj) => {
      let key = formatDate(obj.created_at, 'DD-MM-YYYY')
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    }, {})
   
    res.status(200).json({ data: transactions })
  })
})

router.post('/', (req, res) => {
  let sql = "INSERT INTO transactions SET ?"
  db.query(sql, {
    amount: parseInt(req.body.amount) * 100,
    note: req.body.note,
    cat_id: 0,
    created_at: req.body.date,
    updated_at: req.body.date
  }, (err, result) => {
    if (err) throw err
    if (result.insertId) {
      res.status(200).json({ msg: 'Add transactions successfully.' })
    } else {
      res.status(400).json({ msg: 'Cannot add transaction.' })
    }
  })
})

module.exports = router