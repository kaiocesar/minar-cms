var express = require ('express');
var router = express.Router();

var ensureAuthenticated = require('./auth/middlewares').ensureAuthenticated;

router.get('/', ensureAuthenticated, function (req, res, next) {
    res.render('publicar', {
        isAuthenticated: req.isAuthenticated(),
        user: req.user
    });
});

module.exports = router;
