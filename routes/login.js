var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	if(firstAcess) {
		res.render('signup');
	}else {
		res.render('login');
	}
});

module.exports = router;