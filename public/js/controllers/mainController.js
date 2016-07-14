angular
  .module('logging')
  .controller("mainController", mainCtrl)

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


mainCtrl.$inject = ['NgMap', '$resource' , 'Yelp', '$scope', '$uibModal', '$log', 'CurrentUser','Comment', '$state']
function mainCtrl(NgMap, $resource, Yelp,$scope, $uibModal, $log, CurrentUser, Comment, $state){

  var vm = this;



  $scope.save = function(word) {
     $scope.hello(word);
   }


  vm.shops = [];
  vm.sortedShops =[];
  vm.search ={
     term: ''
   }

  // need a search bind
  vm.searchFor = function(){
    console.log(vm.search.term)
    vm.yelpQuery(vm.search.term)
  }

  // turn query to function with 
  vm.yelpQuery = function(term){

    Yelp.query({search: term}, function(response) { 
        vm.all = response;
        console.log("Yup ~~~ THERE WAS A QUERY!");

        vm.shops = [];

        for (i = 0; i < vm.all.length; i++) {
             console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
             console.log('YELP-ID'+': '+vm.all[i].id);
             console.log(i+': '+vm.all[i].name);
             console.log('Rating'+': '+vm.all[i].rating);
             console.log('Snippet'+': '+vm.all[i].snippet_text);
             console.log('IMG/SML'+': '+vm.all[i].snippet_image_url);
             console.log('Phone'+': '+vm.all[i].phone);
             console.log('IMG/BIG'+': '+vm.all[i].image_url);
             console.log('ADDRESS'+': '+vm.all[i].location.display_address);
             console.log('LAT'+': '+vm.all[i].location.coordinate.latitude);
             console.log('LONG'+': '+vm.all[i].location.coordinate.longitude);

             vm.tempObj = {
                               id: vm.all[i].id, 
                               name: vm.all[i].name, 
                               position: [vm.all[i].location.coordinate.latitude, vm.all[i].location.coordinate.longitude], 

                               address: vm.all[i].location.display_address.join(" "), 
                               snippet: vm.all[i].snippet_text, 
                               rating: vm.all[i].rating, 
                               phone: vm.all[i].phone, 
                               img: vm.all[i].image_url
                           };

             vm.shops.push(vm.tempObj);
         }
    });

  }

  vm.getYelpData = function(data){
    console.log("You ran API QUERY FOR YELP: " + data)
  }

  vm.sortYelpData = function(data){

  }

  NgMap.getMap().then(function(map){
    console.log('map', map);
    vm.map = map;
  });

  vm.clicked = function() {
      alert('Clicked a link inside infoWindow');
    };

    vm.showDetail = function(e, shop) {
      vm.shop = shop;
      vm.map.showInfoWindow('foo-iw', shop.id);
      CurrentUser.id = shop.id
      self.sortedComments() 
      
      vm.sortedShops = CurrentUser.sorted 
      
      console.log("THis is from show detail");
      console.log(CurrentUser.id) 
      console.log(vm.sortedShops)

    };

    vm.hideDetail = function() {
      vm.map.hideInfoWindow('foo-iw');
    };


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ COMMENTS CONTROLLER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~???? 

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
    // console.log(CurrentUser.sorted);
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