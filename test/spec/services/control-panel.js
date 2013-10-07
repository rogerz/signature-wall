'use strict';

describe('Service: ControlPanel', function () {

  // load the service's module
  beforeEach(module('swallApp'));

  // instantiate service
  var ControlPanel;
  beforeEach(inject(function (_ControlPanel_) {
    ControlPanel = _ControlPanel_;
  }));

  it('should allow retriving all panels as an array', function () {
    expect(ControlPanel.all()).toEqual(jasmine.any(Array));
  });

  it('should allow adding panels', function () {
    ControlPanel.add('panel', 'glyphicon-ok', 'template', {});
    expect(ControlPanel.all().length).toBe(1);
  });

  it('should return activated panel', function () {
    ControlPanel.add('panel', 'glyphicon-ok', 'template', {});
    var panel = ControlPanel.activate(0);
    expect(panel).toEqual(jasmine.any(Object));
    expect(panel.active).toBe(true);
  });
});
