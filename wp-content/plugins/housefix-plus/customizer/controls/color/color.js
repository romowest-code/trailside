jQuery(window).on("load", function() {
  	jQuery('html').addClass('colorpicker-ready');
});
wp.customize.controlConstructor['wdt-color'] = wp.customize.Control.extend({
	ready: function(){
		'use strict';
		var control = this;

		this.container.find('.wdt-color-picker-alpha' ).wpColorPicker({
			change: function (event, ui) {

				var element = event.target;
				var color   = ui.color.toString();
				if ( jQuery('html').hasClass('colorpicker-ready') ) {
					control.setting.set( color );
			    }
			},
			clear: function (event){
				var element = jQuery(event.target).closest('.wp-picker-input-wrap').find('.wp-color-picker')[0];
			    if (element) {
			    	control.setting.set('');
			    }
			}
		});
	}
});