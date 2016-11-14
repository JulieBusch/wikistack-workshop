var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
	logging: false
});

var Page = db.define('page', {
    title: {
        type: db.STRING, 
        allowNull: false,
        defaultValue: 'title'
    },
    urlTitle: {
        type: db.STRING,
        isUrl: true,  
        allowNull: false,
        defaultValue: 'url-title'
    },
    content: {
        type: db.TEXT,
        allowNull: false,
        defaultValue: 'content'
    },
    status: {
        type: db.ENUM('open', 'closed')
    },
    date: {
        type: db.DATE,
        defaultValue: db.NOW
    }
	}, {
	getterMethods : {
		route: function() {return '/wiki/' + this.urlTitle}
	}
});

var User = db.define('user', {
    name: {
        type: db.STRING,
        allowNull: false,
        defaultValue: 'name'
    },
    email: {
        type: db.STRING,
        isEmail: true,
        allowNull: false,
        defaultValue: 'email@website.com'
    }
},{});

module.exports = {
  Page: Page,
  User: User
};
