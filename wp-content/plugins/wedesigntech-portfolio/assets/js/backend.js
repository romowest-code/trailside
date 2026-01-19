var wdtPortfolioBackendUtils = {

	wdtPortfolioCheckboxSwitch : function() {

		jQuery('.wdt-checkbox-switch:not(.disabled)').each( function() {
			jQuery(this).on('click', function(e) {

				var $ele = '#' + jQuery(this).attr('data-for');
				jQuery(this).toggleClass('checkbox-switch-off checkbox-switch-on');

				if (jQuery(this).hasClass('checkbox-switch-on')) {
					jQuery($ele).prop('checked', true);
				} else {
					jQuery($ele).removeAttr('checked');
				}

				e.preventDefault();

			});
		});

	},

	wdtPortfolioAjaxBeforeSend : function(this_item) {

		if(this_item != undefined) {
			if(!this_item.find('.wdt-ajax-load-image').hasClass('first')) {
				this_item.find('.wdt-ajax-load-image').show();
			} else {
				this_item.find('.wdt-ajax-load-image').removeClass('first');
			}
		} else {
			if(!jQuery('.wdt-ajax-load-image').hasClass('first')) {
				jQuery('.wdt-ajax-load-image').show();
			} else {
				jQuery('.wdt-ajax-load-image').removeClass('first');
			}
		}

	},

	wdtPortfolioAjaxAfterSend : function(this_item) {

		if(this_item != undefined) {
			this_item.find('.wdt-ajax-load-image').hide();
		} else {
			jQuery('.wdt-ajax-load-image').hide();
		}

	},

	wdtPortfolioVerticalTab : function(this_item) {

		if(('ul.wdt-tabs-vertical').length > 0) {
			jQuery('ul.wdt-tabs-vertical').each(function(){
				var $effect = jQuery(this).parent('.wdt-tabs-vertical-container').attr('data-effect');
				jQuery(this).wdtPortfolioTabs('> .wdt-tabs-vertical-content', {
					effect: $effect
				});
			});

			jQuery('.wdt-tabs-vertical').each(function(){
				jQuery(this).find('li:first').addClass('first').addClass('current');
				jQuery(this).find('li:last').addClass('last');
			});

			jQuery('.wdt-tabs-vertical li').on('click', function(){
				jQuery(this).parent().children().removeClass('current');
				jQuery(this).addClass('current');
			});
		}

	}

};


var wdtPortfolioBackend = {

	dtInit : function() {
		wdtPortfolioBackend.wdtPortfolio();
		wdtPortfolioBackend.dtSettings();
	},

	wdtPortfolio : function() {

		// Checkbox switch
		wdtPortfolioBackendUtils.wdtPortfolioCheckboxSwitch();

		// Vertical Tabs
		wdtPortfolioBackendUtils.wdtPortfolioVerticalTab();


		// Initaialize color picker
		if(jQuery('.wdt-color-field').length) {
			jQuery('.wdt-color-field').wpColorPicker();
		}

	},

	dtSettings : function() {

		// Save Backend Options

		jQuery( 'body' ).delegate( '.wdt-save-options-settings', 'click', function(e) {

			var this_item = jQuery(this),
				settings = this_item.attr('data-settings');

	        var form = jQuery('.formOptionSettings')[0];
	        var data = new FormData(form);
	        data.append('action', 'wdt_save_options_settings');
	        data.append('settings', settings);

			jQuery.ajax({
				type: "POST",
				url: wdtbackendobject.ajaxurl,
				data: data,
	            processData: false,
	            contentType: false,
	            cache: false,
				beforeSend: function(){
					this_item.prepend( '<span><i class="fa fa-spinner fa-spin"></i></span>' );
				},
				success: function (response) {
					this_item.parents('.formOptionSettings').find('.wdt-option-settings-response-holder').html(response);
					this_item.parents('.formOptionSettings').find('.wdt-option-settings-response-holder').show();
					window.setTimeout(function(){
						this_item.parents('.formOptionSettings').find('.wdt-option-settings-response-holder').fadeOut('slow');
					}, 2000);
				},
				complete: function(){
					this_item.find('span').remove();
				}
			});

			e.preventDefault();

		});

		// Skin

		jQuery( 'body' ).delegate( '.wdt-save-skin-settings', 'click', function(e) {

			var this_item = jQuery(this);

	        var form = jQuery('.formSkinSettings')[0];
	        var data = new FormData(form);
	        data.append('action', 'wdt_save_skin_settings');

			jQuery.ajax({
				type: "POST",
				url: wdtbackendobject.ajaxurl,
				data: data,
	            processData: false,
	            contentType: false,
	            cache: false,
				beforeSend: function(){
					this_item.prepend( '<span><i class="fa fa-spinner fa-spin"></i></span>' );
				},
				success: function (response) {
					this_item.parents('.formSkinSettings').find('.wdt-skin-settings-response-holder').html(response);
					window.setTimeout(function(){
						this_item.parents('.formSkinSettings').find('.wdt-skin-settings-response-holder').fadeOut('slow');
					}, 2000);
				},
				complete: function(){
					this_item.find('span').remove();
				}
			});

			e.preventDefault();

		});

	}

};

jQuery(document).ready(function() {

	wdtPortfolioBackend.dtInit();

});