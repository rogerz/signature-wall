'use strict';

angular.module('swallApp')
  .directive('controlPanel', function () {

    function controller($scope, ControlPanel) {
      var oldParam;

      $scope.panels = ControlPanel.all();

      $scope.activate = function (index) {
        var activeOne = ControlPanel.activate(index);

        $scope.template = activeOne.template;
        $scope[activeOne.paramAs] = activeOne.params;

        if (oldParam !== activeOne.paramAs) {
          delete $scope[oldParam];
          oldParam = activeOne.paramAs;
        }
      };

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
