const express = require('express')
const router = express.Router()
const formatDate = require('date-fns/format')

router.get('/', (req, res) => {
  let range = 7
  if (typeof req.query.range !== 'undefined') {
    range = req.query.range
  }

  let d = new Date()
  let dates = []
  for (let i = 0; i < range; i++) {
    d.setDate(d.getDate() - 1)
    dates.push(formatDate(d, 'YYYY-MM-DD'))
  }

  dates = dates.reverse()
  
  let sql = 'SELECT SUM(amount), created_at FROM transactions WHERE created_at BETWEEN ? AND ?  GROUP BY created_at'
  db.query(sql, [dates[0], dates[range - 1]], (err, results) => {
    if (err) throw err

    values = []
    dates.forEach((date) => {
      let r = results.filter((item) => date === formatDate(item.created_at, 'YYYY-MM-DD'))
      if (r.length === 0) {
        values.push(0)
      } else {
        values.push(r[0]['SUM(amount)'] / 100)
      }
    })

    res.status(200).json({
      labels: dates,
      values: values
    })
  })
})

module.exports = router