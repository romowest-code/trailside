wp.customize.controlConstructor['wdt-slider'] = wp.customize.Control.extend({
	ready: function() {

		'use strict';
		var control = this,
			rangeInput  = control.container.find('input[type="range"]'),
			numberInput = control.container.find('input[type="number"]'),
			value       = control.setting._value;

		numberInput.attr( 'value', value);

		rangeInput.on("input change", function(){
			numberInput.attr( 'value', rangeInput.val() );
			control.setting.set( rangeInput.val() );
		});

		numberInput.on("input change", function(){
			rangeInput.attr( 'value', numberInput.val() );
			control.setting.set( numberInput.val() );
		});

		control.container.find(".slider-reset").on('click', function(){
			rangeInput.attr( 'value', control.params.default );
			numberInput.attr( 'value', control.params.default );
			control.setting.set( control.params.default );
		});
	}
});