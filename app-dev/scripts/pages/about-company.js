(function () {
	(function processSectionFirstFoldDetailsSwipers() {
		function buildSlideDomsAccordintToTexts(textSlideElements, graphicSlideElements) {
			var slidesWrapperElement = $(graphicSlidesRootSelector + ' .swiper-wrapper')[0];
			// console.log(slidesWrapperElement);

			var rulerSubdiv = 5;
			var lastBuiltYear = NaN;
			var lastBuiltMonth = NaN;
			var hasComeToFutureMonths = false;

			var today = new Date();
			var thisMonth = today.getUTCMonth() + 1;
			var thisYear = today.getUTCFullYear();
			// console.log(thisYear, thisMonth);
			var lastTextSlideElement = null;
			var letEventsLastTillNextEvent = false;
			var doNotBuildAnyGapMonths = false;

			for (var i = 0; i < textSlideElements.length; i++) {
				var currentTextSlideElement = textSlideElements[i];
				if (!currentTextSlideElement) continue;


				var vSpans = $(currentTextSlideElement).find('.value');
				var month = parseInt(vSpans[1].textContent);
				if (isNaN(month)) continue;

				var year = parseInt(vSpans[0].textContent);
				if (isNaN(year)) year = lastBuiltYear;
				if (isNaN(year)) continue;

				var isDifferentYear = isNaN(lastBuiltYear) || (year !== lastBuiltYear);
				var isTheSameMonthAsLast = !isDifferentYear && month === lastBuiltMonth;

				if (isNaN(lastBuiltMonth)) lastBuiltMonth = month;
				if (isNaN(lastBuiltYear)) lastBuiltYear = year;

				var monthGap = (year - lastBuiltYear) * 12 + month - lastBuiltMonth - 1;
				// console.log('frome:', lastBuiltYear, '-', lastBuiltMonth, 'to', year, '-', month, '\t month gap:', monthGap);
				// console.log(currentTextSlideElement.textContent);

				var shouldBuildGapLeftMonth     = !doNotBuildAnyGapMonths && monthGap > 0;
				var shouldBuildGapRightMonth    = !doNotBuildAnyGapMonths && monthGap > 1;
				var shouldBuildGapOmittedMonths = !doNotBuildAnyGapMonths && monthGap > 2;

				var yearToBuild, monthToBuild, isThisMonth, isFirstFutureMonth;
				var builtSlideElement;

				var isFuture = false;


				if (shouldBuildGapLeftMonth) {
					yearToBuild = lastBuiltYear;
					monthToBuild = lastBuiltMonth + 1;
					if (monthToBuild > 12) {
						yearToBuild++;
						monthToBuild -= 12;
					}

					isThisMonth = (yearToBuild === thisYear && monthToBuild === thisMonth);
					isFuture = isFuture || yearToBuild > thisYear || (yearToBuild === thisYear && monthToBuild > thisMonth);
					isFirstFutureMonth = isFuture && !hasComeToFutureMonths;
					if (isFuture) hasComeToFutureMonths = true;

					builtSlideElement = _buildOneSlide(slidesWrapperElement, yearToBuild, monthToBuild, isThisMonth, true, false);
					builtSlideElement.isEmpty = !letEventsLastTillNextEvent;
					if (letEventsLastTillNextEvent) builtSlideElement.textSlideElement = lastTextSlideElement;
					graphicSlideElements.push(builtSlideElement);

					lastBuiltYear = yearToBuild;
					lastBuiltMonth = monthToBuild;
				}


				if (shouldBuildGapOmittedMonths) {
					builtSlideElement = _buildOneSlide(slidesWrapperElement, NaN, NaN, false, true, true);
					builtSlideElement.isEmpty = !letEventsLastTillNextEvent;
					if (letEventsLastTillNextEvent) builtSlideElement.textSlideElement = lastTextSlideElement;
					graphicSlideElements.push(builtSlideElement);
				}


				if (shouldBuildGapRightMonth) {
					yearToBuild = year;
					monthToBuild = month - 1;
					if (monthToBuild < 1) {
						yearToBuild--;
						monthToBuild += 12;
					}

					isThisMonth = (yearToBuild === thisYear && monthToBuild === thisMonth);
					isFuture = isFuture || yearToBuild > thisYear || (yearToBuild === thisYear && monthToBuild > thisMonth);
					isFirstFutureMonth = isFuture && !hasComeToFutureMonths;
					if (isFuture) hasComeToFutureMonths = true;


					builtSlideElement = _buildOneSlide(slidesWrapperElement, yearToBuild, monthToBuild, isThisMonth, true, false);
					builtSlideElement.isEmpty = !letEventsLastTillNextEvent;
					if (letEventsLastTillNextEvent) builtSlideElement.textSlideElement = lastTextSlideElement;
					graphicSlideElements.push(builtSlideElement);

					lastBuiltYear = yearToBuild;
					lastBuiltMonth = monthToBuild;
				}


				yearToBuild = year;
				monthToBuild = month;

				isThisMonth = (yearToBuild === thisYear && monthToBuild === thisMonth);
				isFuture = isFuture || yearToBuild > thisYear || (yearToBuild === thisYear && monthToBuild > thisMonth);
				isFirstFutureMonth = isFuture && !hasComeToFutureMonths;
				if (isFuture) hasComeToFutureMonths = true;

				builtSlideElement = _buildOneSlide(slidesWrapperElement, yearToBuild, monthToBuild, isThisMonth, false, false);
				builtSlideElement.textSlideElement = currentTextSlideElement;
				builtSlideElement.isEmpty = false;
				graphicSlideElements.push(builtSlideElement);

				lastBuiltYear = yearToBuild;
				lastBuiltMonth = monthToBuild;

				lastTextSlideElement = currentTextSlideElement;
				// console.log('======');
			}
		}

		function _buildOneSlide(parentElement, year, month, isForComingMonth, isForEmptyMonth, isForOmittedMonths) {
			var slideElement = document.createElement('div');
			slideElement.className = 'swiper-slide';
			slideElement.year = year;

			var innerHTML = [
				_generateOneRulerSegmentHTML(year, month, isForComingMonth, isForEmptyMonth, isForOmittedMonths, false)
			];

			if (isForComingMonth) {
				innerHTML.push(
					_generateOneRulerSegmentHTML(NaN, NaN, false, true, false, true)
				);
			}

			slideElement.innerHTML = innerHTML.join('');

			parentElement.appendChild(slideElement);

			return slideElement;
		}

		function _generateOneRulerSegmentHTML(year, month, isForComingMonth, isForEmptyMonth, isForOmittedMonths, isLastMonth) {
			// console.log('building ruler segment for ', year, month, isForComingMonth);

			var futureLabel = isForComingMonth ? '<p class="tip">敬请期待</p>' : '';
			var rulerExtraClassNames = ''
				+ (isForEmptyMonth ? ' empty-content' : '')
				+ (isLastMonth     ? ' hide-chief-scale-line' : '')
			;

			var rulerLabelHtml = (!isNaN(year) && !isNaN(month)) ? ('<p data-year="'+year+'" class="label">'+month+'月</p>') : '';

			if (isForOmittedMonths) rulerLabelHtml = '<p class="label">...</p>';

			var rulerSegment = [
				'<div class="ruler-segment',
					rulerExtraClassNames,
				'">',
					futureLabel,
					rulerLabelHtml,
					'<i></i><i></i><i></i><i></i>',
				'</div>'
			];

			return rulerSegment.join('');
		}

		var niddleLabel = $('.company-events .fm-style-timeline .fm-niddle .label')[0];

		var graphicSlidesTransitionDurationInSeconds = 0.6;
		var graphicSlidesRootSelector = '.company-events .fm-style-timeline .swiper-container.graphic-slides';
		var articleSlidesRootSelector = '.company-events .fm-style-timeline .swiper-container.text-slides';


		var $textSlideElements = $(articleSlidesRootSelector + ' .swiper-slide');
		var graphicSlideElements = [];
		buildSlideDomsAccordintToTexts($textSlideElements, graphicSlideElements);


		var initialSlideIndex = graphicSlideElements.length - 1;
		var swiperControl = buildSwiper();
		swiperControl.slideTo(initialSlideIndex);


		function buildSwiper() {
			var shouldNotStopAtEmptyMonths = true;


			var lastActiveIndex = initialSlideIndex;
			var isAutoSkippingEmptyMonths = false;
			var autoSkippingDirection = -1;


			return new window.Swiper(graphicSlidesRootSelector, {
				direction: 'horizontal',
				speed: graphicSlidesTransitionDurationInSeconds * 1000,

				mousewheelControl: true,
				slideToClickedSlide: true,

				loop: false,
				slidesPerView: 'auto',
				centeredSlides: true,

				onSlideChangeStart: function (thisSwiperControl) {
					var graphicSlideActiveIndex = thisSwiperControl.activeIndex;
					var activeGraphicSlideElement = thisSwiperControl.slides[graphicSlideActiveIndex];

					// console.log('isEmpty?', activeGraphicSlideElement.isEmpty, thisSwiperControl);
					if (shouldNotStopAtEmptyMonths) {
						if (activeGraphicSlideElement.isEmpty) {
							var nextIndex = graphicSlideActiveIndex;
							if (isAutoSkippingEmptyMonths) {
								nextIndex += autoSkippingDirection;
							} else {
								isAutoSkippingEmptyMonths = true;
								autoSkippingDirection = (lastActiveIndex < graphicSlideActiveIndex) ? 1 : -1;
							}
							setTimeout(function () {
								thisSwiperControl.slideTo(graphicSlideActiveIndex + autoSkippingDirection);
							}, 100);
						} else {
							isAutoSkippingEmptyMonths = false;
						}
					} else {
						isAutoSkippingEmptyMonths = false;
					}

					lastActiveIndex = graphicSlideActiveIndex;


					var year = activeGraphicSlideElement.year;
					if (!isNaN(year) && niddleLabel) {
						niddleLabel.textContent = activeGraphicSlideElement.year;
					}


					var textSlideElementToShow = activeGraphicSlideElement.textSlideElement;
					// console.log('year:', year, textSlideElementToShow);

					var cssClassNameActiveArticle = 'active'; 
					for (var i = 0; i < $textSlideElements.length; i++) {
						var textSlide = $textSlideElements[i];

						if (textSlide === textSlideElementToShow) { 
							$(textSlide).addClass(cssClassNameActiveArticle); 
						} else { 
							$(textSlide).removeClass(cssClassNameActiveArticle);
						}
					}

					// console.log('---------------------------');
				}
			});
		}
	})();
})();