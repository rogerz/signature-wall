'use strict';

angular.module('swallApp')
  .factory('DataStore', function () {
    // TODO: use $resource
    var signList = [];

    function add(one) {
      if (one) {
        signList.unshift(one);
      }
    }

    return {
      add: add,
      signList: signList
    };
  });
