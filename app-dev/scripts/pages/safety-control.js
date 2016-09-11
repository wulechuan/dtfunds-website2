(function () {
	(function processChiefSwiper() {
		var $appHeader = $('#app-header');
		$appHeader.removeClass('use-theme-for-first-fold');

		new window.Swiper('#app-body > .swiper-container', {
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
		var graphicSlidesRootSelector = '.section-first-fold .details-block .swiper-container.graphic-slides';
		var articleSlidesRootSelector = '.section-first-fold .details-block .swiper-container.explaination-slides';


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
				autoplay: 5000,

				loop: true,
				slidesPerView: knownSlidesCountPerSwiper,
				centeredSlides: true,
				// loopedSlides: 0,

		        nextButton: graphicSlidesRootSelector + ' .swiper-button-next',
		        prevButton: graphicSlidesRootSelector + ' .swiper-button-prev',

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
})();