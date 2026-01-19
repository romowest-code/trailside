wp.customize.controlConstructor['wdt-responsive-spacing'] = wp.customize.Control.extend({
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
				'desktop' 			: {},
				'tablet'  			: {},
				'tablet-landscape'	: {},
				'mobile'  			: {},
				'desktop-unit'		: 'px',
				'tablet-unit'		: 'px',
				'tablet-ls-unit'	: 'px',
				'mobile-unit'		: 'px',
			};

		var $desktop_control_wrap = jQuery( control.container ).find("div.desktop.control-wrap");
		jQuery ( $desktop_control_wrap ).find("input[type='number']").each(function(){
			var $id = jQuery( this ).attr("data-id"),
				$val = jQuery( this ).val();

			newValue['desktop'][$id] = $val;
		});

		var $tablet_control_wrap = jQuery( control.container ).find("div.tablet.control-wrap");
		jQuery ( $tablet_control_wrap ).find("input[type='number']").each(function(){
			var $id = jQuery( this ).attr("data-id"),
				$val = jQuery( this ).val();

			newValue['tablet'][$id] = $val;
		});

		var $tablet_ls_control_wrap = jQuery( control.container ).find("div.tablet-landscape.control-wrap");
		jQuery ( $tablet_ls_control_wrap ).find("input[type='number']").each(function(){
			var $id = jQuery( this ).attr("data-id"),
				$val = jQuery( this ).val();

			newValue['tablet-landscape'][$id] = $val;
		});

		var $mobile_control_wrap = jQuery( control.container ).find("div.mobile.control-wrap");
		jQuery ( $mobile_control_wrap ).find("input[type='number']").each(function(){
			var $id = jQuery( this ).attr("data-id"),
				$val = jQuery( this ).val();

			newValue['mobile'][$id] = $val;
		});

		control.container.find( 'select.wdt-responsive-select' ).each( function(){
			var $input = jQuery(this),
				$item = $input.data( 'id' ),
				$item_value =$input.val();

			newValue[$item] = $item_value;
		});

		control.setting.set( newValue );
	},
	resetValue: function() {
		'use strict';
		var	control = this;
		control.container.find(".item-reset").on('click', function(){

			// Desktop
			var $desktop = control.params.value.desktop,
				$desktop_control_wrap = jQuery( control.container ).find("div.desktop.control-wrap");

			jQuery ( $desktop_control_wrap ).find("input[type='number']").each(function(){
				var $id = jQuery( this ).attr("data-id"),
					$val =  ( typeof $desktop == 'undefined' ) ? '' : $desktop[$id];

				jQuery( this ).attr('value', $val );
			});
			control.container.find('select[data-id="desktop-unit"]').find("option:selected").removeAttr("selected");
			control.container.find('select[data-id="desktop-unit"]').find('option[value="'+control.params.default['desktop-unit']+'"]').prop("selected", true);

			// Tablet
			var $tablet = control.params.value.tablet,
				$tablet_control_wrap = jQuery( control.container ).find("div.tablet.control-wrap");

			jQuery ( $tablet_control_wrap ).find("input[type='number']").each(function(){
				var $id = jQuery( this ).attr("data-id"),
					$val =  ( typeof $tablet == 'undefined' ) ? '' : $tablet[$id];

				jQuery( this ).attr('value', $val );
			});
			control.container.find('select[data-id="tablet-unit"]').find("option:selected").removeAttr("selected");
			control.container.find('select[data-id="tablet-unit"]').find('option[value="'+control.params.default['tablet-unit']+'"]').prop("selected", true);

			// Tablet Landscape
			var $tablet_ls = control.params.value["tablet-landscape"],
				$tablet_ls_control_wrap = jQuery( control.container ).find("div.tablet-landscape.control-wrap");

			jQuery ( $tablet_ls_control_wrap ).find("input[type='number']").each(function(){
				var $id = jQuery( this ).attr("data-id"),
					$val =  ( typeof $tablet_ls == 'undefined' ) ? '' : $tablet_ls[$id];

				jQuery( this ).attr('value', $val );
			});
			control.container.find('select[data-id="tablet-ls-unit"]').find("option:selected").removeAttr("selected");
			control.container.find('select[data-id="tablet-ls-unit"]').find('option[value="'+control.params.default['tablet-ls-unit']+'"]').prop("selected", true);

			// Mobile
			var $mobile = control.params.value.mobile,
				$mobile_control_wrap = jQuery( control.container ).find("div.mobile.control-wrap");

			jQuery ( $mobile_control_wrap ).find("input[type='number']").each(function(){
				var $id = jQuery( this ).attr("data-id"),
					$val =  ( typeof $mobile == 'undefined' ) ? '' : $mobile[$id];

				jQuery( this ).attr('value', $val );
			});
			control.container.find('select[data-id="mobile-unit"]').find("option:selected").removeAttr("selected");
			control.container.find('select[data-id="mobile-unit"]').find('option[value="'+control.params.default['mobile-unit']+'"]').prop("selected", true);

			control.setting.set( control.params.value );
		});
	},
	updateConnect: function() {
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

			jQuery("div.control-wrap.active").find('.connected[data-element-connect="' + $element + '"]').each(function(){
				jQuery( this ).val( $currentFieldValue ).change();
			});
		});
	},
});