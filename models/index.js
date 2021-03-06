var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
	logging: false
});

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'title'
    },
    urlTitle: {
        type: Sequelize.STRING,
        isUrl: true,
        allowNull: false
        //defaultValue: 'url-title'
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: 'content'
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
	}, {
	hooks : {
		beforeValidate: function(pageInstance){
			if (pageInstance.title) {pageInstance.urlTitle = pageInstance.title.replace(/\s+/g, "_").replace(/\W/g, "")}
			else {
				pageInstance.title = Math.random().toString(36).substring(2, 7)
				pageInstance.urlTitle = pageInstance.title.replace(/\s+/g, "_").replace(/\W/g, "")
				}
			}
		},
	getterMethods : {
		route: function() {return '/wiki/' + this.urlTitle}
	}
});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'name'
    },
    email: {
        type: Sequelize.STRING,
        isEmail: true,
        allowNull: false,
        defaultValue: 'email@website.com'
    }
},{});

module.exports = {
  Page: Page,
  User: User
};
