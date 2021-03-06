'use strict';

angular.module('swallApp')
  .directive('signPad', ['$window', '$timeout', 'ControlPanel', function ($window, $timeout, ControlPanel) {
    function controller($scope, DataStore) {
      // preview
      $scope.preview = {};

      $scope.submit = function (one) {
        DataStore.add(one);
      };

      $scope.preview.update = function (data) {
        $scope.preview.src = data;
      };

      $scope.preview.confirm = function () {
        $scope.submit({
          src: $scope.preview.src
        });
        $scope.preview.hide();
        $scope.clearPad();
      };

      $scope.preview.show = function () {
        $scope.preview.display = true;
      };

      $scope.preview.hide = function () {
        $scope.preview.display = false;
      };

      $scope.opts = {
        color: 'red',
        size: 15
      };
      ControlPanel.add('sign pad', 'glyphicon-edit', 'views/sign-pad-panel.html',
                      {opts: $scope.opts});
    }

    return {
      controller: ['$scope', 'DataStore', controller],
      scope: {},
      templateUrl: 'views/sign-pad-tpl.html',
      restrict: 'E',
      link: function (scope, elem) {
        var canvas = elem.find('canvas')[0];

        var delay = 1000, q;

        var startFn = function () {
          $timeout.cancel(q);
          scope.$apply(function () {
            scope.preview.hide();
          });
        };

        var endFn = function () {
          $timeout.cancel(q);
          q = $timeout(function () {
            scope.updatePreview();
            scope.preview.show();
          }, delay);
        };

        /* global SignaturePad:false */
        var signPad = new SignaturePad(canvas, {
          startFn: startFn,
          endFn: endFn
        });

        // https://github.com/szimek/signature_pad/blob/gh-pages/js/app.js
        //
        // Adjust canvas coordinate space taking into account pixel ratio,
        // to make it look crisp on mobile devices.
        // This also causes canvas to be cleared.
        function resizeCanvas() {
          var ratio =  $window.devicePixelRatio || 1;
          canvas.width = canvas.offsetWidth * ratio;
          canvas.height = canvas.offsetHeight * ratio;
          canvas.getContext('2d').scale(ratio, ratio);
        }

        $window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        scope.updatePreview = function () {
          scope.preview.update(signPad.toDataURL());
        };

        scope.clearPad = function () {
          signPad.clear();
        };

        scope.$watchCollection('opts', function () {
          signPad.config({
            minWidth: parseFloat(scope.opts.size),
            maxWidth: parseFloat(scope.opts.size),
            color: scope.opts.color
          });
        });
      }
    };
  }]);
