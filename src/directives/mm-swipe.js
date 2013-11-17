angular.module('mm-module', ['ngTouch'])
    .directive('mmSwipe', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            template: '<div class="slideshow"><div class="slides" ng-transclude ng-swipe-right="swipeRight()" ng-swipe-left="swipeLeft()" style="-webkit-user-drag: none;"></div><div class="arrows"><button class="arrow left" ng-click="goLeft()">&lt;</button><button class="arrow right" ng-click="goRight()">&gt;</button></div></div>',
            scope: true,
            replace: true,
            transclude: true,

            link: function (scope, element) {
                var slideNo = 0;
                var $ = angular.element;

                var $slideshow = $(element);

                var $slides = $($slideshow[0].querySelectorAll('.slides'));
                var $slidesLi = $($slides[0].querySelectorAll('li'));
                var slidesCount = $slidesLi.length;

                var $arrows = $($slideshow[0].querySelectorAll('.arrows'));
                var $arrLeft = $($arrows[0].querySelectorAll('button.left'));
                var $arrRight = $($arrows[0].querySelectorAll('button.right'));
                var elWidth;

                function shuffleSlides ($el) {
                    var j;
                    for (var i = 0; i < $el.length; i++) {
                        j = Math.floor(Math.random() * $el.length);
                        $($el[i]).after($($el[j]));
                    }
                    return $el;
                }
                shuffleSlides($slidesLi);

                function updateSlides () {
                    var translateX = (-1) * slideNo * elWidth;
                    var style = $slides[0].style;

                    style.MozTransform = style.webkitTransform = 'translate3d(' + translateX + 'px, 0, 0)';
                    style.msTransform = style.OTransform = 'translateX(' + translateX + 'px)';
                }

                scope.swipeLeft = function () {
                    if (slideNo >= slidesCount - 1) {
                        return;
                    }
                    ++slideNo;
                    updateSlides();
                };

                scope.swipeRight = function () {
                    if (slideNo <= 0) {
                        return;
                    }
                    --slideNo;
                    updateSlides();
                };

                scope.goLeft = function () {
                    if (--slideNo < 0) {
                        slideNo = slidesCount - 1;
                    }
                    updateSlides();
                };

                scope.goRight = function () {
                    if (++slideNo >= slidesCount) {
                        slideNo = 0;
                    }
                    updateSlides();
                };

                function setWidths () {
                    $slideshow.css('width', 'auto');
                    elWidth = $slideshow[0].getBoundingClientRect().width;
                    $slideshow.css({
                        'overflow': 'hidden',
                        'width': elWidth + 'px'
                    });

                    $slides.css({
                        'width': elWidth * slidesCount + 'px',
                        'transition': 'all 500ms'
                    });

                    $slidesLi.css({
                        'width': elWidth + 'px',
                        'clear': 'none',
                        'float': 'left'
                    });
                }

                setWidths();
                $timeout(setWidths);
                $(window).on('resize', setWidths);
            }
        };
    }]
);