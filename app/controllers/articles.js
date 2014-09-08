// Articles Controller

module.exports = function(app) {
	
	var ArticlesSchema = require('../models/article');

	var ArticlesController = {
		index : function(req, res) {
			return ArticlesSchema.find(function(err, articles){
				var resArticles = (!err) ? articles : {};
				res.render('dashboard/articles/index',{title: "Articles", articles : resArticles});
			});
		},
		add : function(req, res) {
			res.render('dashboard/articles/add', {title: "Add article"});
		},	
		edit : function(req, res) {
			res.render('dashboard/articles/edit', {title: "Edit article"});
		}
	};

	return ArticlesController;

};
