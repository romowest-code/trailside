wp.customize.controlConstructor['wdt-fontawesome'] = wp.customize.Control.extend({
	ready: function() {
		var control = this;

		this.container.on( 'click', 'span.fip-box', function(){

			control.updateValue( jQuery(this) );
		});

		control.toggleIcons();
		control.resetValue();
	},

	updateValue: function( span ) {

		var	control = this,
			icon = jQuery(span).children("i").attr("class");

		control.container.find("span.selected-icon i").attr("class", icon );
		control.container.find(".selector-button").trigger( "click" );
		control.setting.set( icon );
	},

	toggleIcons: function() {

		'use strict';
		var	control = this;
		control.container.find(".selector-button").on('click', function(){

			var $i = jQuery(this).children("i");

			if( $i.hasClass("fa-arrow-down") ) {

				$i.removeClass("fa-arrow-down").addClass("fa-arrow-up");
			} else if( $i.hasClass("fa-arrow-up") ) {

				$i.removeClass("fa-arrow-up").addClass("fa-arrow-down");
			}

			control.container.find(".icons-container").toggle();
		});
	},

	resetValue: function(){

		'use strict';
		var	control = this;

		control.container.find(".item-reset").on('click', function(e){
			e.preventDefault();

			var i = control.container.find("span.selected-icon i");
			i.attr("class", i.attr("data-value") );

			control.setting.set( control.params.value );
		});
	}
});