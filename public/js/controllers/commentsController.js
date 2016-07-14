angular
  .module('logging')
  .controller('CommentsController', CommentsController);

CommentsController.$inject = ['Comment', '$state'];
function CommentsController(Comment, $state){

  var self = this;

  self.all             = [];
  self.error           = null;
  self.getComments     = getComments;
  self.deleteComment   = deleteComment;
  self.updateComment   = updateComment;
  self.createComment   = createComment;
  self.comment         = null;

  // ~~~~~~~~~~~~~~~~~COMMENTS-INDEX~~~~~~~~~~~~~

  function getComments() {
    Comment.query(function(data){
      self.all = data.comments;
    });
  }

  // ~~~~~~~~~~~~~~~~~~DELETE~~~~~~~~~~~~~~~~~~~~~

  function deleteComment(comment) {
      Comment.remove({id: comment._id}, function(response){
        self.getComments();
        $state.go('comments');
      });
  }

  // ~~~~~~~~~~~~~~~~~EDIT~~~~~~~~~~~~~~~~~~~~~~~~

  function updateComment() {
   console.log("Update this shit")
   console.log(self.comment)
  
   Comment.update({id: self.comment._id, comment: self.comment}, function(response){
      self.getComments();
      console.log(response);
      self.comment = null;
      $state.go('comments');
   });
  }

  // ~~~~~~~~~~~~~~~~~~CREATE~~~~~~~~~~~~~~~~~~~~

  function createComment(user){
    console.log("You Cliked Create Comment");
    self.comment.user = user
    console.log(self.comment)
    Comment.save(self.comment)
    self.comment = null;
    $state.go('comments');

  }


  self.getComments();

  if($state.params.id) {
   Comment.get({ id: $state.params.id }, function(comment) {
     self.comment = comment; 

   });
 }
  
}
