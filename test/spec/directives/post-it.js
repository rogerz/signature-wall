'use strict';

describe('Directive: postItWall', function () {

  // load the directive's module
  beforeEach(module('swallApp'));
  beforeEach(module('views/post-it-wall-tpl.html'));
  var element,
    scope;

  beforeEach(inject(function ($rootScope, $compile) {
    element = angular.element('<post-it-wall></post-it-wall>');
    scope = $rootScope.$new();
    element = $compile(element)(scope);
    scope.$digest();
  }));

  it('should include post-it', inject(function () {
    expect(scope.postIt).toBeDefined();
  }));
});
