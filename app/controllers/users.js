module.exports = function(app) {

	var UsersController = {
		index : function(req, res) {
			res.render('dashboard/users/index');
		},
		add : function(req, res) {
			res.render('dashboard/users/add');
		},
		edit : function(req, res) {
			res.render('dashboard/users/edit');
		}
	};

	return UsersController;

};