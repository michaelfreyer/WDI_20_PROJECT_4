angular
  .module('logging', ['ngResource', 'angular-jwt', 'ui.router'])
  .constant('API', 'http://localhost:3000/api')
  .config(MainRouter)
  .config(function($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor');
    })

MainRouter.$inject = ['$stateProvider', '$urlRouterProvider','$locationProvider'];
function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
  // $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "./js/views/home.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "./js/views/authentications/login.html"
    })
    .state('register', {
      url: "/register",
      templateUrl: "./js/views/authentications/register.html"
    })
    .state('users', {
      url: "/users",
      templateUrl: "./js/views/users/index.html"
    })
    .state('comments', {
      url: "/comments",
      templateUrl: "./js/views/comments/index.html"
    })
    .state('user', {
      url: "/users/:id",
      templateUrl: "./js/views/users/show.html",
      controller: function($scope, $stateParams, User) {
        User.get({ id: $stateParams.id }, function(res){
          $scope.$parent.users.user = res.user;
        });
      }
    })
    .state('user-edit', {
      url: "/users/:id/edit",
      templateUrl: "./js/views/users/edit.html",
      controller: function($scope, $stateParams, User) {
        User.get({ id: $stateParams.id }, function(res){
          $scope.$parent.users.user = res.user;
        });
      }
    })
    .state('comment', {
      url: "/comments/:id/show",
      templateUrl: "./js/views/comments/show.html",
      controller: 'CommentsController as comments'
    })
    .state('comment-edit', {
      url: "/comments/:id/edit",
      templateUrl: "./js/views/comments/edit.html",
      controller: 'CommentsController as comments'
    })
    .state('comment-create', {
      url: "/comments/create",
      templateUrl: "./js/views/comments/create.html",
      controller: 'CommentsController as comments'
    });

  $urlRouterProvider.otherwise("/");
}
