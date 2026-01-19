wp.customize.controlConstructor['wdt-spacing'] = wp.customize.Control.extend({
	ready: function(){
		'use strict';
		var control = this;

		this.container.on( 'change keyup paste', 'input[type="number"], select.wdt-responsive-select', function() {
			control.updateValue();
		});

		control.updateConnect();
		control.resetValue();
	},

	updateValue: function() {
		'use strict';
		var	control  = this,
			newValue = {
				'top': '',
				'right': '',
				'bottom': '',
				'left': '',
				'unit': 'px',
			};

		control.container.find("input[type='number']").each(function(){
			var $id = jQuery( this ).attr("data-id"),
				$val = jQuery( this ).val();

			newValue[ $id ] = $val;
		});

		var $unit = control.container.find( 'select.wdt-responsive-select' ).val();
		newValue['unit'] = $unit;

		control.setting.set( newValue );
	},

	resetValue: function(){
		'use strict';
		var	control = this;
		control.container.find(".item-reset").on('click', function(){

			control.container.find("input[type='number']").each(function(){
				var $id = jQuery( this ).attr("data-id"),
					$val = control.params.default[ $id ];

				$val =  ( typeof $val == 'undefined' ) ? '' : $val;
				jQuery( this ).attr('value',  $val );
			});

			control.container.find('select').find("option:selected").removeAttr("selected");
			control.container.find('select').find('option[value="'+control.params.default['unit']+'"]').prop("selected", true);
			control.setting.set( control.params.value );
		});
	},

	updateConnect: function(){
		'use strict';
		var	control = this;
		control.container.find(".wdt-spacing-connected").on("click", function(){

			var $this = jQuery( this );
			$this.parent('li').removeClass( 'disconnected' );
			$this.parent().parent().find("input").addClass("connected").removeAttr( 'data-element-connect');
		});

		control.container.find(".wdt-spacing-disconnected").on("click", function(){
			var $this = jQuery( this ),
				$elements = $this.data( 'element-connect' );

			$this.parent('li').addClass( 'disconnected' );
			$this.parent().parent().find("input").addClass("connected").attr( 'data-element-connect', $elements );
		});

		jQuery( control.container ).on( 'input', '.connected', function(){
			var $element = jQuery( this ).attr( 'data-element-connect'),
				$currentFieldValue = jQuery( this ).val();

			jQuery( '.connected[data-element-connect="' + $element + '"]' ).each(function(){
				jQuery( this ).val( $currentFieldValue ).change();
			});
		});
	}
});