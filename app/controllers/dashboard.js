// ./app/controllers/dashboard.js

module.exports = function(app) {

	var DashboardController = {
		index : function(req, res) {
			res.render('dashboard/default/index');
		},
		profile : function(req, res) {
			res.render('dashboard/default/profile');
		}, 
		settings : function(req, res) {
			res.render('dashboard/default/settings');
		},
		search : function(req, res) {
			res.render('dashboard/default/search');
		}
	};

	return DashboardController;

};