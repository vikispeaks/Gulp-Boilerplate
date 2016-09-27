(function() {

  $ctrl.inject =[];

  function $ctrl(){
    var _this = this;
    _this.title = 'gulp-boilerplate';
  }

  angular
    .module('app.controllers', [
    ])
    .controller('appController', $ctrl);
})();
