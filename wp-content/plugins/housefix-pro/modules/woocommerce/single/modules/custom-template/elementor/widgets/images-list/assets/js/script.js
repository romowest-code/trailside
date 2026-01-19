( function( $ ) {

	var wdtShopProductSingleImagesList = function($scope, $){

		$('body').on('click', '.wdt-product-image-gallery-thumb-enlarger', function (e) {

			var pswpElement = document.querySelectorAll('.pswp')[0];

			// collect all images
			var items = [];
			var image_gallery = $(this).parents('.wdt-product-image-gallery-container').find('.wdt-product-image');

			if ( image_gallery.length ) {

				image_gallery.each( function( i, el ) {

					var image_tag = $(el).find( 'img' );

					if ( image_tag.length ) {

						var large_image_src = image_tag.attr( 'data-large_image' ),
							large_image_w   = image_tag.attr( 'data-large_image_width' ),
							large_image_h   = image_tag.attr( 'data-large_image_height' ),
							item            = {
								src  : large_image_src,
								w    : large_image_w,
								h    : large_image_h,
								title: image_tag.attr( 'data-caption' ) ? image_tag.attr( 'data-caption' ) : image_tag.attr( 'title' )
							};
						items.push( item );

					}

				} );

			}

			var index = $(this).parents('.wdt-product-image-gallery-container').find('.swiper-slide.swiper-slide-active').index();

			// define options (if needed)
			var options = {
				// optionName: 'option value'
				// for example:
				index: index // start at first slide
			};

			// Initializes and opens PhotoSwipe
			var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
			gallery.init();

			e.preventDefault();

		});

	};

    $(window).on('elementor/frontend/init', function(){
		elementorFrontend.hooks.addAction('frontend/element_ready/wdt-shop-product-single-images-list.default', wdtShopProductSingleImagesList);
    });

} )( jQuery );