'use strict';

describe('Directive: postIt', function () {

  // load the directive's module
  beforeEach(module('swallApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<post-it></post-it>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('');
  }));
});
