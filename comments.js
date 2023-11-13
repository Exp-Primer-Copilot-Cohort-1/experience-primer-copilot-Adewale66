// create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// set up handlebars view engine
var handlebars = require('express-handlebars')
 .create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// set up mongo db
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.set('port', process.env.PORT || 3000);

// set up static file
app.use(express.static(__dirname + '/public'));

// set up routes
app.get('/', function(req, res) {
 res.render('home');
});

app.get('/about', function(req, res) {
 res.render('about');
});

app.get('/contact', function(req, res) {
 res.render('contact');
});

app.get('/thankyou', function(req, res) {
 res.render('thankyou');
});

app.post('/contact', urlencodedParser, function(req, res) {
 console.log(req.body);
 MongoClient.connect(url, function(err, db) {
 if (err) throw err;
 var dbo = db.db("contact");
 var myobj = { name: req.body.name, email: req.body.email, subject: req.body.subject, message: req.body.message };
 dbo.collection("contact").insertOne(myobj, function(err, res) {
 if (err) throw err;
 console.log("1 document inserted");
 db.close();
 });
 });
 res.render('thankyou', { contact: req.body });
});

// custom 404 page
app.use(function(req, res) {
 res.status(404);
 res.render('404');
});

// custom 500 page
app.use(function(err, req, res, next) {
 console.error(err.stack);
 res.status(500);
 res.render('500');
});

app.listen(app.get('port'), function() {
 console.log('Express started on http://localhost:' +
app.get('port') + '; press Ctrl-C to terminate.');
});