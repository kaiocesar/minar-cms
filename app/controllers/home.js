// ./app/controllers/home.js

// Home Controller
module.exports = function(app) {
	
	var ArticlesSchema = require('../models/article');

	var HomeController = {
		index : function(req, res) {
			res.render('front/index',{title: "Home page"});
		},

		articles : function(req, res) {

			return ArticlesSchema.find(function(err, articles){
				var articlesReturn = (!err) ? articles : {};
				console.log(articlesReturn);
				res.render('front/articles', {title:"All article", articles : articlesReturn});
			})
			
		}
	};

	return HomeController;

};





