jQuery(document).ready(function() {

	// Attachments

		jQuery('body').delegate('.wdt-add-attachments-box', 'click', function(e) {

			var clone = jQuery('.wdt-attachments-box-item-toclone').clone();
			clone.attr('class', 'wdt-attachments-box-item').removeClass('hidden');
			clone.find('#wdt_media_attachments_titles').attr('name', 'wdt_media_attachments_titles[]').removeAttr('id').addClass('wdt_media_attachments_titles');
			clone.find('#wdt_media_attachments_items').attr('name', 'wdt_media_attachments_items[]').removeAttr('id');

			clone.appendTo('.wdt-attachments-box-item-holder');

			e.preventDefault();

		});

		jQuery('body').delegate('.wdt-remove-attachments','click', function(e){

			jQuery(this).parents('.wdt-attachments-box-item').remove();
			e.preventDefault();

		});

		if (jQuery().sortable) {
			jQuery('.wdt-attachments-box-item-holder').sortable({
				placeholder: 'sortable-placeholder'
			});
		}

});