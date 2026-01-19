(function ($) {

  const wdtDonationWidgetHandler = function($scope, $) {
    const instance = new wdtDonationWidgetHandlerInit($scope, $);
    instance.init();
  };

  var wdtDonationWidgetHandlerInit = function($scope, $) {

    var $self = this;

    var $progress_bars = $scope.find('.wdt-progressbar-container');
    var $settings = $scope.find('.wdt-donations-holder').data('settings');
    var $module_id = $settings['module_id'];
    var $bar_active_thickness = $settings.bar_active_thickness;
    var $bar_inactive_thickness = $settings.bar_inactive_thickness;
    var $bar_active_color = $settings.bar_active_color;
    var $bar_inactive_color = $settings.bar_inactive_color;
    var $enable_gradient = $settings.enable_gradient;
    var $gradient_color = $settings.gradient_color;
    var $progress_bar_values = $settings.progress_bar_design;

    let $percentage;
    let $percentage_val;

    $self.init = function() {

        $progress_bars.each(function() {

            var $progress_bar_module = $(this).find('.wdt-progressbar')[0];

            if('IntersectionObserver' in window) {
                let $observer;
                let $observerOptions = {
                    root: null,
                    rootMargin: "0px",
                    threshold: 1
                };

                $observer = new IntersectionObserver($self.initAnimationOnIntersect, $observerOptions);
                $observer.observe($progress_bar_module);
            }

        });


    }

    $self.initAnimationOnIntersect= function(entries, $observer) {

        entries.forEach((entry) => {
            if(entry.isIntersecting) {
                $self.initAnimation(entry.target);
                $observer.unobserve(entry.target)
            }
        });

    }

    $self.initAnimation = function($progress_bar_module) {

        let $progress_bar_app;

        var $progress_bar = $($progress_bar_module);
        $percentage = $progress_bar.parents('.wdt-progressbar-container').data('percentage');
        $percentage_val = $percentage / 100;

        var $options = {
            color: $bar_active_color,
            strokeWidth: $bar_active_thickness,
            trailColor: $bar_inactive_color,
            trailWidth: $bar_inactive_thickness,
            svgStyle: {
                display: 'block',
                width: '100%',
            },
            step: function ( state, bar ) {
                // Progress bar script
                var $item = $progress_bar.parents('.wdt-progressbar-container').find('.wdt-progressbar-value').html( Math.round( $progress_bar.parents('.wdt-progressbar-container').data('percentage') ) + '<sup class="wdt-progressbar-percentage">%</sup>' );
                if($progress_bar.hasClass('wdt-progressbar-content-floating') || $progress_bar.hasClass('wdt-progressbar-content-fixed-along')) {
                    $item.css('left', $progress_bar.parents('.wdt-progressbar-container').data('percentage') +'%');
                }

                // Progress circle script
                bar.setText( Math.round( $progress_bar.parents('.wdt-progressbar-container').data('percentage') ) + '<sup class="wdt-progressbar-percentage">%</sup>' );
            },
        };

        $options['text'] = {
            className: 'wdt-progressbar-value',
            style: {
              color: $bar_active_color
            }
        };

        if( $progress_bar_values == 'horizontal' ) {
            $progress_bar_app = new ProgressBar.Line($progress_bar_module, $options);
        } else if($progress_bar_values == 'circle') {
            $progress_bar_app = new ProgressBar.Circle($progress_bar_module, $options);
        }
        
        if($progress_bar_app) {
            if($enable_gradient) {
                $self.generateGradient($progress_bar);
            }
            $progress_bar_app.animate($percentage_val);
        }

    };

    $self.generateGradient = function($progress_bar) {

        var $donation_id = $progress_bar.parents('.wdt-progressbar-container').data('donation-id');
        var $svgns = 'http://www.w3.org/2000/svg';
        var $defs = document.createElementNS($svgns, 'defs');
        var $gradient = document.createElementNS($svgns, 'linearGradient');

        var $stops    = [
            { 'color': $bar_active_color, 'offset': '0%', },
            { 'color': $gradient_color, 'offset': '100%', },
        ];

        for ( var i = 0, length = $stops.length; i < length; i++ ) {
            var $stop = document.createElementNS($svgns, 'stop');
            $stop.setAttribute('offset', $stops[i].offset);
            $stop.setAttribute('stop-color', $stops[i].color);
            $gradient.appendChild( $stop );
        }

        $gradient.id = 'gradient-'+$donation_id;
        $gradient.setAttribute('gradientUnits', 'userSpaceOnUse');
        $gradient.setAttribute('x1', '0');
        $gradient.setAttribute('x2', $percentage + '%');
        $gradient.setAttribute('y1', '0');
        $gradient.setAttribute('y2', '0');
        $defs.appendChild( $gradient );

        $($progress_bar).find( 'svg' ).append( $defs );
        $($progress_bar).find( 'svg path:nth-child(2)' ).attr('stroke','url(#gradient-'+$donation_id+')');

      };

  };

  $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/wdt-donations.default', wdtDonationWidgetHandler);
  });

})(jQuery);
