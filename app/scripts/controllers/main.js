'use strict';

angular.module('swallApp')
.controller('MainCtrl', [
  '$scope',
  function ($scope) {
    $scope.options = {
      videoInBg: true
    };
    $scope.start = function () {
      $scope.started = true;
      $scope.$broadcast('start');
    };
  }
]);
