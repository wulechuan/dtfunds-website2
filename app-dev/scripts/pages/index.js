(function () {
	(function setupPageChiefSwiper() {
		var $appHeader = $('#app-header');
		$appHeader.addClass('use-theme-for-first-fold');

		var lastSlideElement;

		new window.Swiper('#app-body > .swiper-container', {
			direction: 'vertical',
			mousewheelControl: true,
			hashnav: true,
			loop: false,
			pagination: '.swiper-pagination',
			paginationClickable: true,
			onSlideChangeStart: function (thisSwiperControl) {
				var slideIndexToShow = thisSwiperControl.activeIndex;
				$(thisSwiperControl.slides[slideIndexToShow]).find('.actor').addClass('acting');

				if (lastSlideElement) {
					$(lastSlideElement).find('.actor').removeClass('acting');
				}

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
			},
			onSlideChangeEnd: function (thisSwiperControl) {
				lastSlideElement = thisSwiperControl.slides[thisSwiperControl.activeIndex];
			}
		});
	})();



	(function SimpleBgSlides() {
		var $bgTint = $('.bg-tint');
		var cssClassNameSlideStartToShowAnimation = 'start-to-show';
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

			var shouldFadeOut = index === 0;

			var cssClassNameTint = 'fading-in';
			if (shouldFadeOut) {
				cssClassNameTint = 'fading-out'
				// $bgTint.addClass('fading-out-on-show');
			} else {
				// $bgTint.removeClass('fading-out-on-show');
			}
			$bgTint.addClass(cssClassNameTint);
			$bgTint.show();
			if (!shouldFadeOut) {
				setTimeout(function () {
					$bgTint.removeClass(cssClassNameTint);
				}, 5100);
			} else {
				setTimeout(function () {
					$bgTint.hide();
				}, 4000);
			}
		}
		function showOneSlide(slideElement, i) {
			$(slideElement).addClass(cssClassNameSlideStartToShowAnimation);
			currentIndex = i;
			slideElement.style.zIndex = 2;
			window.setTimeout(function () {
				$(slideElement).removeClass(cssClassNameSlideStartToShowAnimation);
			}, 4000);
		}
		function hideOneSlide(slideElement, i) {
			$(slideElement).removeClass(cssClassNameSlideStartToShowAnimation);
			slideElement.style.zIndex = '';
		}
	})();
})();