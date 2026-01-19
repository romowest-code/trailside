(function($) {

	var wdtProWidgetAreas = {

		addForm: function() {

			var $wrap = ( $('.sidebars-column-2').length > 0 ) ? $('.sidebars-column-2') : $('.sidebars-column-1');
			$wrap.append( $('#wdt-add-widget-template').html() );
		},

		addDeleteBtn: function() {

			$('#widgets-right').find(".widgets-sortables").each(function(){

				var $id = $(this).attr('id');
				var $includes = $id.includes("wdt-cw-");

				if($includes) {
					$(this).append( '<div class="wdt-pro-widget-area-footer">' +
							'<div class="wdt-pro-widget-area-id"> ID:' +
								'<span class="description">' + $id + '</span>' +
							'</div>' +
							'<div class="wdt-pro-widget-area-buttons">' +
								'<a href="javascript:void(0);" class="wdt-pro-widget-area-delete button-primary">' + wdtProObject.delete + '</a>' +
								'<a href="javascript:void(0);" class="wdt-pro-widget-area-delete-cancel button-primary">' + wdtProObject.cancel + '</a>' +
								'<a href="javascript:void(0);" class="wdt-pro-widget-area-delete-confirm button-primary" data-widgetarea-delete-nonce="' + wdtProObject.deleteNonce + '">' + wdtProObject.confirm + '</a>' +
							'</div>' +
						'</div>');
				}
			});

			$('.widget-liquid-right').on("click", "a.wdt-pro-widget-area-delete", function(e){
				e.preventDefault();
				$(this).hide().siblings().show();
			});

			$('.widget-liquid-right').on("click", "a.wdt-pro-widget-area-delete-cancel", function(e){
				e.preventDefault();
				$(this).hide().siblings().hide().siblings(".wdt-pro-widget-area-delete").show();
			});

			$('.widget-liquid-right').on("click", "a.wdt-pro-widget-area-delete-confirm", function(e){
				wdtProWidgetAreas.deleteWidgetArea( $(this) );
			});
		},

		deleteWidgetArea: function( item ){
			var $wrap = item.parents('.widgets-holder-wrap:eq(0)'),
				$title = $wrap.find('.sidebar-name h2'),
				$spinner = $title.find('.spinner'),
				$widget_name = $.trim($title.text()),
				$widgetarea_delete_nonce = item.attr('data-widgetarea-delete-nonce');

			$wrap.addClass('closed');
			$spinner.css('visibility', 'visible');

			$.ajax({
				type: "POST",
				url: window.ajaxurl,
				data: {
					action: 'housefix_pro_delete_widget_area',
					widget: $widget_name,
					widgetarea_delete_nonce: $widgetarea_delete_nonce,
				},
				dataType: 'json',
				success: function( response ) {

					if( response.status = "widget_area-deleted" ) {

						$wrap.slideUp(200).remove();
					}
				}
			});
		}
	};

	wdtProWidgetAreas.addForm();
	wdtProWidgetAreas.addDeleteBtn();
})(jQuery);