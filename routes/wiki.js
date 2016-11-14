"use strict";
const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next){
  Page.findAll()
  .then(function(pagesArray){
    res.render('index', {pages: pagesArray});})
  .catch(next);
});

router.post('/', function(req, res, next){
  //res.json(req.body);
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });
  page.save().then(function(newPage){
    res.redirect(newPage.route);
  });
});

router.get('/add', function(req, res, next){
  res.render('addpage.html');
});

router.get('/:articleName', function(req, res, next){
  //res.send('You did it!');
  Page.findOne({
    where: {
      urlTitle: req.params.articleName
    }})
  .then(function(soughtPage){
    res.render('wikipage', {page: soughtPage});})
  .catch(next);
});

module.exports = router;
