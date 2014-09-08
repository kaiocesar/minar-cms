// ./configs/routes.js

module.exports = function(app, passport) {

	var defaults = require('../app/controllers/home')(app)
  	  , articles = require('../app/controllers/articles')(app)
  	  , dashboard = require('../app/controllers/dashboard')(app)
  	  , users = require('../app/controllers/users')(app);

	// Usa as respectivas rotas quando chamadas
	app.get('/', defaults.index);
	app.get('/articles', defaults.articles);
	

	
	app.get('/dashboard', dashboard.index);
	app.get('/dashboard/articles', articles.index);
	app.get('/dashboard/articles/add', articles.add);
	app.get('/dashboard/articles/edit/:id', articles.edit);


	app.get('/dashboard/profile', dashboard.profile);
	app.get('/dashboard/settings', dashboard.settings);
	app.get('/dashboard/search', dashboard.search);
	app.get('/dashboard/logout', function(req, res){
		res.redirect('/');
	});

	app.get('/dashboard/users', users.index);
	app.get('/dashboard/users/add', users.add);
	app.get('/dashboard/users/edit', users.edit);



	// app.use('/signup', criarUsuario);
	// app.use('/login', login);
	// app.use('/logout', logout);
	// app.use('/dashboard', dashboard);
	// app.use('/publicar', publicar);




	// app.post('/login', passport.authenticate('local'), function (req, res) {
	//     res.redirect(req.session.returnTo || '/');
	// });

	// app.post('/signup', register, function (req, res) {
	//     firstAcess = false;
	//     res.redirect('/');
	// });



};






