jQuery.noConflict();

jQuery(document).ready(function($){
    "use strict";

    var currentWidth = window.innerWidth || document.documentElement.clientWidth;

    if(currentWidth < 1200) {
        $('.product-layout-controller').parents('.product-loop-sorting-item').addClass('hidden');
    }

    if(currentWidth < 768) {
        $('.product-display-controller').parents('.product-loop-sorting-item').addClass('hidden');
    }

    if($('#primary').hasClass('page-with-sidebar')) {
        $('.product-layout-controller').parents('.product-loop-sorting-item').addClass('hidden');
    }


    // Product Change Layout
    if( $('.product-change-layout').length ){
        $('.product-change-layout').find('span').on('click', function(e){

            var this_item = $(this);

            this_item.parents('.container').find('ul.products').addClass('product-loader');


            this_item.parents('.product-change-layout').find('span').removeClass('active');
            this_item.addClass('active');

            if(this_item.parents('section').hasClass('page-with-sidebar')) {

                var $column = this_item.data('column');
                if($column == 1) {
                    var $column_class = 'wdt-col-xs-12 wdt-col-sm-12 wdt-col-md-12 wdt-col-lg-12';
                    var $wdt_column = 'wdt-columns-1';
                } else if($column == 2) {
                    var $column_class = 'wdt-col-xs-12 wdt-col-sm-12 wdt-col-md-6 wdt-col-qxlg-6 wdt-col-qxlg-6 wdt-col-lg-6';
                    var $wdt_column = 'wdt-columns-2';
                } else if($column == 3) {
                    var $column_class = 'wdt-col-xs-12 wdt-col-sm-12 wdt-col-md-6 wdt-col-qxlg-4 wdt-col-hxlg-4 wdt-col-lg-4';
                    var $wdt_column = 'wdt-columns-3';
                } else if($column == 4) {
                    var $column_class = 'wdt-col-xs-12 wdt-col-sm-12 wdt-col-md-6 wdt-col-qxlg-4 wdt-col-hxlg-4 wdt-col-lg-4';
                    var $wdt_column = 'wdt-columns-4';
                } else if($column == 5) {
                    var $column_class = 'wdt-col wdt-col-xs-12 wdt-col-sm-12 wdt-col-md-6 wdt-col-qxlg-4 wdt-col-hxlg-4 wdt-col-lg-4 wdt-col-lg-1b5';
                    var $wdt_column = 'wdt-columns-5';
                }

            } else {

                var $column = this_item.data('column');
                if($column == 1) {
                    var $column_class = 'wdt-col-xs-12 wdt-col-sm-12 wdt-col-md-12 wdt-col-lg-12';
                    var $wdt_column = 'wdt-columns-1';
                } else if($column == 2) {
                    var $column_class = 'wdt-col-xs-12 wdt-col-sm-6 wdt-col-md-6 wdt-col-qxlg-6 wdt-col-hxlg-6 wdt-col-lg-6';
                    var $wdt_column = 'wdt-columns-2';
                } else if($column == 3) {
                    var $column_class = 'wdt-col-xs-12 wdt-col-sm-6 wdt-col-md-6 wdt-col-qxlg-4 wdt-col-hxlg-4 wdt-col-lg-4';
                    var $wdt_column = 'wdt-columns-3';
                } else if($column == 4) {
                    var $column_class = 'wdt-col-xs-12 wdt-col-sm-6 wdt-col-md-6 wdt-col-qxlg-4 wdt-col-hxlg-3 wdt-col-lg-3';
                    var $wdt_column = 'wdt-columns-4';
                } else if($column == 5) {
                    var $column_class = 'wdt-col wdt-col-xs-12 wdt-col-sm-12 wdt-col-md-6 wdt-col-qxlg-4 wdt-col-hxlg-4 wdt-col-lg-4 wdt-col-lg-1b5';
                    var $wdt_column = 'wdt-columns-5';
                }

            }

            var $holder = this_item.parents('.container').find('ul.products .wdt-col');
            var $wdt_col = this_item.parents('.container').find('ul.products');

            $holder.removeClass('wdt-col-xs-12 wdt-col-sm-12 wdt-col-md-12 wdt-col-lg-12 wdt-col-xs-12 wdt-col-sm-12 wdt-col-md-6 wdt-col-qxlg-6 wdt-col-qxlg-6 wdt-col-lg-6 wdt-col-xs-12 wdt-col-sm-12 wdt-col-md-6 wdt-col-qxlg-4 wdt-col-hxlg-4 wdt-col-lg-4 wdt-col-xs-12 wdt-col-sm-12 wdt-col-md-6 wdt-col-qxlg-4 wdt-col-hxlg-4 wdt-col-lg-4 wdt-col-xs-12 wdt-col-sm-12 wdt-col-md-12 wdt-col-lg-12 wdt-col-xs-12 wdt-col-sm-6 wdt-col-md-6 wdt-col-qxlg-6 wdt-col-hxlg-6 wdt-col-lg-6 wdt-col-xs-12 wdt-col-sm-6 wdt-col-md-6 wdt-col-qxlg-4 wdt-col-hxlg-4 wdt-col-lg-4 wdt-col-xs-12 wdt-col-sm-6 wdt-col-md-6 wdt-col-qxlg-4 wdt-col-hxlg-3 wdt-col-lg-3 first');
            $holder.addClass($column_class);

            $wdt_col.removeClass('wdt-columns-4 wdt-columns-3 wdt-columns-2 first');
            $wdt_col.addClass($wdt_column);

            this_item.parents('.container').find('ul.products').removeClass('product-loader');

            // Product Listing Isotope
            setTimeout( function() {
                $('.products-apply-isotope').each(function() {
                    if(!$(this).hasClass('swiper-wrapper')) {
                        $(this).isotope({itemSelector : '.wdt-col', transformsEnabled:false });
                    }
                });
            }, 900 );

            e.preventDefault();

        });
    }

    // Product List Options
    if( $('.product-list-options').length ){
        $('.product-list-options').find('span').on('click', function(e){

            var this_item = $(this);

            this_item.parents('.container').find('ul.products').addClass('product-loader');


            this_item.parents('.product-list-options').find('span').removeClass('active');
            this_item.addClass('active');


            var $list_option = this_item.data('list-option');
            if($list_option == 'right-thumb') {
                var $list_option_class = 'product-list-right-thumb';
            } else {
                var $list_option_class = 'product-list-left-thumb';
            }

            var $holder = this_item.parents('.container').find('ul.products li.product:not(.product-category)');

            $holder.removeClass('product-list-left-thumb product-list-right-thumb');
            $holder.addClass($list_option_class);

            this_item.parents('.container').find('ul.products').removeClass('product-loader');

            e.preventDefault();

        });
    }

    // Product Change Display View
    if( $('.product-change-display').length ){
        $('.product-change-display').find('span').on('click', function(e){

            var this_item = $(this);

            this_item.parents('.container').find('ul.products').addClass('product-loader');
            var display_type = this_item.data('display');
            if( display_type == 'list' ) {
                this_item.parents('.container').find('ul.products').addClass('list-product-active');
            } else {
                this_item.parents('.container').find('ul.products').removeClass('list-product-active');
            }

            this_item.parents('.product-change-display').find('span').removeClass('active');
            this_item.addClass('active');

            var $display = this_item.data('display');

            if($display == 'list') {
                this_item.parents('.product-loop-sorting').find('.product-layout-controller').addClass('hidden');
                this_item.parents('.product-loop-sorting').find('.product-list-options-controller').removeClass('hidden');
            } else {
                this_item.parents('.product-loop-sorting').find('.product-layout-controller').removeClass('hidden');
                this_item.parents('.product-loop-sorting').find('.product-list-options-controller').addClass('hidden');
            }
            this_item.parents('.product-loop-sorting').find('.product-change-layout span').removeClass('active');
            this_item.parents('.product-loop-sorting').find('.product-change-layout span[data-column=4]').addClass('active');

            this_item.parents('.container').find('ul.products').removeClass('wdt-columns-');

            this_item.parents('.product-loop-sorting').find('.product-list-options span').removeClass('active');
            this_item.parents('.product-loop-sorting').find('.product-list-options span[data-list-option=left-thumb]').addClass('active');


            var $holder = this_item.parents('.container').find('ul.products li.product');

            $.each( $holder, function( i, val ) {

                $(val).removeClass('product-grid-view product-list-view product-list-left-thumb product-list-right-thumb');

                if(($display == 'list' && $(val).hasClass('product-category')) || $display == 'grid') {

                    $(val).addClass('product-grid-view');

                    $(val).find('.wdt-col').removeClass('wdt-col-xs-12 wdt-col-sm-12 wdt-col-md-12 wdt-col-lg-12 wdt-col-xs-12 wdt-col-sm-12 wdt-col-md-6 wdt-col-qxlg-6 wdt-col-qxlg-6 wdt-col-lg-6 wdt-col-xs-12 wdt-col-sm-12 wdt-col-md-6 wdt-col-qxlg-4 wdt-col-hxlg-4 wdt-col-lg-4 wdt-col-xs-12 wdt-col-sm-12 wdt-col-md-6 wdt-col-qxlg-4 wdt-col-hxlg-4 wdt-col-lg-4 wdt-col-xs-12 wdt-col-sm-12 wdt-col-md-12 wdt-col-lg-12 wdt-col-xs-12 wdt-col-sm-6 wdt-col-md-6 wdt-col-qxlg-6 wdt-col-hxlg-6 wdt-col-lg-6 wdt-col-xs-12 wdt-col-sm-6 wdt-col-md-6 wdt-col-qxlg-4 wdt-col-hxlg-4 wdt-col-lg-4 wdt-col-xs-12 wdt-col-sm-6 wdt-col-md-6 wdt-col-qxlg-4 wdt-col-hxlg-3 wdt-col-lg-3 first');

                    if(this_item.parents('section').hasClass('page-with-sidebar')) {
                        $(val).find('.wdt-col').addClass('wdt-col wdt-col-xs-12 wdt-col-sm-12 wdt-col-md-6 wdt-col-qxlg-4 wdt-col-hxlg-4 wdt-col-lg-4');
                    } else {
                        $(val).find('.wdt-col').addClass('wdt-col wdt-col-xs-12 wdt-col-sm-6 wdt-col-md-6 wdt-col-qxlg-4 wdt-col-hxlg-3 wdt-col-lg-3');
                    }

                } else {

                    $(val).addClass('product-list-view product-list-left-thumb');

                    $(val).find('.wdt-col').removeClass('wdt-col-xs-12 wdt-col-sm-12 wdt-col-md-12 wdt-col-lg-12 wdt-col-xs-12 wdt-col-sm-12 wdt-col-md-6 wdt-col-qxlg-6 wdt-col-qxlg-6 wdt-col-lg-6 wdt-col-xs-12 wdt-col-sm-12 wdt-col-md-6 wdt-col-qxlg-4 wdt-col-hxlg-4 wdt-col-lg-4 wdt-col-xs-12 wdt-col-sm-12 wdt-col-md-6 wdt-col-qxlg-4 wdt-col-hxlg-4 wdt-col-lg-4 wdt-col-xs-12 wdt-col-sm-12 wdt-col-md-12 wdt-col-lg-12 wdt-col-xs-12 wdt-col-sm-6 wdt-col-md-6 wdt-col-qxlg-6 wdt-col-hxlg-6 wdt-col-lg-6 wdt-col-xs-12 wdt-col-sm-6 wdt-col-md-6 wdt-col-qxlg-4 wdt-col-hxlg-4 wdt-col-lg-4 wdt-col-xs-12 wdt-col-sm-6 wdt-col-md-6 wdt-col-qxlg-4 wdt-col-hxlg-3 wdt-col-lg-3 first');
                    $(val).find('.wdt-col').addClass('wdt-col-xs-12 wdt-col-sm-12 wdt-col-md-12 wdt-col-lg-12');

                }

            });

            this_item.parents('.container').find('ul.products').removeClass('product-loader');

            // Product Listing Isotope
            setTimeout( function() {
                $('.products-apply-isotope').each(function() {
                    if(!$(this).hasClass('swiper-wrapper')) {
                        $(this).isotope({itemSelector : '.wdt-col', transformsEnabled:false });
                    }
                });
            }, 900 );

            e.preventDefault();

        });
    }

    // Product filters
    $('.product-loop-filters-area-group').each(function () {
        $(this).find('.product-loop-filters-area-title').on('click', function(e){
            var $contentItem = $(this).parents('.product-loop-sorting').next('.product-loop-filters-area-content');
            if($contentItem.length) {
                if($contentItem.hasClass('hide')) {
                    $contentItem.slideDown().removeClass('hide');
                } else {
                    $contentItem.slideUp().addClass('hide');
                }
            }
        });
    });

});