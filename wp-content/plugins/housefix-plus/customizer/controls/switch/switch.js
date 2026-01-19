wp.customize.controlConstructor['wdt-switch'] = wp.customize.Control.extend({
	ready: function() {
		var control = this,
			checkboxValue = control.setting._value;

		this.container.on( 'change', 'input', function(){
			checkboxValue = ( jQuery( this ).is( ':checked' ) ) ? true : false;
			control.setting.set( checkboxValue );
		});
	}
});