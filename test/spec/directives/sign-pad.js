'use strict';

describe('Directive: signPad', function () {

  // load the directive's module
  beforeEach(module('swallApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sign-pad></sign-pad>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the signPad directive');
  }));
});
