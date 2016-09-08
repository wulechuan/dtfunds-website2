(function () {
	var $appHeader = $('#app-header');

	new Swiper('.swiper-container', {
		direction: 'vertical',
		mousewheelControl: true,
		loop: false,
		pagination: '.swiper-pagination',
		paginationClickable: true,
		onSlideChangeStart: function (swiperControl) {
			var slideIndexToShow = swiperControl.activeIndex;
			var cssClassName0 = 'use-theme-for-first-fold';
			if (slideIndexToShow === 0) {
				$appHeader.addClass(cssClassName0);
			} else {
				$appHeader.removeClass(cssClassName0);
			}
		}
	});




	(function SimpleBgSlides() {
		var $rootElement = $('.page-chief-section.section-first-fold .bg-set');
		var $slides = $rootElement.find('.bg');
		var currentIndex = NaN;
		var slidesCount = $slides.length;
		var interval = 12000;

		// showSlide(Math.floor(Math.random() * slidesCount));
		showSlide(0);
		// window.setInterval(showNextSlide, interval);

		function showNextSlide() {
			if (isNaN(currentIndex)) showSlide(0);
			else {
				showSlide(currentIndex + 1)
			}
		}
		function showSlide(index) {
			if (currentIndex === index) return true;

			index = index % slidesCount;

			for (var i = 0; i < $slides.length; i++) {
				var slide = $slides[i];
				if (i === index) {
					showOneSlide(slide, i);
				} else {
					hideOneSlide(slide, i);
				}
			}
		}
		function showOneSlide(slideElement, i) {
			// console.log('show', i);
			$(slideElement).addClass('start-to-show');
			currentIndex = i;
			slideElement.style.zIndex = 2;
			window.setTimeout(function () {
				// console.log('remove class', i);
				$(slideElement).removeClass('start-to-show');
			}, 9000);
		}
		function hideOneSlide(slideElement, i) {
			// console.log('hide', i);
			$(slideElement).removeClass('start-to-show');
			slideElement.style.zIndex = '';
		}
	})();
})();