angular
  .module('logging')
  .controller('YelpsController', YelpsController);

YelpsController.$inject = ['Yelp','$state', 'NgMap'];
function YelpsController(Yelp, $state, NgMap){

  var self          = this;

  self.name         = "YelpsController";

  self.searchFor    = searchFor;
  self.getYelpData  = getYelpData;
  self.yelpQuery    = yelpQuery;
  self.showDetail   = showDetail;
  self.hideDetail   = hideDetail;
  self.shops        = [];
  self.search       = {
                        term: ''
                      }


  function showDetail (shop) {
    console.log("You clicked: showDetail")
    console.log(shop)
    self.shop = shop;
    self.map.showInfoWindow('foo-iw', shop.id);
  };

  function hideDetail () {
    Yelp.map.hideInfoWindow('foo-iw');
  };

  function searchFor(){
    self.yelpQuery(self.search.term)
  }

  function getYelpData(data){
    console.log("You ran API QUERY FOR YELP: " + data)
  }


  function yelpQuery (term){
    Yelp.query({search: term}, function(response) { 
        self.all = response;
        console.log("Yup ~~~ THERE WAS A QUERY!");

        self.shops = [];

        for (i = 0; i < self.all.length; i++) {
             console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
             console.log('YELP-ID'+': '+self.all[i].id);
             console.log(i+': '+self.all[i].name);
             console.log('Rating'+': '+self.all[i].rating);
             console.log('Snippet'+': '+self.all[i].snippet_text);
             console.log('IMG/SML'+': '+self.all[i].snippet_image_url);
             console.log('Phone'+': '+self.all[i].phone);
             console.log('IMG/BIG'+': '+self.all[i].image_url);
             console.log('ADDRESS'+': '+self.all[i].location.display_address);
             console.log('LAT'+': '+self.all[i].location.coordinate.latitude);
             console.log('LONG'+': '+self.all[i].location.coordinate.longitude);

              self.tempObj = {id: self.all[i].id, name: self.all[i].name, position: [self.all[i].location.coordinate.latitude, self.all[i].location.coordinate.longitude]};

             self.shops.push(self.tempObj);
         }
    });
  }


}