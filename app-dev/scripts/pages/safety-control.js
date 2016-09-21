(function () {
	var C = window.console;

	var chiefSwiper = (function processChiefSwiper() {
		var $appHeader = $('#app-header');
		$appHeader.removeClass('use-theme-for-first-fold');

		return new window.Swiper('#app-body > .swiper-container', {
			direction: 'vertical',
			mousewheelControl: true,
			hashnav: true,
			loop: false,
			pagination: '#app-body > .swiper-container > .swiper-pagination',
			paginationClickable: true
		});
	})();




	(function processSectionFirstFoldDetailsSwipers() {
		function evaluateIndexDistanceTo(count, centerIndex, targetIndex) {
			count = parseInt(count);
			if (isNaN(count) || count < 1) return NaN;

			if (centerIndex instanceof Node) {
				centerIndex = centerIndex.getAttribute('data-swiper-slide-index');
			}
			centerIndex = parseInt(centerIndex);
			if (isNaN(centerIndex)) return NaN;

			if (targetIndex instanceof Node) {
				targetIndex = targetIndex.getAttribute('data-swiper-slide-index');
			}
			targetIndex = parseInt(targetIndex);
			if (isNaN(targetIndex)) return NaN;

			var centerViewIndex = Math.floor(count / 2);
			var centerIndex = centerIndex % count;

			var dis = targetIndex - centerIndex;
			var disAbs = Math.abs(dis);
			if (disAbs > centerViewIndex) {
				dis += dis > 0 ? -count : count;
			}

			return dis;
		}

		function updateAllIndexDistancesFor(allSlideElementsIncludingDupliactions, count, centerIndex) {
			for (var i = 0; i < allSlideElementsIncludingDupliactions.length; i++) {
				var slideElement = allSlideElementsIncludingDupliactions[i];

				var indexDistanceToActiveIndex = evaluateIndexDistanceTo(count, centerIndex, slideElement);
				if (isNaN(indexDistanceToActiveIndex)) continue;
					// console.log('distance info:', centerIndex, ':', indexDistanceToActiveIndex);
				slideElement.setAttribute('data-index-distance-to-active-one', indexDistanceToActiveIndex);
			}
		}

		var knownSlidesCountPerSwiper = 5;
		var graphicSlidesTransitionDurationInSeconds = 0.6;
		var slidesWrapperBlockSelector = '.section-first-fold .details-block .slides-block';
		var graphicSlidesRootSelector = slidesWrapperBlockSelector + ' .swiper-container.graphic-slides';
		var articleSlidesRootSelector = slidesWrapperBlockSelector + ' .swiper-container.explaination-slides';

		var buttonSlidePrev = $(slidesWrapperBlockSelector + ' .swiper-slide-prev')[0];
		var buttonSlideNext = $(slidesWrapperBlockSelector + ' .swiper-slide-next')[0];

		var $graphicSlideElements = $(graphicSlidesRootSelector + ' .swiper-slide');
		var $articleSlideElements = $(articleSlidesRootSelector + ' .swiper-slide');



		var initialSlideIndex = 0;
    	updateAllIndexDistancesFor($graphicSlideElements, knownSlidesCountPerSwiper, initialSlideIndex);
    	var graphicSlidesRoot = $(graphicSlidesRootSelector)[0];

    	if (graphicSlidesRoot) {
    		var delayInMs = 330;
    		graphicSlidesRoot.style.transition = 'none';
    		graphicSlidesRoot.style.opacity = 0;
	    	window.setTimeout(buildSwiper, delayInMs);
	    	window.setTimeout(function () {
	    		graphicSlidesRoot.style.transition = '';
	    		graphicSlidesRoot.style.opacity = '';
	    	}, delayInMs+100);
    	}

    	function buildSwiper() {
			return new window.Swiper(graphicSlidesRootSelector, {
				nested: true,
				direction: 'horizontal',
				speed: graphicSlidesTransitionDurationInSeconds * 1000,

				initial: initialSlideIndex,
				mousewheelControl: false,
				slideToClickedSlide: true,
				pagination: null,
				autoplay: 1600,

				loop: true,
				slidesPerView: knownSlidesCountPerSwiper,
				centeredSlides: true,
				// loopedSlides: 0,

		        prevButton: buttonSlidePrev,
		        nextButton: buttonSlideNext,

				onSlideChangeStart: function (thisSwiperControl) {
					var count = knownSlidesCountPerSwiper;
					var slideIndexToShow = thisSwiperControl.activeIndex % count;

					updateAllIndexDistancesFor(thisSwiperControl.slides, count, slideIndexToShow);

					var cssClassNameActiveArticle = 'active'; 
					for (var i = 0; i < count; i++) {
						var article = $articleSlideElements[i]; 
						if (i === slideIndexToShow) { 
							$(article).addClass(cssClassNameActiveArticle); 
						} else { 
							$(article).removeClass(cssClassNameActiveArticle);
						}
					}

					// console.log('---------------------------');
				}
			});
    	}
	})();




	(function processNestedSwipers(chiefSwiper) {
		var slidesRootSelector = '.content-scrollable-block > .swiper-container';

		var isFireFox = !!navigator.userAgent.match(/Firefox/i);
		var mousewheelSensitivity = isFireFox ? 25 : 1;

		$(slidesRootSelector).each(function () {
			var slidesRoot = this;
			var isMaxthon = window.navigator.userAgent.match(/Maxthon/i);
			if (isMaxthon) {
				var _rStyle = slidesRoot.style;
				_rStyle.display = 'none';
			}

			// var lastSlideIndex = NaN;

			new window.Swiper(slidesRoot, {
				nested: true,
				direction: 'vertical',

				slidesPerView: 'auto',

				freeMode: false,

				scrollbar: slidesRootSelector+' .swiper-scrollbar',
				scrollbarHide: false,
				scrollbarDraggable: true,
				scrollbarSnapOnRelease: true,

				mousewheelControl: true,
				// mousewheelReleaseOnEdges: true,
				mousewheelSensitivity: mousewheelSensitivity,

				onInit: function(thisSwiperControl) {
					if (isMaxthon) {
						// workaround for avoiding maxthon webkit core bug
						_rStyle.display = '';
						thisSwiperControl.update();
					}
				},

				// onSlideChangeStart: function(thisSwiperControl) {
				// 	// C.log(thisSwiperControl);
				// 	C.log('start');
				// },

				// onSlideChangeEnd: function(thisSwiperControl) {
				// 	setTimeout(function () {
				// 		C.log('end', lastSlideIndex);
				// 		lastSlideIndex = thisSwiperControl.activeIndex;
				// 	});
				// },

				onReachBeginning: function(thisSwiperControl) {
					// C.log('onReachBeginning');
					// chiefSwiper.slidePrev();
				},

				onReachEnd: function (thisSwiperControl) {
					// C.log('onReachEnd');
					// chiefSwiper.slideNext();
				},

				// onProgress: function(thisSwiperControl, progress) {
				// 	var newIndex = thisSwiperControl.activeIndex;
				// 	C.log('progress:', progress, lastSlideIndex, newIndex);
				// 	var isScrollingUp = !isNaN(lastSlideIndex) && (newIndex < lastSlideIndex);
				// 	if (isScrollingUp && progress > 0.01) {
				// 		C.log('should NOT bubble event');
				// 	}
				// }
			});
		});
	})(chiefSwiper);
})();