(function () {
	var bodyClickListener = new function () {
		this.registeredElements = [];

		this.register = function (elements, callback) {
			if (typeof callback !== 'function') return false;

			if (!Array.isArray(elements)) elements = [elements];
			for (var i = 0; i < elements.length; i++) {
				var el = elements[i];
				if (!el) continue;
				this.registeredElements.push({
					element: el,
					callback: callback
				});
			}
		};

		this.broadCastOutsideClickToRegisteredElements = function (clickedEl) {
			for (var i = 0; i < this.registeredElements.length; i++) {
				var record = this.registeredElements[i];
				var el = record.element;
				var isOutside = this.testClickOutsideElement(el, clickedEl);
				if (isOutside) {
					record.callback(clickedEl);
				}
			}
		};

		this.testClickOutsideElement = function (testEl, clickedEl) {
			if (!testEl || !clickedEl) return true;

			while (clickedEl && clickedEl!==document.body && clickedEl!==testEl) {
				clickedEl = clickedEl.parentNode;
			}

			return testEl !== clickedEl;
		};

		var thisController = this;
		function _init() {
			$('body').on('click', function (event) {
				var clickedEl = event.target;
				thisController.broadCastOutsideClickToRegisteredElements(clickedEl);
			});
		}

		_init.call(this);
	}();


	$('#app-chief-nav .menu.level-1 > .menu-item').each(function (indexL1, menuItemL1) {
		var level1Matches = indexL1 === window.appChiefNavCurrentL1;
		if (level1Matches) {
			$(menuItemL1).addClass('current');
			var labelWrappedInAnchor = $(menuItemL1).find('> a > .label')[0];
			if (labelWrappedInAnchor) {
				var anchor = labelWrappedInAnchor.parentNode;
				menuItemL1.appendChild(labelWrappedInAnchor);
				menuItemL1.removeChild(anchor);
			}
		} else {
			$(menuItemL1).removeClass('current');
		}

		$(menuItemL1).find('.menu.level-2 > .menu-item').each(function (indexL2, menuItemL2) {
			if (indexL2 === window.appChiefNavCurrentL2) {
				$(menuItemL2).addClass('current');
				var labelWrappedInAnchor = $(menuItemL2).find('> a > .label')[0];
				if (labelWrappedInAnchor) {
					var anchor = labelWrappedInAnchor.parentNode;
					menuItemL2.appendChild(labelWrappedInAnchor);
					menuItemL2.removeChild(anchor);
				}
			} else {
				$(menuItemL2).removeClass('current');
			}
		});
	});


})();
