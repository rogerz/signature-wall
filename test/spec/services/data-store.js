'use strict';

describe('Service: DataStore', function () {

  // load the service's module
  beforeEach(module('SwallApp'));

  // instantiate service
  var DataStore;
  beforeEach(inject(function (_DataStore_) {
    DataStore = _DataStore_;
  }));

  it('should do something', function () {
    expect(!!DataStore).toBe(true);
  });

});
