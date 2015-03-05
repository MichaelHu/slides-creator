var TopNewsImageWithMaskSubView = ImageWithMaskSubView.extend({

    init: function(options){
        var me = this;
        
        options || (options = {});
        me._super(options);

        me.viewClass = 'TopNewsImageWithMaskSubView';
    }

    , onrelease: function(views, images, topImages){
        var me = this,
            $img = me.$img,
            naturalWidth = $img.data('natural-width'),
            naturalHeight = $img.data('natural-height'),
            top = $img.data('pos_top') || 0,
            left = $img.data('pos_left') || 0,

            // No data('size_width') if never been zoomed, so use css('width') instead
            width = parseInt($img.css('width')) || 1,
            ratio = width / naturalWidth,
            url = $img.attr('src'),
            cut_x, cut_y, cut_w, cut_h
            ; 

        // No need to preload top news image
        // me._super(views, images, topImages);

        if(1 == width || !naturalWidth) {
            return;
        }
        cut_x = ( -left >= 0 ? -left : 0 ) / ratio;
        cut_y = ( -top >=0 ? -top : 0 ) / ratio;
        // Top news image if of size 640 * 400
        cut_w = 640 / ratio;
        cut_w = Math.min( cut_w, naturalWidth );
        cut_h = cut_w / 1.6;

        /*
        console.log([
            ratio, left, top, cut_x, cut_y, cut_w, cut_h, naturalWidth, naturalHeight
        ].join(', '));
        */

        $.extend(
            topImages
            , {
                x: cut_x 
                , y: cut_y 
                , w: cut_w 
                , h: Math.min( cut_h, naturalHeight )
                , img_url: url
                , img_width: naturalWidth
                , img_height: naturalHeight
            }
        );

    }

});

