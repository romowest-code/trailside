( function( $ ) {

	var wdtShopProductSingleAdditionalTabsExploded = function($scope, $){

    if($('.wdt-content-scroll').length) {
        $('.wdt-content-scroll').niceScroll({ cursorcolor:"#000", cursorwidth: "2px", background:"rgba(20,20,20,0.3)", cursorborder:"none" });
    }

    $('.elementor-tab-title').each(function() {
      if($(this).parents('.elementor-toggle-item, .elementor-accordion-item').find('.wdt-content-scroll').length) {
          $(this).on('click', function( e ) {
            setTimeout( function(){
              window.dispatchEvent(new Event('resize'));
          }, 600 );
          });
      }
    });

    $('.woocommerce-tabs li a').each(function() {
      if($(this).parents('.elementor').find('.wdt-content-scroll').length) {
          $(this).on('click', function( e ) {
            setTimeout( function(){
              window.dispatchEvent(new Event('resize'));
          }, 600 );
          });
      }
    });

  };

  $(window).on('elementor/frontend/init', function(){
    elementorFrontend.hooks.addAction('frontend/element_ready/wdt-shop-product-single-additional-tabs-exploded.default', wdtShopProductSingleAdditionalTabsExploded);
    elementorFrontend.hooks.addAction('frontend/element_ready/toggle.default', wdtShopProductSingleAdditionalTabsExploded);
  });

} )( jQuery );