angular
  .module('logging')
  .factory('User', User);

User.$inject = ['$resource', 'API'];
function User($resource, API){

  return $resource(
    API+'/users/:id', {id: '@_id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST'},
      'update':    {method: 'PUT'},
      'query':     { method: 'GET', isArray: false},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
      'register': {
          url: API +'/register',
          method: "POST"
        },
        'login':      {
          url: API + '/login',
          method: "POST"
        }
    }
  );
}
