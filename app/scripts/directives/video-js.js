'use strict';

angular.module('swallApp')
  .directive('videoBg', ['$window', function ($window) {
    return {
      templateUrl: 'views/video-bg-tpl.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        var video = element.find('video')[0];
        var opts = {
          poster: 'http://video-js.zencoder.com/oceans-clip.png',
          src: 'http://video-js.zencoder.com/oceans-clip.mp4'
        };
        var vjs;
        var controlBar;

        vjs = videojs(video.id, {
          controls: true,
          preload: 'auto',
          poster: opts.poster,
          loop: true
        });
        vjs.src(opts.src);

        controlBar = element.find('.vjs-control-bar');

        function resizeVideo () {
          vjs.dimensions($window.innerWidth, $window.innerHeight);
        };
        $window.addEventListener('resize', resizeVideo);
        resizeVideo();

        vjs.on('play', function () {
          scope.$apply(function () {
            scope.bg = true;
            // force hiding control bar
            controlBar.attr('style', 'display:none!important');
          });
        });
        scope.opts = opts;
      }
    };
  }]);
