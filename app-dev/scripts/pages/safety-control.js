(function () {
	var $appHeader = $('#app-header');
	$appHeader.removeClass('use-theme-for-first-fold');

	new window.Swiper('#app-body > .swiper-container', {
		direction: 'vertical',
		mousewheelControl: true,
		hashnav: true,
		loop: false,
		pagination: '.swiper-pagination',
		paginationClickable: true
	});

	new window.Swiper('.section-first-fold .details-block .swiper-container', {
		nested: true,
		direction: 'horizontal',
		mousewheelControl: false,
		hashnav: false,
		loop: true,
		pagination: '.pagination',
		slideToClickedSlide: true
	});
})();