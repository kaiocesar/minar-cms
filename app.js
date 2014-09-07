var express = require('express')
 , path = require('path')
 , bodyParser = require('body-parser')
 , cookieParser = require('cookie-parser')
 , expressSession = require('express-session')
 , mongoose = require('mongoose')
 , bcrypt = require('bcrypt')
 , SALT_WORK_FACTOR = 10
 , routes = require('./routes/index')
 , criarUsuario = require('./routes/criarUsuario')
 , login = require('./routes/login')
 , logout = require('./routes/logout')
 , dashboard = require('./routes/dashboard')
 , publicar = require('./routes/publicar');


var passport = require('passport'),
    passportLocal = require('passport-local');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());
app.use(expressSession({
    secret: process.env.SESSION_SECRET || 'dCj0qrPSdog6gSgQHH8WnuoDc1lLPpn1',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy(verifyCredentials));

function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Usa as respectivas rotas quando chamadas
app.use('/', routes);
app.use('/signup', criarUsuario);
app.use('/login', login);
app.use('/logout', logout);
app.use('/dashboard', dashboard);
app.use('/publicar', publicar);

mongoose.connect('mongodb://localhost/users', function (erro) {
    if (erro) {
        throw new Error('Erro ao conectar com o banco: ' + erro);
    } else {
        console.log('Conexão com o banco OK');
    }
});

userSchema = new mongoose.Schema({
    username: {
        type: String,
        index: {
            unique: true
        }
    }, //Título do tipo String, e única
    password: String,
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// Define o Modelo
User = mongoose.model('User', userSchema);

userSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // Hash a senha usando novo salta
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // Substiui a senha para hash
            user.password = hash;
            next();
        });
    });
});

// Função para registrar novo usuário
function register(req, res, next) {
    var testUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    testUser.save(function (err) {
        if (err) throw err;
        next();
    });
}


User.find(function (err, res) {
    if (res != '') {
        firstAcess = false
    } else {
        firstAcess = true
    }
});

function verifyCredentials(username, password, done) {
    User.findOne({
        username: username
    }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {
                message: 'Usuário incorreto.'
            });
        }
        user.comparePassword(password, function (err, isMatch) {
            if (err) throw err;
            if (!isMatch) {
                return done(null, false, {
                    message: 'Senha incorreta.'
                });
            } else {
                return done(null, user);
            }
        });
    });
}

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


app.post('/login', passport.authenticate('local'), function (req, res) {
    res.redirect(req.session.returnTo || '/');
});

app.post('/signup', register, function (req, res) {
    firstAcess = false;
    res.redirect('/');
});

module.exports = app;