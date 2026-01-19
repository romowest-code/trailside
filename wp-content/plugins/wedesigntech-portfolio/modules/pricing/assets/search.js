var wdtPortfolioPricingSearchForm = {

	dtInit : function() {

		// Price range field slider

			jQuery('.wdt-sf-pricerange-slider').each(function() {

				var handle_start = jQuery(this).parents('.wdt-sf-pricerange-field-holder').find('.wdt-sf-pricerange-start');
				var handle_end = jQuery(this).parents('.wdt-sf-pricerange-field-holder').find('.wdt-sf-pricerange-end');

				var slider_handle_start = jQuery(this).find('.wdt-sf-pricerange-slider-start-handle');
				var slider_handle_end = jQuery(this).find('.wdt-sf-pricerange-slider-end-handle');

				var min_value = parseInt(jQuery(this).attr('data-min'), 10);
				var max_value = parseInt(jQuery(this).attr('data-max'), 10);

				var updated_min_value = parseInt(jQuery(this).attr('data-updated-min'), 10);
				var updated_max_value = parseInt(jQuery(this).attr('data-updated-max'), 10);

				var currencysymbol = jQuery(this).attr('data-currencysymbol');
				var currencysymbolposition = jQuery(this).attr('data-currencysymbolposition');

				jQuery(this).slider({
					range: true,
					min: min_value,
					max: max_value,
					values: [ updated_min_value, updated_max_value ],
					slide: function(event, ui) {

						handle_start.val(ui.values[0]);
						handle_end.val(ui.values[1]);

						var price_range_start = '';
						var price_range_end = '';
						if(currencysymbolposition == 'left') {
							price_range_start = currencysymbol + ui.values[0] ;
							price_range_end = currencysymbol + ui.values[1];
						} else if(currencysymbolposition == 'right') {
							price_range_start = ui.values[0] + currencysymbol;
							price_range_end = ui.values[1] + currencysymbol;
						} else if(currencysymbolposition == 'left_space') {
							price_range_start = currencysymbol + ' ' + ui.values[0];
							price_range_end = currencysymbol + ' ' + ui.values[1];
						} else if(currencysymbolposition == 'right_space') {
							price_range_start = ui.values[0] + ' ' + currencysymbol;
							price_range_end = ui.values[1] + ' ' + currencysymbol;
						}

						slider_handle_start.html(price_range_start);
						slider_handle_end.html(price_range_end);

					},
					stop: function(event, ui) {
						if(jQuery(this).hasClass('wdt-with-ajax-load')) {
							window.setTimeout(function(){
								wdtPortfolioFrontendUtils.wdtPortfolioLoadDataOutput();
							}, 250);
						}
					},
				});

			});

	},

};

jQuery(document).ready(function() {

	if(!wdtfrontendobject.elementorPreviewMode) {
		wdtPortfolioPricingSearchForm.dtInit();
	}

});

( function( $ ) {

	var wdtPortfolioPricingSearchFormJs = function($scope, $){
		wdtPortfolioPricingSearchForm.dtInit();
	};

    $(window).on('elementor/frontend/init', function(){
		if(wdtfrontendobject.elementorPreviewMode) {
			elementorFrontend.hooks.addAction('frontend/element_ready/wdt-widget-sf-pricerange.default', wdtPortfolioPricingSearchFormJs);
		}
	});

} )( jQuery );