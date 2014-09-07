var express = require ('express');
var router = express.Router();

var ensureAuthenticated = require('./auth/middlewares').ensureAuthenticated;

router.get('/', ensureAuthenticated, function (req, res) {
   res.render('dashboard', {
       user: req.user
   });
});

module.exports = router;