const express = require('express');
const path = require('path');
const server = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
// the cores config
server.all('*', function(req, res, next) {
  let origin = req.headers.origin
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header("Cache-Control", "no-store")

  next();
});

server.use(express.static(path.join(__dirname, 'public')));
server.use('/dist', express.static(path.join(__dirname, 'dist')));
server.use('/JD', express.static(path.join(__dirname, 'JD')));

routes(server);

server.listen(3000, () => {
  console.log("正在监听3000端口");
});
