var dtCountDownTimerInit = function() {

    jQuery('.wdt-shop-downcount').each(function() {
        var el = jQuery(this);
        el.downCount({
            date    : el.attr('data-date'),
            offset  : el.attr('data-offset')
        });
    });

};


jQuery.noConflict();
jQuery(document).ready(function($){

    "use strict";

    if ( typeof wdtShopObjects !== 'undefined' ) {
        if(wdtShopObjects.enable_countdown_scripts) {
            dtCountDownTimerInit();
        }
    }


});


( function( $ ) {

	var wdtShopCountDownTimerJs = function($scope, $){
        dtCountDownTimerInit();
	};

    $(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/wdt-shop-product-single-summary.default', wdtShopCountDownTimerJs);
	});

} )( jQuery );