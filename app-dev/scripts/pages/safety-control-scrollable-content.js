(function () {
	(function processRiskBlockSwiperForCustomizedScrollbar() {
		var slidesRootSelector = '.swiper-container';

		var isFireFox = !!navigator.userAgent.match(/Firefox/i);
		var mousewheelSensitivity = isFireFox ? 25 : 1;

		new window.Swiper(slidesRootSelector, {
			nested: true,
			direction: 'vertical',
			scrollbar: slidesRootSelector+' .swiper-scrollbar',
			scrollbarDraggable: true,
			slidesPerView: 'auto',
			mousewheelControl: true,
			scrollbarHide: false,
			freeMode: true,
			mousewheelReleaseOnEdges: true,
			mousewheelSensitivity: mousewheelSensitivity
		});
	})();
})();