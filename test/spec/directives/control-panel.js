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

  it('should have a toggle button', inject(function () {
    var toggle = element.find('#sb-hot-zone li a');
    expect(toggle.length).toBe(1);
  }));
});
