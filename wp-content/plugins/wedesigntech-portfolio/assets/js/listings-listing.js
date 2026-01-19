( function( $ ) {

	var wdtPortfolioListingsListing = function($scope, $){
		wdtPortfolioFrontend.dtInit();
	};

    $(window).on('elementor/frontend/init', function(){
		elementorFrontend.hooks.addAction('frontend/element_ready/wdt-widget-df-listings-listing.default', wdtPortfolioListingsListing);
    });

} )( jQuery );