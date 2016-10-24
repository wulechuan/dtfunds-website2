(function () {
	var incPerDay = 987;
	setupRollingNumber(1046451, '2016-10-20 09:55 GMT+0800', incPerDay);

	function setupRollingNumber(theNumber, numberSamplingTime, incPerDay) {
		$('.rolling-number').each(function () {
			var el = this;
			$(el).hide();
			init(el, theNumber, numberSamplingTime, incPerDay);
			roll(el);
		});

		function init(el, targetNumber, numberSamplingTime, incPerDay) {
			targetNumber = parseFloat(targetNumber);
			if (isNaN(targetNumber)) {
				targetNumber = parseFloat(el.getAttribute('data-target-value'));
			}

			if (isNaN(targetNumber)) {
				targetNumber = parseFloat(el.textContent.replace(/\,/g, ''));
			}

			var now = new Date().getTime();
			var time = now - new Date(numberSamplingTime).getTime();
			if (isNaN(time)) time = now;

			time = Math.max(0, time / 1000);

			var incPerSecond = incPerDay / (24 * 60 * 60);
			targetNumber += time * incPerSecond;
			targetNumber = Math.floor(targetNumber);

			// console.log(time * ratio, targetNumber);

			if (isNaN(targetNumber)) {
				return false;
			}

			el.targetNumber = targetNumber;

			$(el).show();
		}

		function roll(el, from, to) {
			var intervalInMS = 20;
			var valueStepAbs = 19;
			var valueStepAbsAcceleration = 1.33;
			var valueStepAbsMax = 98765;

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
	}


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