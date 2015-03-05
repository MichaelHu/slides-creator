var ImageSubView = RectSubView.extend({

    events: {
    }

    , tpl: [
          '<div class="image">'
        ,     '<img>'
        , '</div>'
        , '<div class="inner-panel iconfont">'
        ,     '<span class="img-move" data-btn-type="img-move">&#xf01b6;</span>'
        ,     '<span class="img-upload" data-btn-type="img-upload">&#xf0024;</span>'
        ,     '<span data-btn-type="img-zoom-in">&#xf01b9;</span>'
        ,     '<span data-btn-type="img-zoom-out">&#xf01b8;</span>'
        ,     '<span data-btn-type="img-rotate">&#xf013b;</span>'
        ,     '<span data-btn-type="img-counter-rotate">&#xf013a;</span>'
        , '</div>'
        , '<div class="loading-layer"></div>'
    ].join('')

    , init: function(options){
        var me = this;
        
        options || (options = {});
        me._super(options);

        me.viewClass = 'ImageSubView';

        if(!me._isSetup){
            me.$el.append(me.tpl);
            me.$panel.append('<span class="edit">&#xf0022;</span>');
        }

        me.$image = me.$('.image');
        me.$img = me.$('img');
        me.$editButton = me.$('.edit');
        me.$loading = me.$('.loading-layer');
        me.initImage(options);

        me.$innerPanel = me.$('.inner-panel');
        me.$imgMove = me.$innerPanel.find('.img-move').removeClass('on').show();
        if(me._isRelease
            || me._isPartialEdit && me._isLocked){
            me.$innerPanel.hide();
        }
    }

    , render: function(options){
        var me = this;

        me._super();
        setTimeout(function(){
            me.applyTextSettings(options && options.image);
        }, 200);
    }

    , initImage: function(options){
        var me = this;
        if(options.data && options.data.url){
            setTimeout(function(){me.$loading.show();}, 0);
            setTimeout(function(){ 
                var params = options.data;
                me.$img.attr('src', params.url).show()
                    .on('load', function(){me.$loading.hide();});
                params.w && me.$img.data('natural-width', params.w);
                params.h && me.$img.data('natural-height', params.h);
            }, 3000);
        }
    }

    , registerEvents: function(){
        var me = this, 
            gec = me.gec,
            ec = me.ec;

        me._super();

        if(me._isRelease) return;

        if(me._isPartialEdit && !me._isLocked){
            // Default draggable when partial edit, it's infeasible up to now.
            // me.enableImageDrag();

            me.$el.on('click', function(e){
                e.stopPropagation();
                e.preventDefault();
                me.uploadImage();
            });
            // me.showBorder();
        }

        ec.on('pagebeforechange', me.onpagebeforechange, me);
        gec.on('textalign.global', me.ontextalign, me);
        gec.on('imagechange.global', me.onimagechange, me);
        gec.on('release.global save4partialedit.global save.global', me.onrelease, me);

        me.$editButton.on('touchstart', function(e){
            e.stopPropagation();
            e.preventDefault();

            me.gec.trigger('clear.global', {target: me});
            // Make sure it can response to `imagechange` event
            me.isSelected = true;
            me.$editButton.addClass('on');
            setTimeout(function(){
                me.$editButton.removeClass('on');
            }, 300);
            me.isEdited = true;
            me.gec.trigger('beforeimageedit.global', {url: me.$img.attr('src')});
            return;
        });

        me.$innerPanel.on('touchstart', function(e){
            e.preventDefault();
            e.stopPropagation();

            if(me.innerPanelLocked) return;
            me.innerPanelLocked = true;

            var $target = $(e.target).closest('span');

            switch($target.data('btn-type')){
                case 'img-move':
                    me.toggleImageMove($target);
                    break;
                case 'img-upload':
                    me.uploadImage();
                    break;
                case 'img-zoom-in':
                    me.imgZoomIn();
                    break;
                case 'img-zoom-out':
                    me.imgZoomOut();
                    break;
                case 'img-rotate':
                    me.imgRotate();
                    break;
                case 'img-counter-rotate':
                    me.imgCounterRotate();
                    break;
            }
            setTimeout(function(){
                me.innerPanelLocked = false;
            }, 300);
        });
    }

    , unregisterEvents: function(){
        var me = this, 
            ec = me.ec,
            gec = me.gec;

        if(me._isRelease) return;

        ec.off('pagebeforechange', me.onpagebeforechange, me);
        gec.off('textalign.global', me.ontextalign, me);
        gec.off('imagechange.global', me.onimagechange, me);
        gec.off('release.global save4partialedit.global save.global', me.onrelease, me);
        me.$editButton.off();
        me.$innerPanel.off();
        me._super();
    }

    , onimagechange: function(params){
        var me = this;
        if(!params || !params.url || !me.isSelected) return;

        if(me.isEdited){
            setTimeout(function(){me.$loading.show();}, 0);
            setTimeout(function(){
                me.$img.attr('src', params.url)
                    .show()
                    .on('load', function(){me.$loading.hide();});
                params.w && me.$img.data('natural-width', params.w);
                params.h && me.$img.data('natural-height', params.h);
                me.isEdited = false;
            }, 3000);
        }
    }

    , onrelease: function(views, images){
        var me = this;
        images.push(me.$img.attr('src'));
    }

    , onpagebeforechange: function(options){
        var me = this,
            to = options.to;

        me._super(options);
    }

    , ontextalign: function(params){
        var me = this;
        if(me.isSelected){
            me._applyTextAlign(params);
        }
    }

    , applyTextSettings: function(opt){
        var me = this;
        me._applyTextAlign(opt || me._getTextAlign());
    }

    , uploadImage: function(){
        var me = this;
        me.gec.trigger('clear.global', {target: me});
        // Make sure it can response to `imagechange` event
        me.isSelected = true;
        me.isEdited = true;
        me.gec.trigger('beforeimageedit.global', {url: me.$img.attr('src')});
    }

    , enableImageDrag: function(){
        var me = this;

        me.gec.trigger('clear.global', {target: me});
        me.$img.enableDrag({
            ondrag: function(deltaX, deltaY){
                me.onimgdrag.apply(me, arguments);
            }
        });
    }

    , onimgdrag: function(deltaX, deltaY){
        var me = this,
            $img = me.$img,
            top = parseInt($img.css('top')) 
                || $img.prop('offsetTop')
                || 0,
            left = parseInt($img.css('left')) 
                || $img.prop('offsetLeft')
                || 0,
            opt = {
                top: top + deltaY
                , left: left + deltaX
            };

        me._applyPos(opt, $img);
    } 

    , imgZoomIn: function(){
        var me = this,
            // me.$img.width() may be incorrect, use me.$img.css() first.
            width = parseInt(me.$img.css('width')) || me.$img.width(),
            opt = {width: width * 1.02};
        me._applySize(opt, me.$img);
    }

    , imgZoomOut: function(){
        var me = this,
            width = parseInt(me.$img.css('width')) || me.$img.width(),
            opt = {width: width * 0.98};
        me._applySize(opt, me.$img);
    }

    , imgRotate: function(isCounter){
        var me = this,
            flag = isCounter ? -1 : 1,
            delta = flag * 3,
            opt = me._getRotate(me.$img);

        opt.rotate = ( ( opt.rotate || 0 ) - 0 + delta ) % 360;
        me._applyRotate(opt, me.$img);
    }

    , imgCounterRotate: function(){
        var me = this;
        me.imgRotate(1);
    }

    , onclear: function(params){
        var me = this;

        me._super();
        me.$img.disableDrag();
    }

    , toggleImageMove: function($el){
        var me = this;
        
        me.gec.trigger('clear.global', {target: me});
        me.isEnableImageMove = !me.isEnableImageMove;
        if(me.isEnableImageMove){
            $el.addClass('on');
            me.enableImageDrag();
        }
        else{
            $el.removeClass('on');
        }
    }

});

$.extend(ImageSubView.prototype, CommonSettingsInterface);

