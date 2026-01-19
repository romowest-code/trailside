( function( $ ) {

    var scriptLoaded = false;

	var wdtShopProductSingleImages360Viewer = function($scope, $){

		if(scriptLoaded) {
			return;
		}

		scriptLoaded = true;


        // Gallery 360 viewer

        var productImage360Viewer = function () {

            if($('#wdt-product-image-360-viewer').length) {
                $('#wdt-product-image-360-viewer').dt360Viewer({
                    totalImages:$('#wdt-product-image-360-viewer').attr('data-count'),
                });
            }

        };

        productImage360Viewer();


        // Image gallery 360 enlarger

        $('body').on('click', '.wdt-product-image-360-viewer-enlarger', function (e) {

            $(this).parents('.wdt-product-image-360-viewer-holder').find('.wdt-product-image-360-viewer-container').addClass('wdt-product-image-360-popup-viewer');
            $(this).parents('.wdt-product-image-360-viewer-holder').find('.wdt-product-image-360-viewer').attr('id', 'wdt-product-image-360-viewer');

            var html_content = $(this).parents('.wdt-product-image-360-viewer-holder').find('.wdt-product-image-360-viewer-container')[0].outerHTML;
            $('body').append(html_content);

            $(this).parents('.wdt-product-image-360-viewer-holder').find('.wdt-product-image-360-viewer-container').removeClass('wdt-product-image-360-popup-viewer');
            $(this).parents('.wdt-product-image-360-viewer-holder').find('.wdt-product-image-360-viewer').removeAttr('id');

            productImage360Viewer();

            e.preventDefault();

        });

        $('body').on('click', '.wdt-product-image-360-viewer-close', function( e ) {
            $('.wdt-product-image-360-popup-viewer').remove();
            e.preventDefault();
        });

	};

    $(window).on('elementor/frontend/init', function(){
		elementorFrontend.hooks.addAction('frontend/element_ready/wdt-shop-product-single-images-360-viewer.default', wdtShopProductSingleImages360Viewer);
    });

    wdtShopProductSingleImages360Viewer('', $);

} )( jQuery );