'use strict';

angular.module('swallApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.controlPanel = {};// exported API from control panel
    $scope.postItWall = {};
  });
