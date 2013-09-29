'use strict';

angular.module('swallApp')
  .directive('videoBg', ['$window', 'ControlPanel', function ($window, ControlPanel) {
    return {
      templateUrl: 'views/video-bg-tpl.html',
      restrict: 'E',
      scope: {},
      link: function postLink(scope, element, attrs) {
        var video = element.find('video')[0];
        var opts = {
          poster: 'http://video-js.zencoder.com/oceans-clip.png',
          src: 'http://video-js.zencoder.com/oceans-clip.mp4',
          loop: true,
        };
        var vjs, controlBar;

        function resizeVideo () {
          vjs.dimensions($window.innerWidth, $window.innerHeight);
        };
        $window.addEventListener('resize', resizeVideo);

        scope.init = function () {
          vjs = videojs(video.id, {
            controls: true,
            preload: 'auto',
            poster: opts.poster,
            loop: opts.loop
          });

          controlBar = element.find('.vjs-control-bar');
          vjs.src(opts.src);

          resizeVideo();

          vjs.on('play', function () {
            scope.$apply(function () {
              scope.bg = true;
            });
          });

          vjs.on('pause', function () {
            scope.$apply(function () {
              scope.bg = false;
            });
          });
        }

        scope.opts = opts;

        scope.init();

        scope.$watch('opts.loop', function (val) {
          vjs.loop(val);
        });
        scope.$watch('bg', function(val) {
          if (val) {
            // force hiding control bar when playing background
            controlBar.attr('style', 'display:none!important');
          } else {
            controlBar.attr('style', '');
          }
        });

        ControlPanel.add('video', 'glyphicon-film', 'views/video-bg-panel.html', {
          opts: opts,
          pause: function () {vjs.pause();}
        });
      }
    };
  }]);
