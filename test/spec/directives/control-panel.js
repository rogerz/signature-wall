'use strict';

describe('Directive: controlPanel', function () {

  // load the directive's module
  beforeEach(module('swallApp'));
  beforeEach(module('views/control-panel-tpl.html'));
  var element,
    scope;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();
    element = angular.element('<control-panel></control-panel');
    $compile(element)(scope);
    scope.$digest();
  }));

  it('should toggle inactive on click', inject(function ($timeout) {
    expect(scope.inactive).toBe(true);
    var toggle = element.find('#sb-toggle')
      , sideBar = element.find('#side-bar');
    expect(toggle.length).toBe(1);
    expect(sideBar.length).toBe(1);
    toggle.click();
    $timeout.flush();
    expect(sideBar.hasClass('inactive')).toBe(false);
    toggle.click();
    $timeout.flush();
    expect(sideBar.hasClass('inactive')).toBe(true);
  }));
});
