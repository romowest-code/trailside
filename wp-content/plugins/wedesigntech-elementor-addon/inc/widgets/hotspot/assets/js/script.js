(function ($) {

  const wdtHotspotWidgetHandler = function($scope, $) {

    const $this_holder = $scope.find('.wdt-hotspot-holder');
    const $this_holder_item = $this_holder[0];
    const $settings = $this_holder.data('settings');
    const $hotspot_items = $this_holder.find('.wdt-hotspot-repeater-item');
    const $deviceMode = elementorFrontend.getCurrentDeviceMode();

    $hotspot_items.each(function () {

      const $this_hotspot = $(this);
      const $this_hotspot_item = $this_hotspot[0];

      let $tooltipPlacement = $this_hotspot.data('tooltip-position');
      if($tooltipPlacement == 'global' || $tooltipPlacement == '') {
        $tooltipPlacement = $settings['tooltipPlacement'];
      }

      var $tooltipContent = $this_hotspot.data('tooltip-content');
      var $tooltipIcon = $this_hotspot.data('tooltip-icon');
      $tooltipIcon = $tooltipIcon.concat($tooltipContent);

      if($this_hotspot_item._tippy) {
        $this_hotspot_item._tippy.destroy();
      }

      const $tooltipTrigger = $settings.tooltipResponsive.tooltip_trigger[$deviceMode];

      const $options = {
        content: $tooltipIcon,
        placement: $tooltipPlacement,
        trigger: $tooltipTrigger,
        arrow: $settings['tooltipArrow'],
        appendTo: $this_holder_item,
        allowHTML: true,
        hideOnClick: 'manual' !== $tooltipTrigger,
        popperOptions: {
          strategy: 'fixed',
        },
        onShow() {
          $this_hotspot.addClass('wdt-hotspot-item-active');
        },
        onHidden() {
          $this_hotspot.removeClass('wdt-hotspot-item-active');
        },
      };

      if ('manual' !== $tooltipTrigger) {
        $options['animation'] = $settings['tooltipAnimation'];
        $options['delay'] = $settings['tooltipDelay'];
      }

      tippy($this_hotspot_item, $options);

      if (
        'manual' === $tooltipTrigger &&
        $this_hotspot_item._tippy
      ) {
        $this_hotspot_item._tippy.show();
      }

    });

  };

  $(window).on('elementor/frontend/init', function () {
		elementorFrontend.hooks.addAction('frontend/element_ready/wdt-hotspot.default', wdtHotspotWidgetHandler);
  });

})(jQuery);
