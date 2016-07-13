angular
  .module('logging')
  .factory('Comment', Comment);

Comment.$inject = ['$resource', 'API'];
function Comment($resource, API){

  return $resource(
    API+'/comments/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'update':    { method: 'PUT' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: false},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
    }
  );
}
