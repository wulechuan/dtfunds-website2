(function () {
	(function setupRollingNumber() {
		$('.rolling-number').each(function () {
			var el = this;
			init(el);
			roll(el);
		});

		function init(el, targetNumber) {
			targetNumber = parseFloat(targetNumber);
			if (isNaN(targetNumber)) {
				targetNumber = parseFloat(el.getAttribute('data-target-value'));
			}

			if (isNaN(targetNumber)) {
				targetNumber = parseFloat(el.textContent.replace(/\,/g, ''));
			}

			if (isNaN(targetNumber)) {
				return false;
			}

			el.targetNumber = targetNumber;
		}

		function roll(el, from, to) {
			var intervalInMS = 25;
			var valueStepAbs = 9;
			var valueStepAbsAcceleration = 1.23;
			var valueStepAbsMax = 87654;

			if (el.isRolling) return true;

			el.isRolling = true;

			from = parseFloat(from);
			if (isNaN(from)) {
				from = 0;
			}

			to = parseFloat(to);
			if (isNaN(to)) {
				to = el.targetNumber;
			}

			var valueSign = (to > from) ? '' : '-';

			var startingTimeStamp = new Date().getTime();
			var valueStepAbs = valueStepAbs;

			var currentValueAbs = Math.abs(from);
			var toAbs = Math.abs(to);

			var intervalIndex = window.setInterval(function () {
				// console.log('time:', startingTimeStamp, '...rolling from', from, 'to', to, 'gap:', valueStep);

				currentValueAbs += parseInt(valueStepAbs);

				currentValueAbs = Math.min(currentValueAbs, toAbs);

				el.textContent = valueSign + formatNumber(currentValueAbs);

				if (currentValueAbs >= toAbs) {
					window.clearInterval(intervalIndex);
				}


				if (valueStepAbs < valueStepAbsMax) {
					valueStepAbs *= valueStepAbsAcceleration;
					valueStepAbs = Math.min(valueStepAbs, valueStepAbsMax);
				} else {
					var valueStepRandomTail = Math.random() * valueStepAbsMax * 0.1;
					valueStepAbs += valueStepRandomTail;
				}

			}, intervalInMS);
		}

		function formatNumber(value) {
			var sign = value > 0 ? '' : '-';

			s = ''+Math.abs(value);
			var length = s.length;
			var paddingZero = length % 3;
			if (paddingZero) paddingZero = 3-paddingZero;
			for (var i = 0; i < paddingZero; i++) {
				s = '0'+s;
			}
			s = s.replace(/(\d{3})/g, ',$1').slice(paddingZero+1);

			return sign+s;
		}
	})();


	(function setupPageChiefSwiper() {
		var $appHeader = $('#app-header');
		$appHeader.removeClass('use-theme-for-first-fold');

		var lastSlideElement;
		var swiperControl = new window.Swiper('#app-body > .swiper-container', {
			direction: 'vertical',
			mousewheelControl: true,
			hashnav: true,
			loop: false,
			// freeMode: true,
			pagination: '.swiper-pagination',
			paginationClickable: true,
			onSlideChangeStart: function (thisSwiperControl) {
				var slideIndexToShow = thisSwiperControl.activeIndex;
				$(thisSwiperControl.slides[thisSwiperControl.activeIndex]).find('.actor').addClass('acting');

				if (lastSlideElement) {
					$(lastSlideElement).find('.actor').removeClass('acting');
				}

				var cssClassName3 = 'use-theme-for-contacts';
				if (slideIndexToShow === 3) {
					$appHeader.addClass(cssClassName3);
				} else {
					$appHeader.removeClass(cssClassName3);
				}
			},
			onSlideChangeEnd: function (thisSwiperControl) {
				lastSlideElement = thisSwiperControl.slides[thisSwiperControl.activeIndex];

			}
		});

		$(swiperControl.slides[swiperControl.activeIndex]).find('.actor').addClass('acting');
	})();
})();