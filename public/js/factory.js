angular.module('beerAPP')
        .factory('Yelp', function ($resource) {

          var Yelp = $resource('http://localhost:3000/api/yelps/:id', {id: '@_id'}, {
             'query': {method:'GET', isArray:true},

          });

          return Yelp;
          
        });