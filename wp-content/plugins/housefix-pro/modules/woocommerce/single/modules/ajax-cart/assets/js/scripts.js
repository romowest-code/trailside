jQuery.noConflict();

jQuery(document).ready(function($){

    "use strict";

    var $warp_fragment_refresh = {
        url: wc_cart_fragments_params.wc_ajax_url.toString().replace( '%%endpoint%%', 'get_refreshed_fragments' ),
        type: 'POST',
        success: function( data ) {

            if ( data && data.fragments ) {

                $.each( data.fragments, function( key, value ) {
                    $( key ).replaceWith( value );
                });

                $( document.body ).trigger( 'wc_fragments_refreshed' );
                $( document.body ).trigger( 'added_to_cart' );

            }

        }
    };

    $('.entry-summary form.cart').on('submit', function (e) {

        if(!wdtShopObjects.enable_ajax_addtocart) {
            return;
        }

        if($(this).parents('.product').hasClass('product-type-external')) {
            return;
        }

        e.preventDefault();

        var product_url = window.location,
            form = $(this);

        form.find('.single_add_to_cart_button').addClass( 'loading' );

        var simple_addtocart = '';
        if(form.parents('.product').hasClass('product-type-simple')) {
            simple_addtocart = '&add-to-cart='+form.find('.single_add_to_cart_button').attr('value');
        }

        $.post(product_url, form.serialize() + simple_addtocart + '&_wp_http_referer=' + product_url, function (result)

        {

            var cart_dropdown = $('.widget_shopping_cart', result)
            $('.widget_shopping_cart').replaceWith(cart_dropdown); // update dropdown cart
            $.ajax($warp_fragment_refresh); // update fragments

            form.find('.single_add_to_cart_button').removeClass( 'loading' );

        });

    });

});