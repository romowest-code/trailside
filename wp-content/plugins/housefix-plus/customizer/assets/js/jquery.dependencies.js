;(function ( $, window, document, undefined ) {
    'use strict';
    $.HOUSEFIXPLUSWPCUSTOMIZER = $.HOUSEFIXPLUSWPCUSTOMIZER || {};

	$.HOUSEFIXPLUSWPCUSTOMIZER.DEPENDENCY = function( el, param ) {

		var base     = this;
			base.$el = $(el);
			base.el  = el;

		base.init = function () {

			base.ruleset = $.deps.createRuleset();
			var cfg = {
				show: function( el ) {
					el.removeClass('dependency-hidden');
				},
				hide: function( el ) {
					el.addClass('dependency-hidden');
				},
				log: false,
				checkTargets: false
			};


			if( typeof ( param ) == 'undefined' ) {
				base.depRoot();
			}

			$.deps.enable( base.$el, base.ruleset, cfg );
		};

		base.depRoot = function() {

			base.$el.each( function() {

				$(this).find('[data-controller]').each( function() {
					var $this       = $(this),
						_controller = $this.data('controller').split('|'),
						_condition  = $this.data('condition').split('|'),
						_value      = $this.data('value').toString().split('|'),
						_rules      = base.ruleset;

					$.each(_controller, function(index, element) {

						var value     = _value[index] || '',
							condition = _condition[index] || _condition[0];

						_rules = _rules.createRule('[data-depend-id="'+ element +'"]', condition, value);
						_rules.include($this);
					});
				});
			});
		};

		base.init();
	};

	$.fn.HOUSEFIXPLUSWPCUSTOMIZER_DEPENDENCY = function ( param ) {
		return this.each(function () {
			new $.HOUSEFIXPLUSWPCUSTOMIZER.DEPENDENCY( this, param );
		});
	};

	$(document).ready( function() {
		$('.wp-customizer').HOUSEFIXPLUSWPCUSTOMIZER_DEPENDENCY();
	});
})( jQuery, window, document );