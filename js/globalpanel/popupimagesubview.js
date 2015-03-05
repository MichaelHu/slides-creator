var PopupImageSubView = PopupSubView.extend({

    init: function(options){
        var me = this, type;

        me._super(options);
        me.$popupImage = me.$('.popup-image-subview');
        me.$tab = me.$('.tab');
        type = me.defaultType = me.options.defaultType || 'local';

        if(me.gec.editMode == 'FULLEDIT'){
            me.$tab.show();
        }
        else {
            me.$tab.hide();
        }

        me.updateTab(type)
            .openSubPanel(type);
    }

    , popupImageTpl: [
          '<div class="popup-image-subview">'
        ,     '<div class="tab">'
        ,         '<div class="tab-item" data-type="url">图片地址</div>'
        ,         '<div class="tab-item" data-type="local">本地上传</div>'
        ,     '</div>'
        , '</div>'
    ].join('')

    , render: function(){
        var me = this;
        me._super();
        me.$el.append(me.popupImageTpl);
    }

    , registerEvents: function(){
        var me = this;

        me._super();
        me.$popupImage.on('click', function(e){
            e.stopPropagation();
        });

        me.$tab.on('click', function(e){
            var $target = $(e.target).closest('.tab-item'),
                type;

            if(!$target.length) return;
            me.$('.tab-item').removeClass('on');
            $target.addClass('on');
            type = $target.data('type');
            me.openSubPanel(type);
            me.trigger('typechange', {type: type});
        });

        me.on('confirm', me.onconfirm, me);
    }

    , onconfirm: function(params){
        var me = this;

        if(me.isEditing){
            me.gec.trigger('imagechange.global', params);
            me.isEditing = false;
        }
        else{
            me.gec.trigger(
                'newimage.global'
                , $.extend(params, {type: me.imageType})
            );
        }

        me.close();
    }

    , updateTab: function(type){
        var me = this;
        me.$('.tab-item').each(function(index, item){
            var $item = $(item);
            if($item.data('type') == type){
                $item.addClass('on');
            }
            else{
                $item.removeClass('on');
            }
        });
        return me;
    }

    , openSubPanel: function(type){
        var me = this, panel;
        switch(type){
            case 'url': 
                if(!me.imageUrlPanel){
                    panel = me.imageUrlPanel 
                        = new ImageUrlSubView(null, me);
                    me.appendTo(panel, me.$popupImage);
                }
                break;
            case 'local': 
                if(!me.imageUploadPanel){
                    panel = me.imageUploadPanel 
                        = new ImageUploadSubView(null, me);
                    me.appendTo(panel, me.$popupImage);
                }
                break;
        }
        panel && (panel.open());
        return me;
    }

    , setValue: function(val){
        if(val !== void 0){
            // local event
            this.trigger('editimage', {url: val});
        }
    }

    , toggle: function(params){
        var me = this;
        me._super(params);

        if(params.imageType) me.imageType = params.imageType;

        if(params && params.isEditing){
            me.isEditing = true;
        }

        if(me.$el.css('display') != 'none'){
            me.open(params && params.url);
        }
        else{
            me.close();
        }
    }

    , open: function(val){
        this._super();
        this.setValue(val);
    }

    , close: function(){
        var me = this;

        me._super();
        me.gec.trigger('afterimage.global', {src: ''});
    }
    
    
});
