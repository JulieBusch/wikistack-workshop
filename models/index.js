var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page = Sequelize.define('page', {
  title: Sequelize.STRING,
  urlTitle: Sequelize.STRING,
  content: Sequelize.TEXT,
  status: Sequelize.STRING
});

var User = Sequelize.define('page', {
  name: Sequelize.STRING,
  email: Sequelize.STRING
});
