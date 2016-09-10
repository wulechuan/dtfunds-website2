(function () {
	(function processSectionFirstFoldDetailsSwipers() {
		function buildSlideDoms() {
	    	// var graphicSlidesRoot = $(graphicSlidesRootSelector)[0];
		}

		var graphicSlidesTransitionDurationInSeconds = 0.6;
		var graphicSlidesRootSelector = '.company-events .fm-style-timeline .swiper-container.graphic-slides';
		var articleSlidesRootSelector = '.company-events .fm-style-timeline .swiper-container.explaination-slides';


		var initialSlideIndex = 0;

		var $articleSlideElements = $(articleSlidesRootSelector + ' .swiper-slide');

    	buildSlideDoms();
    	console.log(buildSwiper(), $(graphicSlidesRootSelector + ' .swiper-slide'));

    	function buildSwiper() {
			return new window.Swiper(graphicSlidesRootSelector, {
				direction: 'horizontal',
				speed: graphicSlidesTransitionDurationInSeconds * 1000,

				initial: initialSlideIndex,
				mousewheelControl: true,
				slideToClickedSlide: true,

				loop: false,
				slidesPerView: 'auto',
				centeredSlides: true,
				// loopedSlides: 0,

				onSlideChangeStart: function (thisSwiperControl) {
					console.error('fake codes below');
					var textSlideIndexToShow = thisSwiperControl.activeIndex;

					var cssClassNameActiveArticle = 'active'; 
					for (var i = 0; i < $articleSlideElements.length; i++) {
						var article = $articleSlideElements[i]; 
						if (i === textSlideIndexToShow) { 
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