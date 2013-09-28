'use strict';

describe('Directive: colorpicker', function () {

  // load the directive's module
  beforeEach(module('swallApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<input colorpicker></input>');
    element = $compile(element)(scope);
    expect(element.spectrum).toBeDefined();
  }));
});