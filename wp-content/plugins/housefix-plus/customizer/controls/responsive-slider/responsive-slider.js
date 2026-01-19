wp.customize.controlConstructor['wdt-responsive-slider'] = wp.customize.Control.extend({
	ready: function() {
		var control = this;
		this.container.on( 'input change keyup paste', 'input[type="number"], input[type="range"]', function() {
			control.updateValue( jQuery( this ) );
		});
	},

	updateValue: function( $input ) {

		var control = this;
		var $parent = jQuery ( $input ).parents("div.control-wrap"),
			$device = $parent.attr("data-device"),
			$val = jQuery( $input ).val();

		$parent.find(":input").not( $input ).attr("value", $val );

		var _vals = control.settings.default._value;
		_vals[ $device ] = $val;

		var $hidden  = jQuery( '#customize-control-' + control.id.replace( '[', '-' ).replace( ']', '' ) + ' .responsive-slider-hidden-value' );
		jQuery( $hidden ).attr( 'value', JSON.stringify( _vals ) ).trigger( 'change' );

		control.setting.set( _vals );
	}
});