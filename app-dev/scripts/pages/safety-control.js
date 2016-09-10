(function () {
	var $appHeader = $('#app-header');
	$appHeader.removeClass('use-theme-for-first-fold');

	new window.Swiper('#app-body > .swiper-container', {
		direction: 'vertical',
		mousewheelControl: false,
		hashnav: true,
		loop: false,
		pagination: '#app-body > .swiper-container > .swiper-pagination',
		paginationClickable: true
	});


	var sectionFirstFoldDetailsSwiperDurationInSeconds = 0.6;
	var sectionFirstFoldDetailsSwiperRootSelector = '.section-first-fold .details-block .swiper-container';
	var sectionFirstFoldDetailsSwiperPaginationItemsSelector = sectionFirstFoldDetailsSwiperRootSelector + ' .swiper-pagination';
	var $sectionFirstFoldDetailsSwiperPaginationItems = $(sectionFirstFoldDetailsSwiperPaginationItemsSelector + ' .swiper-pagination-item');
	var sectionFirstFoldDetailsSwiperRawSlidesCount = $sectionFirstFoldDetailsSwiperPaginationItems.length;
	if (sectionFirstFoldDetailsSwiperRawSlidesCount < 1) {
		console.warn('No paginationItem found for sectionFirstFoldDetailsSwiper!');
	}
	var sectionFirstFoldDetailsSwiper = new window.Swiper(sectionFirstFoldDetailsSwiperRootSelector, {
		nested: true,
		direction: 'horizontal',
		speed: sectionFirstFoldDetailsSwiperDurationInSeconds * 1000,

		mousewheelControl: true,
		// paginationClickable: false,

		loop: true,
		slidesPerView: sectionFirstFoldDetailsSwiperRawSlidesCount,
		centeredSlides: true,
		// loopedSlides: 0,
		slideToClickedSlide: true,

        nextButton: sectionFirstFoldDetailsSwiperRootSelector + ' .swiper-button-next',
        prevButton: sectionFirstFoldDetailsSwiperRootSelector + ' .swiper-button-prev',

		pagination: sectionFirstFoldDetailsSwiperPaginationItemsSelector,
		paginationType: 'custom',

		onSlideChangeStart: function (thisSwiperControl) {
			var slideIndexToShow = thisSwiperControl.activeIndex;
			var count = sectionFirstFoldDetailsSwiperRawSlidesCount;
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
				console.log('distance info:', slideIndexToShow, slideVirtualIndex, ':', indexDistanceToActiveIndex);
				slideElement.setAttribute('data-index-distance-to-active-one', indexDistanceToActiveIndex);
			}


			var cssClassNameActivePagination = 'active';
			for (i = 0; i < count; i++) {
				var paginationItem = $sectionFirstFoldDetailsSwiperPaginationItems[i];
				if (i === slideIndexToShow) {
					$(paginationItem).addClass(cssClassNameActivePagination);
				} else {
					$(paginationItem).removeClass(cssClassNameActivePagination);
				}
			}

			console.log('++++++++++++++++++');
		}
	});

	var allSlideElementsIncludingDupliactions = sectionFirstFoldDetailsSwiper.slides;
	$(allSlideElementsIncludingDupliactions).find('.icon').each(function () {
		this.style.transitionDuration = sectionFirstFoldDetailsSwiperDurationInSeconds + 's';
	});
})();