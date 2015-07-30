var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Contact Manager', author: 'Devonte M.', user: req.user });
});

module.exports = router;
