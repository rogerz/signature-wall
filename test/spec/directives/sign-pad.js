'use strict';

describe('Directive: signPad', function () {

  // load the directive's module
  beforeEach(module('swallApp'));
  beforeEach(module('views/sign-pad-tpl.html'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should include a hidden preview pad', inject(function ($compile, $timeout) {
    element = angular.element('<sign-pad></sign-pad>');
    element = $compile(element)(scope);
    scope.$digest();
    $timeout.flush();
    expect(element.find('#sign-pad-preview').hasClass('ng-hide')).toBe(true);
  }));
});
