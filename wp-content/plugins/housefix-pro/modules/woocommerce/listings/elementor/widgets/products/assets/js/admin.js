
jQuery(document).ready(function($){
    "use strict";

    // On window resize
    jQuery(window).on('resize', function() {
        // Product Listing Isotope
        jQuery('.products-apply-isotope').each(function() {
            if(!jQuery(this).hasClass('swiper-wrapper')) {
                jQuery(this).isotope({itemSelector : '.wdt-col', transformsEnabled:false });
            }
        });
    });

    if(jQuery('.products-apply-isotope').length) {
        window.dispatchEvent(new Event('resize'));
    }

});