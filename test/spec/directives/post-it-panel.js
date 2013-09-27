'use strict';

describe('Directive: postItPanel', function () {

  // load the directive's module
  beforeEach(module('swallApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<post-it-panel></post-it-panel>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('');
  }));
});
