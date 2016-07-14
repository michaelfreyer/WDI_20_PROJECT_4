angular
  .module('logging')
  .controller('NgMapsController', NgMapsController);

NgMapsController.$inject = ['NgMap'];
function NgMapsController(NgMap){

  NgMap.getMap().then(function(map){
      console.log('map', map);
      self.map = map;
    });

}



// mainCtrl.$inject = ['NgMap', '$resource' , 'Yelp']
// function mainCtrl(NgMap, $resource, Yelp){

//   var self = this;
//   self.shops = [];
//   self.search ={
//      term: ''
//    }

//   NgMap.getMap().then(function(map){
//     console.log('map', map);
//     self.map = map;
//   });

//   self.clicked = function() {
//       alert('Clicked a link inside infoWindow');
//     };

//     self.showDetail = function(e, shop) {
//       self.shop = shop;
//       self.map.showInfoWindow('foo-iw', shop.id);
//     };

//     self.hideDetail = function() {
//       self.map.hideInfoWindow('foo-iw');
//     };
// }