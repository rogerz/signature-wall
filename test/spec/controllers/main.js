'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('swallApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
    spyOn(scope, '$broadcast');
  }));

  it('should emit start', function () {
    expect(scope.start).toEqual(jasmine.any(Function));
    scope.start();
    expect(scope.started).toBe(true);
    expect(scope.$broadcast).toHaveBeenCalledWith('start');
  });
});
