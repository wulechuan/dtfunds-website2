(function () {
	var $appHeader = $('#app-header');
	$appHeader.removeClass('use-theme-for-first-fold');

	new window.Swiper('#app-body > .swiper-container', {
		direction: 'vertical',
		mousewheelControl: true,
		hashnav: true,
		loop: false,
		pagination: '.swiper-pagination',
		paginationClickable: true,
		onSlideChangeStart: function (swiperControl) {
			var slideIndexToShow = swiperControl.activeIndex;
			var cssClassName3 = 'use-theme-for-contacts';
			if (slideIndexToShow === 3) {
				$appHeader.addClass(cssClassName3);
			} else {
				$appHeader.removeClass(cssClassName3);
			}
		}
	});
})();