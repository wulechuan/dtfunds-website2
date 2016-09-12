(function () {
	(function processRiskBlockSwiperForCustomizedScrollbar() {
		var slidesRootSelector = '.swiper-container';

		new window.Swiper(slidesRootSelector, {
			nested: true,
			direction: 'vertical',
			scrollbar: slidesRootSelector+' .swiper-scrollbar',
			scrollbarDraggable: true,
			slidesPerView: 'auto',
			mousewheelControl: true,
			scrollbarHide: false,
			freeMode: true
		});
	})();
})();