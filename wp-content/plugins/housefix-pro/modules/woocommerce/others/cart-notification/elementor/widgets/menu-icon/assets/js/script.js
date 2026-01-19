( function( $ ) {

	var wdtShopMenuIcon = function($scope, $){

        $('body').on('click', '.wdt-shop-menu-cart-icon', function( e ) {

            if($('.wdt-shop-cart-widget').hasClass('activate-sidebar-widget')) {

                $('.wdt-shop-cart-widget').addClass('wdt-shop-cart-widget-active');
                $('.wdt-shop-cart-widget-overlay').addClass('wdt-shop-cart-widget-active');

                // Nice scroll script

                var winHeight = $(window).height();
                var headerHeight = $('.wdt-shop-cart-widget-header').height();
                var footerHeight = $('.woocommerce-mini-cart-footer').height();

                var height = parseInt((winHeight-headerHeight-footerHeight), 10);

                $('.wdt-shop-cart-widget-content').height(height).niceScroll({ cursorcolor:"#000", cursorwidth: "5px", background:"rgba(20,20,20,0.3)", cursorborder:"none" });

                e.preventDefault();

            }

        });

        $('body').on('click', '.wdt-shop-cart-widget-close-button, .wdt-shop-cart-widget-overlay', function( e ) {
            $('.wdt-shop-cart-widget').removeClass('wdt-shop-cart-widget-active');
            $('.wdt-shop-cart-widget-overlay').removeClass('wdt-shop-cart-widget-active');
            e.preventDefault();
        });

	};

    $(window).on('elementor/frontend/init', function(){
		elementorFrontend.hooks.addAction('frontend/element_ready/wdt-shop-menu-icon.default', wdtShopMenuIcon);
    });

} )( jQuery );