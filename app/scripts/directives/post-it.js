'use strict';

angular.module('swallApp')
  .directive('postItWall', function () {
    var postIt;

    function controller($scope, ControlPanel, DataStore) {
      // configurable optiosn
      var opts = $scope.opts  = {
        cols: 16,
        rows: 9,
        percent: 25
      };

      $scope.$watchCollection('opts', function () {
        $scope.limit = opts.rows * opts.cols * opts.percent / 100;
        $scope.genStyle = gridPosFn(opts.rows, opts.cols);
      });

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
      };


      // post-it list manipulation

      function remove(index) {
        DataStore.remove(index);
      }

      function add(one) {
        DataStore.add(one);
      }

      postIt = {
        list: DataStore.signList,
        remove: remove,
        add: add,
        opts: $scope.opts
      };

      $scope.postIt = postIt;
      ControlPanel.add('post it', 'glyphicon-th', 'views/post-it-panel.html',
                    postIt);
    }

    return {
      controller: ['$scope', 'ControlPanel', 'DataStore', controller],
      restrict: 'E',
      templateUrl: 'views/post-it-wall-tpl.html'
    };
  })
  .animation('.post-it-item', function () {

    function enter(element, done) {
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
