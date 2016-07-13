var Comment   = require('../models/comment');
var User      = require('../models/user');

function commentsIndex(req, res) {
  Comment.find(function(err, users){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ comments: users });
  });
}

function commentCreate(req, res){
  var comment = new Comment(req.body.comment);

    comment.save(function(err){
      if (err) return res.status(500).send(err);
      var id = req.body.comment.user

      User.findOne({ _id: id }, function(err, user){
         user.comments.push(comment);
         user.save();
      });
      res.status(201).send(comment)
    });
}

function commentShow(req, res){
  var id = req.params.id;

  Comment.findById({ _id: id }, function(err, comment) {
    if (err) return res.status(500).send(err);
    if (!comment) return res.status(404).send(err);
    res.status(200).send(comment);
  });
}


function commentUpdate(req, res){
  var id = req.params.id;

  Comment.findById({_id: id}, function(error, comment) {
    if(error) res.status(500).send({message: 'Could not find comment b/c:' + error});
    if (!comment) return res.status(404).send(err);

    if(req.body.comment.title) comment.title = req.body.comment.title;
    if(req.body.comment.description) comment.description = req.body.comment.description;
    if(req.body.comment.rating) comment.rating = req.body.comment.rating;

    console.log(req.body);

    comment.save(function(error) {
      if(error) res.json({messsage: 'Could not update comment b/c:' + error});

      res.status(200).send({message: 'Comment successfully updated', comment: comment});
    });
  });
}

function commentDelete(req, res){
  var id = req.params.id;

  Comment.remove({ _id: id }, function(err) {
    if (err) return res.status(500).send(err);
    res.status(204).send();
  });
}

module.exports = {
  commentsIndex: commentsIndex,
  commentCreate: commentCreate,
  commentShow:   commentShow,
  commentUpdate: commentUpdate,
  commentDelete: commentDelete 
};