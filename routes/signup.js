var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('signup', {
        isAuthenticated: req.isAuthenticated(),
        user: req.user
    });
});

module.exports = router;