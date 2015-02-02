// Default modules
var express = require('express');
var path = require('path');
var routes = require('./routes');
var app = express();

// Default configuration
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');
app.use(express.favicon(path.join(__dirname, '../public/favicon.ico')));
app.use(express.logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.methodOverride('_method'));
app.use(express.cookieParser('template'));
app.use(app.router);
app.use(express.static(path.join(__dirname, '../public')));
app.locals.pretty = false;

// Development configuration
if ('development' === app.get('env')) {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
  app.locals.pretty = true;
}

// Routes
app.get('/', routes['index']);
app.get('/index.html', routes['index']);
app.get('/sitemap.html', routes['sitemap']);

// Initialization
app.listen(app.get('port'), function() {
  console.log('Frontend template is running on port ' + app.get('port'));
});
