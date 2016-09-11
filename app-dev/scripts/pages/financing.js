(function () {
	var $appHeader = $('#app-header');
	$appHeader.removeClass('use-theme-for-first-fold');

	new window.Swiper('#app-body > .swiper-container', {
		direction: 'vertical',
		mousewheelControl: true,
		hashnav: true,
		loop: false,
		// freeMode: true,
		pagination: '.swiper-pagination',
		paginationClickable: true,
		onSlideChangeStart: function (thisSwiperControl) {
			var slideIndexToShow = thisSwiperControl.activeIndex;
			var cssClassName3 = 'use-theme-for-contacts';
			if (slideIndexToShow === 3) {
				$appHeader.addClass(cssClassName3);
			} else {
				$appHeader.removeClass(cssClassName3);
			}
		}
	});
})();