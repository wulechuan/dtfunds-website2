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
		var knownSlidesCountPerSwiper = 5;
		var graphicSlidesTransitionDurationInSeconds = 0.6;
		var articleSlidesTransitionDurationInSeconds = 0.6;
		var graphicSlidesRootSelector = '.section-first-fold .details-block .swiper-container.graphic-slides';
		var articleSlidesRootSelector = '.section-first-fold .details-block .swiper-container.explaination-slides';

		var $articleSlideElements = $(articleSlidesRootSelector + ' .feature-explaination-block');


		var graphicSlidesSwiper = new window.Swiper(graphicSlidesRootSelector, {
			nested: true,
			direction: 'horizontal',
			speed: graphicSlidesTransitionDurationInSeconds * 1000,

			mousewheelControl: false,
			slideToClickedSlide: true,
			pagination: null,

			loop: true,
			slidesPerView: knownSlidesCountPerSwiper,
			centeredSlides: true,
			// loopedSlides: 0,

	        nextButton: graphicSlidesRootSelector + ' .swiper-button-next',
	        prevButton: graphicSlidesRootSelector + ' .swiper-button-prev',

			onSlideChangeStart: function (thisSwiperControl) {
				var slideIndexToShow = thisSwiperControl.activeIndex;
				var count = knownSlidesCountPerSwiper;
				if (count < 1) {
					return;
				}

				slideIndexToShow = slideIndexToShow % count;

				var i;
				var centerViewIndex = Math.floor(count / 2);

				var allSlideElementsIncludingDupliactions = thisSwiperControl.slides;
				for (i = 0; i < allSlideElementsIncludingDupliactions.length; i++) {
					var slideElement = allSlideElementsIncludingDupliactions[i];

					var slideVirtualIndex = parseInt(slideElement.getAttribute('data-swiper-slide-index'));
					if (isNaN(slideVirtualIndex)) continue;

					var indexDistanceToActiveIndex = slideVirtualIndex - slideIndexToShow;
					var distanceAbs = Math.abs(indexDistanceToActiveIndex);
					if (distanceAbs > centerViewIndex) {
						indexDistanceToActiveIndex += indexDistanceToActiveIndex > 0 ? -count : count;
					}
					// console.log('distance info:', slideIndexToShow, slideVirtualIndex, ':', indexDistanceToActiveIndex);
					slideElement.setAttribute('data-index-distance-to-active-one', indexDistanceToActiveIndex);
				}



				var cssClassNameActiveArticle = 'active'; 
				for (i = 0; i < count; i++) {
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
	})();



	(function processRiskBlockSwiperForCustomizedScrollbar() {
		var slidesRootSelector = '.section-risk .swiper-container.scrollable-block';

		new window.Swiper(slidesRootSelector, {
			nested: true,
			direction: 'vertical',
	        scrollbar: slidesRootSelector+' .swiper-scrollbar',
	        slidesPerView: 'auto',
			mousewheelControl: true,
			freeMode: true
		});
	})();
})();