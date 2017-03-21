(function ( $ ) {
 
    $.fn.USlide = function( options ) {

        var settings = $.extend({
            speed: 700,
            prevButton: '.prev',
            nextButton: '.next'
        }, options );

        var item = this,
            $prev_btn = $(settings.prevButton),
            $next_btn = $(settings.nextButton),
            $slider = item.find('.slider'),
            $slide_item = item.find('.slide-item'),
            slider_width = $slider.width(),
            slide_item_width = $slide_item.width(),
            slide_item_amount = $slide_item.length,
            content_width = slide_item_width*slide_item_amount,
            max_scroll_left = content_width - slider_width;


        function prevPage(){
            var to_scroll = $slider.scrollLeft() - slider_width;
            if ( to_scroll < 0 ) {
                to_scroll = 0;
            }
            $slider.stop().animate({
                scrollLeft: to_scroll
            }, settings.speed);
        }

        function nextPage(){
            var to_scroll = $slider.scrollLeft() + slider_width;
            if ( to_scroll > max_scroll_left ) {
                to_scroll = max_scroll_left;
            }
            $slider.stop().animate({
                scrollLeft: to_scroll
            }, settings.speed);
        }

        function init(){

            $(window).resize(function(){

                if ( content_width > slider_width ) {
                    item.addClass('js-nav');
                } else {
                    item.removeClass('js-nav');
                }
                slider_width = $slider.width();
                slide_item_width = $slide_item.width();
                slide_item_amount = $slide_item.length;
                content_width = slide_item_width*slide_item_amount;
                max_scroll_left = content_width - slider_width;

            }).trigger('resize');

            $prev_btn.on('click', prevPage);
            $next_btn.on('click', nextPage);

            $slider.on('scroll', function(){
                var p = $(this).scrollLeft();
                if ( p === 0 ) {
                    $prev_btn.fadeOut();
                } else {
                    $prev_btn.fadeIn();
                }
                if ( p === max_scroll_left ) {
                    $next_btn.fadeOut();
                } else {
                    $next_btn.fadeIn();
                }
            })

        }

        init();

        return this;

    };
 
}( jQuery ));