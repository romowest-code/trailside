var dtRecentlyViewedProductsInit = function() {

    // Recently Viewed Products - Carousel

        var swiperProduct = [];
        var swiperIterator = 1;

        jQuery('.wdt-shop-recently-viewed-products-container.swiper-container').each(function() {

            var $swiperItem = jQuery(this);
            var swiperUniqueId = 'swiperuniqueid-'+swiperIterator;

            $swiperItem.attr('id', swiperUniqueId);

            // Generate swiper
            swiperProduct[swiperUniqueId] = new Swiper($swiperItem, {

                initialSlide: 0,
                simulateTouch: true,
                roundLengths: true,
                grabCursor: true,

                slidesPerView: 1,
                mousewheel: true,
                direction: 'horizontal',

                pagination: {
                    el: $swiperItem.find('.wdt-products-bullet-pagination'),
                    type: 'bullets',
                    clickable: true
                },

            });

            swiperIterator++;

        });


    // Recently Viewed Products - Toggle View

        jQuery(document).on('click', '.wdt-shop-recently-viewed-products-toggle-icon', function(){
            let $parentHolder = jQuery(this).parents('.wdt-shop-recently-viewed-products-holder');
            let $itemWidth = +$parentHolder.width();
            if($parentHolder.hasClass('expand')) {
                $parentHolder.animate({
                    right: -$itemWidth
                },function() {
                    $parentHolder.toggleClass('expand')
                });
            } else {
                $parentHolder.animate({
                    right:0
                },function() {
                    $parentHolder.toggleClass('expand')
                });
            }
        });

};


jQuery.noConflict();
jQuery(document).ready(function(jQuery){

    'use strict';

    if ( typeof dtrvpObjects !== 'undefined' ) {
        if(dtrvpObjects.enable_recently_viewed_products) {
            dtRecentlyViewedProductsInit();
        }
    }

});