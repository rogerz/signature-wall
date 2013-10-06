'use strict';

angular.module('swallApp')
  .directive('controlPanel', function () {

    function controller($scope, ControlPanel) {
      $scope.panels = ControlPanel.all();

      $scope.activate = function (index) {
        var activeOne = ControlPanel.activate(index);

        $scope.template = activeOne.template;
        $scope.ctx = activeOne.ctx;
      };

      $scope.inactive = true;

      $scope.toggle = function () {
        $scope.inactive = !$scope.inactive;
      };
    }

    return {
      restrict: 'E',
      controller: ['$scope', 'ControlPanel', controller],
      templateUrl: 'views/control-panel-tpl.html'
    };
  });
