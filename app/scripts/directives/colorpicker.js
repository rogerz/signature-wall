'use strict';

angular.module('swallApp')
  .directive('colorpicker', function () {
    return {
      require: '?ngModel',
      link: function (scope, elem, attrs, ngModel) {
        var opts = {
          chooseText: "✓",
          cancelText: "×"
        };

        if (!ngModel) {
          elem.spectrum(opts);
          return;
        }

        opts.change = function (color) {
          scope.$apply(function () {
            ngModel.$setViewValue(color.toName() || color.toHexString());
          });
        };

        elem.spectrum(opts);

        ngModel.$render = function () {
          elem.spectrum('set', ngModel.$viewValue || '#fff');
        };

      }
    };
  });
