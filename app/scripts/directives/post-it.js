'use strict';

angular.module('swallApp')
  .directive('postItWall', function () {
    var postIt;

    function controller($scope) {
      var generateId = (function () {
        var id = 0;
        return function () {
          var newId = id;
          id = id + 1;
          return newId;
        };
      })();

      function submit() {
        var src = postIt.newOne.src.trim();
        if (src.length) {
          postIt.add({
            src: src
          });
        }
      }

      function remove(index) {
        postIt.list.splice(index, 1);
      }

      function add(one) {
        one.id = generateId();
        one.style = $scope.api.genStyle(one.id);
        postIt.list.push(one);
      }

      postIt = {
        newOne: {},
        list: [],
        submit: submit,
        remove: remove,
        add: add
      };

      $scope.postIt = postIt;
      $scope.cp.add('post it', 'glyphicon-th', 'views/post-it-panel.html',
                    postIt, 'postIt');
    }

    function postLink(scope, element, attrs) {

      var gridPos = (function (rows, cols) {
        var slots = [],
        i, j;
        for (i = 0; i < rows; i++) {
          for (j = 0; j < cols; j++) {
            slots.push({
              top: i / rows * 100 + '%',
              left: j / cols * 100 + '%',
              width: 1 / cols * 100 + '%',
              height: 1 / rows * 100 + '%'
            });
          }
        }

        //+ Jonas Raoni Soares Silva
        //@ http://jsfromhell.com/array/shuffle [v1.0]
        function shuffle(o) { //v1.0
          for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) {}
          return o;
        }

        slots = shuffle(slots);

        return function (index) {
          return slots[index % (rows * cols)];
        };
      })(attrs.rows, attrs.cols);

      function genStyle(id) {
        return gridPos(id);
      }

        // calculate maximum post-it allowed
      var capacity = attrs.capacity || 1.0;
      if (capacity[capacity.length - 1] === '%') {
        capacity = capacity.substr(0, capacity.length - 1) / 100;
      }

      scope.opts = {
        capacity: capacity,
        rows: attrs.rows,
        cols: attrs.cols
      };

      scope.api.genStyle = genStyle;
    }

    return {
      scope: {cp: '=', api: '='},
      controller: controller,
      restrict: 'E',
      link: postLink
    };
  })
  .animation('.post-it-item', function () {

    function enter(element, done) {
      /* global jQuery:false */
      var scope = angular.element(element).scope();
      var styles = scope.api.genStyles(jQuery(element).attr('post-it-id'));
      jQuery(element).css({
        opacity: 0,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
      });
      jQuery(element).animate({
        opacity: 1,
        top: styles.top,
        left: styles.left,
        width: styles.width,
        height: styles.height
      }, done);
      return function (cancelled) {
        if (cancelled) {
          jQuery(element).stop();
        }
      };
    }

    function leave(element, done) {
      jQuery(element).animate({
        opacity: 0
      }, done);
    }

    return {
      enter: enter,
      leave: leave
    };
  });
