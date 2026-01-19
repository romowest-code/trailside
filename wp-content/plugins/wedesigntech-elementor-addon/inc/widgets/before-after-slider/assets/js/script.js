(function ($) {

    const wdtBeforeAfterSlideWidgetHandlers = function($scope, $) {

      $("#wdt_before_after_slider").on("input change", (e) => {
        const BeforeAfterSlider = e.target.value;
        // Update the width of the foreground image
        $(".wdt-foreground-img").css("width", `${BeforeAfterSlider}%`);
        // Update the position of the slider button
        $(".wdt-slider-button").css("left", `calc(${BeforeAfterSlider}% - 18px)`);
      });
        
        return  wdtBeforeAfterSlideWidgetHandlers;
    }

    $(window).on('elementor/frontend/init', function () {
          elementorFrontend.hooks.addAction('frontend/element_ready/wdt-before-after-slider.default', wdtBeforeAfterSlideWidgetHandlers);
    });


})(jQuery);





