'use strict';

angular.module('swallApp')
  .directive('controlPanel', function () {

    function controller($scope, ControlPanel) {
      var oldCtx;

      $scope.panels = ControlPanel.all();

      $scope.activate = function (index) {
        var activeOne = ControlPanel.activate(index),
            ctx = activeOne.ctx;

        $scope.template = activeOne.template;
        $scope.ctx = activeOne.ctx;
      }

      $scope.inactive = true;

      $scope.toggle = function () {
        $scope.inactive = !$scope.inactive;
      };
    }

    return {
      controller: ['$scope', 'ControlPanel', controller],
      templateUrl: 'views/control-panel-tpl.html'
    };
  });
