jQuery(document).ready(function() {

	jQuery('.wdt-radio-switch:not(.disabled)').each( function() {
		jQuery(this).on('click', function(e) {

			var $switchElement = jQuery(this);
			var $parentElement = jQuery(this).attr('data-radioswitch');

			var oldClassOn = false;
			if ($switchElement.hasClass('radio-switch-on')) {
				oldClassOn = true;
			}

			var old_commenter_id = parseInt($switchElement.parents('.wdt-column').find('.wdt_approved_old_commenter_id').val(), 10);

			$switchElement.parents('.wdt-column').find('.wdt_approved_commenter_id').val('');

			$switchElement.parents('.'+$parentElement).find('tr').each(function () {

				var listingsCountLoop = jQuery(this).find('.wdt-package-listings').val();
				var usedListingsCountLoop = jQuery(this).find('.wdt-package-used-listings').val();
				var current_commenter_id = jQuery(this).find('.wdt-user-id').val();

				if(old_commenter_id == current_commenter_id) {
					usedListingsCountLoop = parseInt(usedListingsCountLoop, 10) - 1;
				}

				if(listingsCountLoop == -1) {
					var remainingListingsLoop = -1;
				} else {
					var remainingListingsLoop = parseInt(listingsCountLoop, 10) - parseInt(usedListingsCountLoop, 10);
				}

				jQuery(this).find('.wdt-remaining-listings-label').html(remainingListingsLoop);
				jQuery(this).find('.wdt-package-used-listings-updated').val(usedListingsCountLoop);

				jQuery(this).find('.wdt-radio-switch').removeClass('radio-switch-on').addClass('radio-switch-off');
				jQuery(this).find('.wdt-radio-switch-field').removeAttr('checked');

			});

			// Update active item

			if (!oldClassOn) {

				$switchElement.removeClass('radio-switch-off').addClass('radio-switch-on');
				var $switchElementField = '#' + $switchElement.attr('data-for');
				jQuery($switchElementField).prop('checked', true);


				var listingsCount = $switchElement.parents('tr').find('.wdt-package-listings').val();
				var usedListingsCount = $switchElement.parents('tr').find('.wdt-package-used-listings-updated').val();
				usedListingsCount = parseInt(usedListingsCount, 10) + 1;

				var remainingListings = parseInt(listingsCount, 10) - parseInt(usedListingsCount, 10);

				$switchElement.parents('tr').find('.wdt-remaining-listings-label').html(remainingListings);
				$switchElement.parents('tr').find('.wdt-package-used-listings-updated').val(usedListingsCount);

				var $switchVal = $switchElement.parents('td').find('.wdt-radio-switch-field').val();
				$switchElement.parents('.wdt-column').find('.wdt_approved_commenter_id').val($switchVal);

			}


			e.preventDefault();

		});
	});

});