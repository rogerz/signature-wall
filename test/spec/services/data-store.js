'use strict';

describe('Service: DataStore', function () {

  // load the service's module
  beforeEach(module('swallApp'));

  // instantiate service
  var DataStore;
  beforeEach(inject(function (_DataStore_) {
    DataStore = _DataStore_;
  }));

  it('should hold a list of sign', function () {
    expect(DataStore.signList).toEqual(jasmine.any(Array));
  });
  it('should add/remove signature', function () {
    DataStore.add({});
    expect(DataStore.signList.length).toBe(1);
    DataStore.remove(0);
    expect(DataStore.signList.length).toBe(0);
  });
  it('should generate id', function () {
    DataStore.add({});
    expect(DataStore.signList[0].id).toBeDefined();
  });
});
