(function ($) {
    "use strict";

    function cursorEffects(){

        const cursorInnerEl = document.querySelector('.wdt-cursor-inner');
        const cursorOuterEl = document.querySelector('.wdt-cursor-outer');

        // on mouse move
        window.onmousemove = function (event) {
            cursorOuterEl.style.transform = 'translate('+ event.clientX + 'px, ' + event.clientY + 'px' +')';
            cursorInnerEl.style.transform = 'translate3d('+ event.clientX + 'px, ' + event.clientY + 'px' +', 0px)';
        }

        // Links hover
        $('body').on('mouseenter', 'a, button', function() {
            cursorInnerEl.classList.add('wdt-cursor-link-hover');
            cursorOuterEl.classList.add('wdt-cursor-link-hover');
        });

        $('body').on('mouseleave', 'a, button', function() {
            cursorInnerEl.classList.remove('wdt-cursor-link-hover');
            cursorOuterEl.classList.remove('wdt-cursor-link-hover');
        });

        // Image hover
        $('body').on('mouseenter', '.elementor-widget-wdt-lightbox', function() {
            cursorInnerEl.classList.add('wdt-cursor-lightbox-hover');
            cursorOuterEl.classList.add('wdt-cursor-lightbox-hover');
        });

        $('body').on('mouseleave', '.elementor-widget-wdt-lightbox', function() {
            cursorInnerEl.classList.remove('wdt-cursor-lightbox-hover');
            cursorOuterEl.classList.remove('wdt-cursor-lightbox-hover');
        });

        // Swiper hover
        $('body').on('mouseenter', '.swiper-wrapper, .slick-slider, .pswp', function() {
            cursorInnerEl.classList.add('wdt-carousel-hover');
            cursorOuterEl.classList.add('wdt-carousel-hover');
            if($(this).parents().hasClass('wdt-product-vertical-thumb') || $(this).parents().hasClass('swiper-container-vertical')) {
                cursorInnerEl.classList.add('wdt-vertical-carousel-hover');
                cursorOuterEl.classList.add('wdt-vertical-carousel-hover');
            }
        });

        $('body').on('mouseleave', '.swiper-wrapper, .slick-slider, .pswp', function() {
            cursorInnerEl.classList.remove('wdt-carousel-hover');
            cursorOuterEl.classList.remove('wdt-carousel-hover');
            if($(this).parents().hasClass('wdt-product-vertical-thumb') || $(this).parents().hasClass('swiper-container-vertical')) {
                cursorInnerEl.classList.remove('wdt-vertical-carousel-hover');
                cursorOuterEl.classList.remove('wdt-vertical-carousel-hover');
            }
        });

        cursorInnerEl.style.visibility = 'visible';
        cursorOuterEl.style.visibility = 'visible';

        // Mouse hide after body tag
        $(document).mouseleave(function() { 
            cursorInnerEl.style.visibility = 'hidden';
            cursorOuterEl.style.visibility = 'hidden';
        });

        $(document).mouseenter(function() {
            cursorInnerEl.style.visibility = 'visible';
            cursorOuterEl.style.visibility = 'visible';
        });


    }

    if(wdtCursorObjects.enableCursorEffect) {
        cursorEffects();
    }

})(jQuery);