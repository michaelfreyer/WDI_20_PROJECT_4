angular
  .module('logging')
  .controller("mainController", mainCtrl)


mainCtrl.$inject = ['NgMap', '$resource' , 'Yelp']
function mainCtrl(NgMap, $resource, Yelp){

  var vm = this;
  vm.shops = [];
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
    };

    vm.hideDetail = function() {
      vm.map.hideInfoWindow('foo-iw');
    };
}