var express = require("express"),
	bodyParser = require("body-parser"),
	$ = require("jquery"),
	pg = require('pg');
var app = express();

pg.defaults.ssl = true;

pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});	

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get("/", function(req, res) {
	res.render("index");
});

app.get("/cases", function(req, res) {
	res.render("users/sessions/new")
});

app.listen(3000, function() {
	console.log("Server is listening!!!");
});
