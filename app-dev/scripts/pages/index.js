(function () {
	var $appHeader = $('#app-header');
	$appHeader.addClass('use-theme-for-first-fold');

	new window.Swiper('#app-body > .swiper-container', {
		direction: 'vertical',
		mousewheelControl: true,
		hashnav: true,
		loop: false,
		pagination: '.swiper-pagination',
		paginationClickable: true,
		onSlideChangeStart: function (swiperControl) {
			var slideIndexToShow = swiperControl.activeIndex;
			var cssClassName0 = 'use-theme-for-first-fold';
			var cssClassName2 = 'use-theme-for-contacts';
			if (slideIndexToShow === 0) {
				$appHeader.addClass(cssClassName0);
			} else {
				$appHeader.removeClass(cssClassName0);
			}
			if (slideIndexToShow === 2) {
				$appHeader.addClass(cssClassName2);
			} else {
				$appHeader.removeClass(cssClassName2);
			}
		}
	});




	(function SimpleBgSlides() {
		var $bgTint = $('.bg-tint');
		var cssClassNameTint = 'fading-in';
		var cssClassNameSlide = 'start-to-show';
		var $rootElement = $('.page-chief-section.section-first-fold .bg-set');
		var $slides = $rootElement.find('.bg');
		var currentIndex = NaN;
		var slidesCount = $slides.length;
		var interval = 6000;

		// showSlide(Math.floor(Math.random() * slidesCount));
		showSlide(0);
		window.setInterval(showNextSlide, interval);

		function showNextSlide() {
			if (isNaN(currentIndex)) showSlide(0);
			else {
				showSlide(currentIndex + 1);
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


			$bgTint.addClass(cssClassNameTint);
			setTimeout(function () {
				$bgTint.removeClass(cssClassNameTint);
			}, 5100);
		}
		function showOneSlide(slideElement, i) {
			$(slideElement).addClass(cssClassNameSlide);
			currentIndex = i;
			slideElement.style.zIndex = 2;
			window.setTimeout(function () {
				$(slideElement).removeClass(cssClassNameSlide);
			}, 4000);
		}
		function hideOneSlide(slideElement, i) {
			$(slideElement).removeClass(cssClassNameSlide);
			slideElement.style.zIndex = '';
		}
	})();
})();