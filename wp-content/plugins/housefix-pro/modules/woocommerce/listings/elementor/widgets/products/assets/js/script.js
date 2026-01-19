( function( $ ) {

	var wdtShopProducts = function($scope, $){

		var swiperProduct = [];
		var swiperProductOptions = [];
		var swiperIterator = 1;

		$scope.find('.wdt-products-container.swiper-container').each(function() {

			var $swiperItem = jQuery(this);
			var swiperUniqueId = 'swiperuniqueid-'+swiperIterator;
			var $carouselSettings = $swiperItem.data('carouselresponsive');

			swiperProductOptions[swiperUniqueId] = [];
			$swiperItem.attr('id', swiperUniqueId);

			// Get swiper options
			var effect = $swiperItem.attr('data-carouseleffect');
			var slidesperview = parseInt($swiperItem.attr('data-carouselslidesperview'), 10);
			if(effect == 'fade') {
				slidesperview = 1;
			}

			var slidespercolumn = 1;
			var carouselslidespercolumn = parseInt($swiperItem.attr('data-carouselslidespercolumn'), 10);
			if(effect == 'multirow') {
				slidespercolumn = carouselslidespercolumn;
			}

			var loopmode = ($swiperItem.attr('data-carouselloopmode') == 'true') ? true : false;
			var mousewheelcontrol = ($swiperItem.attr('data-carouselmousewheelcontrol') == 'true') ? true : false;

			var pagination_class = '';
			var pagination_type = '';

			var carouselbulletpagination = ($swiperItem.attr('data-carouselbulletpagination') == 'true') ? true : false;
			if(carouselbulletpagination) {
				var pagination_class = $swiperItem.find('.wdt-products-bullet-pagination');
				var pagination_type = 'bullets';
			}

			var carouselthumbnailposition = ($swiperItem.attr('data-carouselthumbnailposition') != '') ? $swiperItem.attr('data-carouselthumbnailposition') : false;
			if(carouselthumbnailposition) {
				swiperProductOptions[swiperUniqueId]['carouselthumbnailposition'] = 'vertical';
			} else {
				swiperProductOptions[swiperUniqueId]['carouselthumbnailposition'] = 'horizontal';
			}

			var scrollbar_class = '';
			var	scrollbar_hide = true;
			var carouselscrollbar = ($swiperItem.attr('data-carouselscrollbar') == 'true') ? true : false;
			if(carouselscrollbar) {
				scrollbar_class = $swiperItem.find('.wdt-products-scrollbar');
				scrollbar_hide = false;
			}

			var spacebetween = parseInt($swiperItem.attr('data-carouselspacebetween'), 10);
			if(spacebetween) {
				spacebetween = spacebetween;
			} else {
				spacebetween = 0;
			}

			var autoheight = true;
			if(effect == 'multirow') {
				autoheight = false;
				loopmode = false;
			}

			// Update breakpoints
			const $responsiveSettings = $carouselSettings['responsive'];			
			const $responsiveData = {};

			$.each($responsiveSettings, function (index, value) {
				$responsiveData[value.breakpoint] = {
					slidesPerView: value.toshow
				};
			});

			// Generate swiper
			swiperProduct[swiperUniqueId] = new Swiper('#'+swiperUniqueId, {

				initialSlide: 0,
				simulateTouch: true,
				roundLengths: true,
				//spaceBetween: spacebetween,
				keyboardControl: true,
				paginationClickable: true,
				autoHeight: autoheight,
				grabCursor: true,

				slidesPerView: slidesperview,
				slidesPerColumn: slidespercolumn,
				slidesPerColumnFill: 'row',
				loop: loopmode,
				loopFillGroupWithBlank: loopmode,
				mousewheel: mousewheelcontrol,
				direction: 'horizontal',

				pagination: {
					el: pagination_class,
					type: pagination_type,
					clickable: true
				},

				scrollbar: {
					el: scrollbar_class,
					hide: scrollbar_hide,
					draggable: true,
				},

				effect: effect,

				breakpoints : $responsiveData,

			});

			// Arrow pagination
			var arrowpagination = ($swiperItem.attr('data-carouselarrowpagination') == 'true') ? true : false;

			if(arrowpagination) {

				$swiperItem.find('.wdt-products-arrow-pagination .wdt-products-arrow-prev').on('click', function(e) {
					var swiperUniqueId = $swiperItem.attr('id');
					swiperProduct[swiperUniqueId].slidePrev();
					if(swiperProductOptions[swiperUniqueId]['autoplay_enable']) {
						swiperProduct[swiperUniqueId].autoplay.start();
					}
					e.preventDefault();
				});

				$swiperItem.find('.wdt-products-arrow-pagination .wdt-products-arrow-next').on('click', function(e) {
					var swiperUniqueId = $swiperItem.attr('id');
					swiperProduct[swiperUniqueId].slideNext();
					if(swiperProductOptions[swiperUniqueId]['autoplay_enable']) {
						swiperProduct[swiperUniqueId].autoplay.start();
					}
					e.preventDefault();
				});

			}

			swiperIterator++;

		});


		// Product Shortcode - Ajax Pagination

		jQuery( 'body' ).delegate( '.wdt-product-pagination a', 'click', function(e) {

			var this_item = jQuery(this);

			// Pagination Data
			if(this_item.parent().hasClass('prev-post')) {
				var current_page = parseInt(this_item.attr('data-currentpage'), 10)-1;
			} else if(this_item.parent().hasClass('next-post')) {
				var current_page = parseInt(this_item.attr('data-currentpage'), 10)+1;
			} else {
				var current_page = this_item.text();
			}

			var post_per_page = this_item.parents('.wdt-product-pagination').attr('data-postperpage');

			if(current_page == 1) {
				var offset = 0;
			} else if(current_page > 1) {
				var offset = ((current_page-1)*post_per_page);
			}

			var function_call = this_item.parents('.wdt-product-pagination').attr('data-functioncall');
			var output_div = this_item.parents('.wdt-product-pagination').attr('data-outputdiv');

			var shortcodeattrs = this_item.parents('.wdt-product-pagination').attr('data-shortcodeattrs');

			var productpagination_nonce = this_item.parents('.wdt-product-pagination').attr('data-productpagination-nonce');


			// Ajax call
			jQuery.ajax({
				type: "POST",
				url: wdtShopScObjects.ajaxurl,
				data:
				{
					action: function_call,
					current_page: current_page,
					offset: offset,
					post_per_page: post_per_page,
					function_call: function_call,
					output_div: output_div,
					shortcodeattrs: shortcodeattrs,
					productpagination_nonce: productpagination_nonce
				},
				beforeSend: function(){
					this_item.parents('.'+output_div).prepend( '<div class="wdt-product-loader"><i class="fa fa-spinner fa-spin"></i></div>' );
				},
				success: function (response) {
					this_item.parents('.'+output_div).replaceWith(response);
				},
				complete: function(){
					this_item.parents('.'+output_div+' .wdt-product-loader').remove();
				}
			});

			e.preventDefault();

		});


		if($scope.hasClass('elementor-element-edit-mode')) {

			// Loading option CSS near html element
			var customCSS = jQuery('body', parent.document).find('style[id="housefix-woo-non-archive-inline-css"]').text();
			jQuery('body', parent.document).find('style[id="housefix-woo-non-archive-inline-css"]').remove();
			jQuery('.elementor-widget-wdt-shop-products.elementor-element-edit-mode').find('.wdt-products-container').append('<style id="wdt-edit-mode-shop-style">'+customCSS+'</style>');

			// Loading option JS near html element
			var customJS = jQuery('body', parent.document).find('script[id="housefix-woo-non-archive-js-after"]').text();
			jQuery('body', parent.document).find('script[id="housefix-woo-non-archive-js-after"]').remove();
			jQuery('.elementor-widget-wdt-shop-products.elementor-element-edit-mode').find('.wdt-products-container').append('<script id="wdt-edit-mode-shop-script">'+customJS+'</script>');

			// On window resize
			jQuery(window).on('resize', function() {
				// Product Listing Isotope
				$scope.find('.products-apply-isotope').each(function() {
					if(!jQuery(this).hasClass('swiper-wrapper')) {
						jQuery(this).isotope({itemSelector : '.wdt-col', transformsEnabled:false });
					}
				});
			});

			if($scope.find('.products-apply-isotope').length) {
				window.dispatchEvent(new Event('resize'));
			}

		}

	};

    $(window).on('elementor/frontend/init', function(){
		elementorFrontend.hooks.addAction('frontend/element_ready/wdt-shop-products.default', wdtShopProducts);
		elementorFrontend.hooks.addAction('frontend/element_ready/tabs.default', wdtShopProducts);
		elementorFrontend.hooks.addAction('frontend/element_ready/jet-tabs.default', wdtShopProducts);
		elementorFrontend.hooks.addAction('frontend/element_ready/text-editor.default', wdtShopProducts);
    });

} )( jQuery );