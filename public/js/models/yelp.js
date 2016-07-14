angular
  .module('logging')
  .factory('Yelp', Yelp);

  Yelp.$inject = ['$resource', 'API'];
  function Yelp($resource, API){

    return $resource(
      API+'/yelps/:id', {id: '@id'},
      { 
        'query': {method:'GET', isArray:true}
      }
    );
  }