angular
  .module('logging')
  .controller('CommentsController', CommentsController)
  .controller('ModalInstanceCtrl', ModalInstanceCtrl);

CommentsController.$inject = ['Comment', '$state','CurrentUser', '$scope', '$uibModal', '$log'];
function CommentsController(Comment, $state, CurrentUser, $scope, $uibModal, $log){


  var self = this;
  self.name  = "CommentsController"

  self.all             = [];
  self.sortedAll       = [];
  self.error           = null;
  self.getComments     = getComments;
  self.deleteComment   = deleteComment;
  self.updateComment   = updateComment;
  self.createComment   = createComment;
  self.sortedComments  = sortedComments;
  self.comment         = null;
  self.passId          = passId
  $scope.tempID          = null;


  function passId (data){
    console.log("PassId: ")
    console.log(data)
  }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ the modal stuff

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

      

      $scope.tempID = size;
      CurrentUser.id = size;
      console.log($scope.tempID)

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };


    // ~~~~~~~~~~~~~~~

  // ~~~~~~~~~~~~~~~~~~ THE END OF MODAL STUFF ~~~~~~~~~~~~~~


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  function sortedComments(){
    self.sortedAll = [];
    console.log("You ran sorted Comments");
    for (var i = 0; i < self.all.length; i++) {
            if (self.all[i]["yelpID"] === CurrentUser.id) {
                self.sortedAll.push(self.all[i]);
            }
        }
    CurrentUser.sorted = self.sortedAll;
    console.log(CurrentUser.sorted);
  }


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

  function createComment(id){
    console.log(CurrentUser.id);
    if (self.comment){
      self.comment.user = CurrentUser.getUser()._id;
      self.comment.yelpID = CurrentUser.id;
      console.log("This is from Create Comment")
      console.log(self.comment)

      console.log(self.comment)
      Comment.save(self.comment)

      // $state.go('comments');
      self.comment = null;


    }
    

  }


  self.getComments();

  if($state.params.id) {
   Comment.get({ id: $state.params.id }, function(comment) {
     self.comment = comment; 

   });
 }
  
}


ModalInstanceCtrl.$inject = ['$scope', '$uibModalInstance', 'items'];
function ModalInstanceCtrl($scope, $uibModalInstance, items){

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
};
