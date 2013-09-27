'use strict';

describe('Directive: controlPanel', function () {

  // load the directive's module
  beforeEach(module('swallApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should allow toggling inactive status', inject(function ($compile) {
    element = angular.element('<control-panel></control-panel>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('');
  }));
});
