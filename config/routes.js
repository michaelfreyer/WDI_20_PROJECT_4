var express = require('express');
var router  = express.Router();

var usersController = require('../controllers/usersController');
var commentsController = require('../controllers/commentsController');
var authenticationsController = require('../controllers/authenticationsController');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/')
  .get(usersController.usersIndex);

router.route('/users')
  .get(usersController.usersIndex);

router.route('/users/:id')
  .get(usersController.usersShow)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete);

router.route('/comments')
  .get(commentsController.commentsIndex)
  .post(commentsController.commentCreate);

router.route('/comments/:id')
  .get(commentsController.commentShow)
  .put(commentsController.commentUpdate)
  .delete(commentsController.commentDelete);


module.exports = router;
