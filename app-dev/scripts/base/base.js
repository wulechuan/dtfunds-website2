(function () {
	$('#app-chief-nav .menu.level-1 > .menu-item').each(function (indexL1, menuItemL1) {
		var l1Current = window.appChiefNavCurrentL1;
		delete window.appChiefNavCurrentL1;

		var level1Matches = indexL1 === l1Current;
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
			var l2Current = window.appChiefNavCurrentL2;
			delete window.appChiefNavCurrentL2;

			if (indexL2 === l2Current) {
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
