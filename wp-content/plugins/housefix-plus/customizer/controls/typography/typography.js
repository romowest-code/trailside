wp.customize.controlConstructor['wdt-typography'] = wp.customize.Control.extend({
	ready: function(){
		'use strict';
		var control = this,
			default_val = control.setting._value,
			default_fw = default_val.hasOwnProperty('font-weight') ?  default_val['font-weight'] : '';

		control.initControl();
		control.setWeight( control,
			this.container.find("select.font-family").find('option:selected').attr("data-weight"),
			default_fw
		);

		control.resetValue();
	},

	initControl: function() {
		'use strict';

		var control = this;

		// Font Family
		this.container.on("change", "select.font-family", function(){
			control.saveValue( 'font-family', jQuery( this ).val() );
			control.saveValue( 'font-fallback', jQuery( this ).find('option:selected').attr("data-fallback") );
			control.saveValue( 'font-type', jQuery( this ).find('option:selected').attr("data-fonttype") );
			control.setWeight( control, jQuery(this).find('option:selected').attr("data-weight") );
		});

		// Font Weight
		this.container.on("change", "select.font-weight", function(){
			control.saveValue( 'font-weight', jQuery( this ).val() );
		});

		// Text Transform
		this.container.on("change", "select.text-transform", function(){
			control.saveValue( 'text-transform', jQuery( this ).val() );
		});

		// Font Style
		this.container.on("change", "select.font-style", function(){
			control.saveValue( 'font-style', jQuery( this ).val() );
		});

		// Text Align
		this.container.on("change", "select.text-align", function(){
			control.saveValue( 'text-align', jQuery( this ).val() );
		});

		// Text Decoration
		this.container.on("change", "select.text-decoration", function(){
			control.saveValue( 'text-decoration', jQuery( this ).val() );
		});

		// Font Size Input
		this.container.find(".font-size input.wdt-responsive-input").each(function(){
			var $input = jQuery( this );

			$input.on("change keyup paste", function(){
				control.saveValue( "fs-" + $input.attr("data-id"), $input.val() );
			});
		});

		// Font Size Unit
		this.container.find(".font-size select.wdt-responsive-select").each(function(){
			var $input = jQuery( this );

			control.saveValue( "fs-" + $input.attr("data-id"), $input.val() );

			$input.on("change keyup", function(){
				control.saveValue( "fs-" + $input.attr("data-id"), $input.val() );
			});
		});

		// Line Height
		this.container.find("input.range-field").each(function(){
			var $input = jQuery( this ),
				$number = $input.parents(".control-wrap").find('input[type="number"]');

			$input.on("change input", function(){
				$number.attr( 'value', $input.val() );
				control.saveValue( "lh-" + $input.attr("data-id"), $input.val() );
			});
		});

		this.container.find("input.number-field").each(function(){
			var $number = jQuery( this ),
				$input = $number.parents(".control-wrap").find('input[type="range"]');

			$number.on("change input", function(){
				$input.attr( 'value', $number.val() );
				control.saveValue( "lh-" + $number.attr("data-id"), $number.val() );
			});
		});

		// Line Height Unit
		this.container.find(".line-height select.wdt-responsive-select").each(function(){
			var $input = jQuery( this );

			control.saveValue( "lh-" + $input.attr("data-id"), $input.val() );

			$input.on("change keyup", function(){
				control.saveValue( "lh-" + $input.attr("data-id"), $input.val() );
			});
		});

		// Letter Spacing Input
		this.container.find(".letter-spacing input.wdt-responsive-input").each(function(){
			var $input = jQuery( this );

			$input.on("change keyup paste", function(){
				control.saveValue( "ls-" + $input.attr("data-id"), $input.val() );
			});
		});

		// Letter Spacing Unit
		this.container.find(".letter-spacing select.wdt-responsive-select").each(function(){
			var $input = jQuery( this );

			control.saveValue( "ls-" + $input.attr("data-id"), $input.val() );

			$input.on("change keyup", function(){
				control.saveValue( "ls-" + $input.attr("data-id"), $input.val() );
			});
		});
	},

	saveValue: function( property, value ) {

		var control = this,
			input   = jQuery( '#customize-control-' + control.id.replace( '[', '-' ).replace( ']', '' ) + ' .typography-hidden-value' ),
			val = control.setting._value;

		val = jQuery.isEmptyObject( val ) ? {} : val;
		val[ property ] = value;
		jQuery( input ).attr( 'value', JSON.stringify( val ) ).trigger( 'change' );
		control.setting.set( val );
	},

	setWeight: function( control, weights, selected = '' ) {

		var $select = control.container.find("select.font-weight");
		weights = ( typeof weights != 'undefined' ) ? weights.split(",") : {};
		$select.empty();

		var $inherit = jQuery('<option></option>').attr("value", "inherit" ).text( wdtPlusTypoObject.inherit );
		$select.append( $inherit );

		jQuery.each( weights, function( index, option ){

			var $option = jQuery('<option></option>').attr("value", option ).text( wdtPlusTypoObject[option] );

			if( ( selected.length != '' ) && ( option == selected ) ) {

				$option.prop("selected",true);
			}
			$select.append( $option );
		});
	},

	resetValue: function() {
		'use strict';
		var	control = this;

		this.container.find("div.font-size .item-reset").on('click', function(){

			control.container.find('div.font-size input[data-id="desktop"]').attr('value', control.params.value['fs-desktop'] );
			control.container.find('div.font-size select[data-id="desktop-unit"]').find("option:selected").removeAttr("selected");
			control.container.find('div.font-size select[data-id="desktop-unit"]').find('option[value="'+control.params.value['fs-desktop-unit']+'"]').prop("selected", true);

			control.container.find('div.font-size input[data-id="tablet"]').attr('value', control.params.value['fs-tablet'] );
			control.container.find('div.font-size select[data-id="tablet-ls-unit"]').find("option:selected").removeAttr("selected");
			control.container.find('div.font-size select[data-id="tablet-ls-unit"]').find('option[value="'+control.params.value['fs-tablet-ls-unit']+'"]').prop("selected", true);

			control.container.find('div.font-size input[data-id="tablet-landscape"]').attr('value', control.params.value['fs-tablet-landscape'] );
			control.container.find('div.font-size select[data-id="tablet-unit"]').find("option:selected").removeAttr("selected");
			control.container.find('div.font-size select[data-id="tablet-unit"]').find('option[value="'+control.params.value['fs-tablet-unit']+'"]').prop("selected", true);

			control.container.find('div.font-size input[data-id="mobile"]').attr('value', control.params.value['fs-mobile'] );
			control.container.find('div.font-size select[data-id="mobile-unit"]').find("option:selected").removeAttr("selected");
			control.container.find('div.font-size select[data-id="mobile-unit"]').find('option[value="'+control.params.value['fs-mobile-unit']+'"]').prop("selected", true);
		});

		this.container.find("div.line-height .item-reset").on('click', function(){

			control.container.find('div.line-height input[data-id="desktop"]').each(function(){
				var val = ( typeof control.params.value['lh-desktop'] == 'undefined' ) ? '' : control.params.value['lh-desktop'];
				jQuery( this ).attr('value', val );
			});

			control.container.find('div.line-height select[data-id="desktop-unit"]').find("option:selected").removeAttr("selected");
			control.container.find('div.line-height select[data-id="desktop-unit"]').find('option[value="'+control.params.value['lh-desktop-unit']+'"]').prop("selected", true);

			control.container.find('div.line-height input[data-id="tablet"]').each(function(){

				var val = ( typeof control.params.value['lh-tablet'] == 'undefined' ) ? '' : control.params.value['lh-tablet'];
				jQuery( this ).attr('value', val );
			});
			control.container.find('div.line-height select[data-id="tablet-unit"]').find("option:selected").removeAttr("selected");
			control.container.find('div.line-height select[data-id="tablet-unit"]').find('option[value="'+control.params.value['lh-tablet-unit']+'"]').prop("selected", true);

			control.container.find('div.line-height input[data-id="tablet-landscape"]').each(function(){

				var val = ( typeof control.params.value['lh-tablet-landscape'] == 'undefined' ) ? '' : control.params.value['lh-tablet-landscape'];
				jQuery( this ).attr('value', val );
			});
			control.container.find('div.line-height select[data-id="tablet-ls-unit"]').find("option:selected").removeAttr("selected");
			control.container.find('div.line-height select[data-id="tablet-ls-unit"]').find('option[value="'+control.params.value['lh-tablet-ls-unit']+'"]').prop("selected", true);

			control.container.find('div.line-height input[data-id="mobile"]').each(function(){

				var val = ( typeof control.params.value['lh-mobile'] == 'undefined' ) ? '' : control.params.value['lh-mobile'];
				jQuery( this ).attr('value', val );
			});
			control.container.find('div.line-height select[data-id="mobile-unit"]').find("option:selected").removeAttr("selected");
			control.container.find('div.line-height select[data-id="mobile-unit"]').find('option[value="'+control.params.value['lh-mobile-unit']+'"]').prop("selected", true);

		});

		this.container.find("div.letter-spacing .item-reset").on('click', function(){

			control.container.find('div.letter-spacing input[data-id="desktop"]').attr('value', control.params.value['ls-desktop'] );
			control.container.find('div.letter-spacing select[data-id="desktop-unit"]').find("option:selected").removeAttr("selected");
			control.container.find('div.letter-spacing select[data-id="desktop-unit"]').find('option[value="'+control.params.value['ls-desktop-unit']+'"]').prop("selected", true);

			control.container.find('div.letter-spacing input[data-id="tablet"]').attr('value', control.params.value['ls-tablet'] );
			control.container.find('div.letter-spacing select[data-id="tablet-unit"]').find("option:selected").removeAttr("selected");
			control.container.find('div.letter-spacing select[data-id="tablet-unit"]').find('option[value="'+control.params.value['ls-tablet-unit']+'"]').prop("selected", true);

			control.container.find('div.letter-spacing input[data-id="tablet-landscape"]').attr('value', control.params.value['ls-tablet'] );
			control.container.find('div.letter-spacing select[data-id="tablet-ls-unit"]').find("option:selected").removeAttr("selected");
			control.container.find('div.letter-spacing select[data-id="tablet-ls-unit"]').find('option[value="'+control.params.value['ls-tablet-ls-unit']+'"]').prop("selected", true);

			control.container.find('div.letter-spacing input[data-id="mobile"]').attr('value', control.params.value['ls-mobile'] );
			control.container.find('div.letter-spacing select[data-id="mobile-unit"]').find("option:selected").removeAttr("selected");
			control.container.find('div.letter-spacing select[data-id="mobile-unit"]').find('option[value="'+control.params.value['ls-mobile-unit']+'"]').prop("selected", true);
		});
	}
});