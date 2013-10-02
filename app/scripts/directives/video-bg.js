'use strict';

angular.module('swallApp')
  .directive('videoBg', ['$window', 'ControlPanel', function ($window, ControlPanel) {
    return {
      templateUrl: 'views/video-bg-tpl.html',
      restrict: 'E',
      scope: {},
      link: function postLink(scope, element) {
        var video = element.find('video');
        var opts = {
          poster: 'http://video-js.zencoder.com/oceans-clip.png',
          src: 'http://video-js.zencoder.com/oceans-clip.mp4',
          loop: true,
          controls: true,
          bgColor: 'black',
          bg: false
        };

        function resizeVideo () {
          video.attr('width', $window.innerWidth);
          video.attr('height', $window.innerHeight);
        }

        $window.addEventListener('resize', resizeVideo);

        function attrWatcher(attr) {
          return function (val) {
            if (val) {
              video.attr(attr, attr);
            } else {
              video.removeAttr(attr);
            }
          };
        }

        function watchAttrs(attrs) {
          for (var i = 0; i < attrs.length; i++) {
            var attr = attrs[i];
            scope.$watch('opts.' + attr, attrWatcher(attr));
          }
        }

        scope.init = function () {
          video.attr('src', opts.src);
          video.attr('poster', opts.poster);
          resizeVideo();
          /* always play in background */
          video.on('playing', function () {
            scope.$apply(function () {
              opts.bg = true;
            });
          });
          watchAttrs(['controls', 'loop', 'autoplay']);
        };

        scope.opts = opts;

        scope.init();

        ControlPanel.add('video', 'glyphicon-film', 'views/video-bg-panel.html', {
          opts: opts
        });
      }
    };
  }]);
