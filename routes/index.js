var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	data = {
		header:'header',
		body:'body',
		banner:'banner'
	}
  res.render('index/index', data);
});

module.exports = router;
