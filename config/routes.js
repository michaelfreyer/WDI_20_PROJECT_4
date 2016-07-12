var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

var yelpController = require('../controllers/yelps');

router.route('/api/yelps')
    .get(yelpController.getAll)

    module.exports = router