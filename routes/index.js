var fs = require("fs")

module.exports = function (app) {
  app.get('/', (req, res) => {

  })
  app.get('/getModel', (req, res) => {
    fs.readFile("./JD/" + req.query.modelpath, function (err, data) {
      if (err) {
        return console.error(err);
      }
      res.send(data)
    });
  })
  app.get('/getBase', (req, res) => {
    fs.readFile("./JD/base.JD", function (err, data) {
      if (err) {
        return console.error(err);
      }
      res.send(data)
    });
  })
  app.get('/getAnim', (req, res) => {
    var anim = req.query.anim
    fs.readFile(`./JD/${anim}.JD`, function (err, data) {
      if (err) {
        return console.error(err);
      }
      res.send(data)
    });
  })
}
