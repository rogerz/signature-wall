'use strict';

describe('Directive: controlPanel', function () {

  // load the directive's module
  beforeEach(module('swallApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<control-panel></control-panel>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the controlPanel directive');
  }));
});
