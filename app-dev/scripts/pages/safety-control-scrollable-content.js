(function () {
	(function processRiskBlockSwiperForCustomizedScrollbar() {
		var slidesRootSelector = '.swiper-container';

		var swiper = new window.Swiper(slidesRootSelector, {
			direction: 'vertical',
	        scrollbar: slidesRootSelector+' .swiper-scrollbar',
	        slidesPerView: 'auto',
			mousewheelControl: true,
			scrollbarHide: false,
			freeMode: true
		});
	})();
})();