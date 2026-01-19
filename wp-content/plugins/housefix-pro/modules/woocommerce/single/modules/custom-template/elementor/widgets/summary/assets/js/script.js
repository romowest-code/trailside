( function( $ ) {

    var wdtShopProductSingleSummary = function($scope, $){

        var currentWidth = window.innerWidth || document.documentElement.clientWidth;

        // Sticky Content
        if( currentWidth > 991 ) {
            $('.wdt-sticky-content').each( function (e) {
                stickyContent($(this), $);
            });
        }

        // Edit mode scripts
		if($scope.hasClass('elementor-element-edit-mode')) {

			// Loading option CSS near html element
			var customCSS = jQuery('body', parent.document).find('style[id="housefix-woo-product-summary-inline-css"]').text();
			jQuery('body', parent.document).find('style[id="housefix-woo-product-summary-inline-css"]').remove();
            if(customCSS != '') {
			    jQuery('.elementor-widget-wdt-shop-product-single-summary:first.elementor-element-edit-mode').find('.wdt-product-summary.summary.entry-summary').append('<style id="wdt-edit-mode-product-summary-style">'+customCSS+'</style>');
            }

		}

    };

  function stickyContent($stickyContent, $) {

      var $sticky = $stickyContent;
      var $stickyH = $sticky.outerHeight();
      var $stickyParentContainer = $stickyContent.parents('.elementor-row');
      var $stickyParentContainerOffset = $stickyParentContainer.offset();
      var $stickyContainer =  $stickyContent.parents('.elementor-column');
      var $stickyContainerWidth =  $stickyContainer.width();
      var $start = $stickyParentContainerOffset.top;
      var $limit = $start + $stickyParentContainer.outerHeight();

      $(window).scroll(function() {
          if ($(window).scrollTop() > $start - 10 && $(window).scrollTop() <= $limit - $stickyH - 10) {
              $sticky.css({
              'position':'fixed',
              'width':$stickyContainerWidth,
              'top': 10});
          }
          else if ($(window).scrollTop() > $limit - $stickyH - 10) {
              $sticky.css({
                      'position': 'absolute',
                      'top'     : 'auto',
                      'bottom'  : 0
                  });
          }
          else {
              $sticky.css('position', 'static');
          }
      });

  }

  $(window).on('elementor/frontend/init', function(){
    elementorFrontend.hooks.addAction('frontend/element_ready/wdt-shop-product-single-summary.default', wdtShopProductSingleSummary);
  });

} )( jQuery );