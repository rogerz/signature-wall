'use strict';

angular.module('swallApp')
  .directive('signPad', function ($window, $timeout, ControlPanel) {
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

      // control panel
      function Param(name, value, min, max, step, label) {
        this.name = name;
        this.value = value;
        this.min = min;
        this.max = max;
        this.step = step;
        this.label = label;
      }

      $scope.params = [
        new Param('min', 10, 5, 20, 1, 'width'),
        new Param('max', 15, 5, 20, 1, 'width'),
        new Param('red', 90, 0, 255, 1, 'red'),
        new Param('green', 90, 0, 255, 1, 'green'),
        new Param('blue', 90, 0, 255, 1, 'blue'),
        new Param('smooth', 70, 0, 100, 1, 'smooth')
      ];

      ControlPanel.add('sign pad', 'glyphicon-edit', 'views/sign-pad-panel.html',
                      {vals: $scope.vals, params: $scope.params});
    }

    return {
      controller: controller,
      scope: {},
      templateUrl: 'views/sign-pad-tpl.html',
      restrict: 'E',
      link: function (scope, elem) {
        var canvas = elem.find('canvas')[0];

        var delay = 300, q;

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

        scope.vals = {};

        function updateConfig() {
          var params = scope.params;
          var vals = scope.vals = {};
          for (var i = 0; i < params.length; i++) {
            var param = params[i];
            vals[param.name] = parseInt(param.value, 10);
          }
          if (vals.min > vals.max) {
            /* swap value */
            vals.max = vals.min + vals.max;
            vals.min = vals.max - vals.min;
            vals.max = vals.max - vals.min;
          }
          var opts = {
            minWidth: parseFloat(vals.min),
            maxWidth: parseFloat(vals.max),
            color: 'rgb(' + vals.red + ',' + vals.green + ',' + vals.blue + ')',
            velocityFilterWeight: 1 - vals.smooth / 100
          };
          signPad.config(opts);
        }

        for (var i in scope.params) {
          scope.$watch('params[' + i + '].value', updateConfig);
        }
      }
    };
  });
