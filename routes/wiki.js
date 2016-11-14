"use strict";
const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next){
  res.redirect('/');
});

router.post('/', function(req, res, next){
  //res.json(req.body);
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });
  res.json(page.save());
});

router.get('/add', function(req, res, next){
  res.render('addpage.html');
});

module.exports = router;
