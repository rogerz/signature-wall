'use strict';

angular.module('swallApp')
  .directive('controlPanel', function () {

    function controller($scope) {
      var panels = [];
      var emptyTpl = 'views/empty-panel.html';

      $scope.panels = panels;
      $scope.template = emptyTpl;
      $scope.switchTo = function (index) {
        var panel = $scope.panels[index];
        $scope[panel.paramsAs] = panel.params;
        $scope.template = panel.template;
      };

      $scope.api.add = function (name, glyphicon, tpl, params, paramsAs) {
        $scope.panels.push({
          name: name,
          glyphicon: glyphicon || 'glyphicon-cog',
          template: tpl || emptyTpl,
          params: params || {},
          paramsAs: paramsAs || 'params'
        });
        if ($scope.template === emptyTpl) {
          $scope.switchTo(0);
        }
      };

    }

    return {
      scope: {api: '='},
      controller: ['$scope', controller],
      templateUrl: 'views/control-panel-tpl.html'
    };
  });
