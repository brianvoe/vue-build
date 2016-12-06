module.exports = function (app) {
  app.get('/ok', function (req, res) {
    res.status(200); res.send('ok')
  })
}
