wp.customize.controlConstructor['wdt-upload'] = wp.customize.Control.extend({

	ready: function(){
		'use strict';
		var control = this;

		control.initUploadControl();
	},

	initUploadControl: function(){
		'use strict';
		var control = this,
			value   = control.setting._value;

		// Upload-File.
		control.container.on( 'click', '.upload-file-button', function( e ) {

			var image = wp.media({ multiple: false }).open().on( 'select', function() {

				// This will return the selected file from the Media Uploader, the result is an object.
				var uploadedFile = image.state().get( 'selection' ).first(),
					fileUrl,
					removeButton;

				fileUrl    = uploadedFile.toJSON().url;

				control.setting.set( fileUrl );
				removeButton = control.container.find( '.upload-file-remove-button' );

				if ( fileUrl.length ) {
					control.container.find( '.attachment-file.upload-file input' ).val( fileUrl );
				}

				if ( removeButton.length ) {
					removeButton.show();
				}
			});

			e.preventDefault();
		});

		control.container.on( 'click', '.upload-file-remove-button', function( e ) {

			var removeButton;

			e.preventDefault();

			control.setting.set( '' );
			removeButton = control.container.find( '.upload-file-remove-button' );

			control.container.find( '.attachment-file.upload-file input' ).val( '' );

			if ( removeButton.length ) {
				removeButton.hide();
			}
		});
	},
});