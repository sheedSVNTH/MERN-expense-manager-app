
var express = require('express');
var router = require('./routes/routes.js')
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

//var mongoose = require('./models/Expense.js')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

mongoose.connect('mongodb://expenseU:expenseP1@ds137149.mlab.com:37149/expenses', { useNewUrlParser: true });
//Source link from Mlab
//mongodb://<dbuser>:<dbpassword>@ds137149.mlab.com:37149/expenses

app.use('/', router);

module.exports = app;

//	"start": "react-scripts start",
//    "build": "react-scripts build",
//    "test": "react-scripts test --env=jsdom",
//    "eject": "react-scripts eject"