(function ($) {
    "use strict";
	$(document).ready(function() {
        if( $("#primary").length ) {
            $('.sidenav-sticky.side-navigation')
                .theiaStickySidebar({
                    additionalMarginTop: 90,
                    containerSelector: $('#primary')
                });
        }
    });
})(jQuery);