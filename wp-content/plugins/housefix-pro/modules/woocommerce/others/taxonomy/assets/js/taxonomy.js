jQuery.noConflict();

jQuery(document).ready(function($){
    "use strict";

    // Color Picker
    if($('.wdt-shop-color-picker-alpha').length) {
        $('.wdt-shop-color-picker-alpha').wpColorPicker();
    }

});