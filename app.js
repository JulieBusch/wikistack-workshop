"use strict";
var express = require( 'express' );
var app = express();
var morgan = require("morgan");
var nunjucks = require("nunjucks");
var wikiRoutes = require('./routes/wiki');
var bodyParser = require("body-parser");
var models = require('./models');


app.engine('html', nunjucks.render);
//You have an html view engine, it is nunjucks
app.set('view engine', 'html');
//When you get an html file, use your view engine
nunjucks.configure('views', {noCache: true});
//When you look for a template, look in the views folder,
//and don't cache
app.use(morgan("tiny"));
//sets up a logger that gives you info on all requests
app.use(express.static(__dirname + '/public'));
//says that if a URI matches a path to a file within this folder
//that file will be returned- put this BEFORE the routes.
//Everything AFTER public or whatever dir you pick is what needs to match the URI
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
//sees if req is POST or PUT, sees if content is encoded,
//if so parses that information and puts it in req.body-
//for forms to add info to req. object for you to use in routes
app.use('/wiki', wikiRoutes);

models.User.sync({force: true})
.then(function () {
    return models.Page.sync({force: true})
})
.then(function () {
    app.listen(7599, function () {
        console.log('Server is listening on port 7599!');
    });
})
.catch(console.error);
