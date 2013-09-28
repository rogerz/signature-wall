'use strict';

angular.module('swallApp')
  .directive('colorpicker', function () {
    return {
      require: '?ngModel',
      link: function (scope, elem, attrs, ngModel) {
        elem.spectrum();
        if (!ngModel) return;
        ngModel.$render = function () {
          elem.spectrum('set', ngModel.$viewValue || '#fff');
        };
        elem.on('change', function () {
          scope.$apply(function () {
            var t = elem.spectrum('get');
            ngModel.$setViewValue(t.toName() || t.toHexString());
          });
        });
      }
    };
  });
