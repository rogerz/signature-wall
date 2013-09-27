'use strict';

describe('Service: ControlPanel', function () {

  // load the service's module
  beforeEach(module('swallApp'));

  // instantiate service
  var ControlPanel;
  beforeEach(inject(function (_ControlPanel_) {
    ControlPanel = _ControlPanel_;
  }));

  it('should do something', function () {
    expect(!!ControlPanel).toBe(true);
  });

});
