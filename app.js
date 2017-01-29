var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//BASE DE DATOS y MODELOS
require('./lib/connectMongoose');
require('./models/Anuncio');
require('./models/Usuario');


var index = require('./routes/index'); //rutas que quiero seguir
var users = require('./routes/users');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users); //?????

app.use('/apiv1/anuncios', index);
app.use('/apiv1/users', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {

    res.status(err.status || 500);

    if (req.originalUrl.indexOf('/api') === 0){ //llamada de API --> respondo JSON
        return res.json({success: false, error: err.message});
    }
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page

    res.render('error');
});

module.exports = app;
