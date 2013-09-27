'use strict';

angular.module('swallApp')
  .factory('DataStore', function () {
    var signList = [];

    var generateId = (function () {
      var id = 0;
      return function () {
        var newId = id;
        id = id + 1;
        return newId;
      };
    })();

    function add(one) {
      if (one) {
        one.id = generateId();
        signList.unshift(one);
      }
    }

    function remove(index) {
      signList.splice(index, 1);
    }

    return {
      add: add,
      remove: remove,
      signList: signList
    };
  });
