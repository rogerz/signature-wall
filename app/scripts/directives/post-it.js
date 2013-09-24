'use strict';

angular.module('swallApp')
  .directive('postItWall', function () {
    var postIt;

    function controller($scope, ControlPanel) {
      // configurable optiosn
      var opts = $scope.opts  = {
        rows: 4,
        cols: 4,
        capacity: 0.25
      };

      // generate styles from post-it ID
      var gridPosFn = function (rows, cols) {
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
      }

      var genStyle = $scope.genStyle = gridPosFn(opts.rows, opts.cols);

      // post-it list manipulation
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
        var length = postIt.list.length,
            max = opts.rows * opts.cols * opts.capacity;

        one.id = generateId();
        one.style = $scope.genStyle(one.id);
        if (length >= max) {
          postIt.list.splice(max - 1, length - max + 1);
        }
        postIt.list.unshift(one);
      }

      postIt = {
        newOne: {src: 'http://china.nba.com/media/teamLogos/medium/BKN.png'},
        list: [],
        submit: submit,
        remove: remove,
        add: add,
        opts: $scope.opts
      };

      $scope.postIt = postIt;
      ControlPanel.add('post it', 'glyphicon-th', 'views/post-it-panel.html',
                    postIt, 'postIt');
    }

    return {
      controller: controller,
      restrict: 'E',
      templateUrl: 'views/post-it-wall-tpl.html'
    };
  })
  .animation('.post-it-item', function () {

    function enter(element, done) {
      /* global jQuery:false */
      var scope = element.scope();
      var styles = scope.genStyle(element.attr('post-it-id'));
      element.css({
        opacity: 0,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
      });
      element.animate({
        opacity: 1,
        top: styles.top,
        left: styles.left,
        width: styles.width,
        height: styles.height
      }, done);
      return function (cancelled) {
        if (cancelled) {
          element.stop();
        }
      };
    }

    function leave(element, done) {
      element.animate({
        opacity: 0
      }, done);
    }

    return {
      enter: enter,
      leave: leave
    };
  });
