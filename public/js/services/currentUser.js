angular
  .module('logging')
  .service("CurrentUser", CurrentUser);

CurrentUser.$inject = ["TokenService"];
function CurrentUser(TokenService){
    var self = this;
    self.getUser = getUser;
    self.clearUser = clearUser;
    self.user = getUser();
    self.id   = null;
    self.sorted = [];

    function getUser() {
        return self.user ? self.user : TokenService.decodeToken();
    }

    function clearUser(){
      TokenService.removeToken();
      self.user = null;
    }
}