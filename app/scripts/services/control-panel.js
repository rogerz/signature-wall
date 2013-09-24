'use strict';

angular.module('swallApp')
  .service('ControlPanel', function ControlPanel() {
    var panels = [],
    activeOne;

    function activate(index) {
      if (activeOne) {
        activeOne.active = false;
      }
      activeOne = panels[index];
      activeOne.active = true;
      return activeOne;
    }

    function add(name, icon, tpl, params, paramAs) {
      panels.push({
        name: name,
        iconClass: icon,
        template: tpl,
        params: params || {},
        paramAs: paramAs || 'params',
        active: false
      });
    }

    function all() {
      return panels;
    }

    return {
      all: all,
      add: add,
      activate: activate
    };
  });
