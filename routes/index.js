var express = require('express'),
	router = express.Router(),
	contentObj = require('./content');

router.get('/', function(req, res) {
	res.render('landing');
});

router.get('/approach', function(req, res) {
	res.render('approach');
});

router.get('/return-on-investment', function(req, res) {
	res.render('returninvest');
});

router.get('/services', function(req, res) {
	res.render('services');
});

router.get('/about-us', function(req, res) {
	res.render('about', { content: contentObj.about });
});

module.exports = router;
