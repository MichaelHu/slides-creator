var ImageEditOnlyButtonSubView = ImageButtonSubView.extend({

    init: function(options){
        var me = this;
        
        options || (options = {});
        me._super(options);

        me.viewClass = 'ImageEditOnlyButtonSubView';

        // Hidden in partial edit mode 
        if(me._isPartialEdit){
            me.$el.show();
        } 
        // Maybe hidden in partial edit mode, show it forcely.
        else if(me._isRelease){
            me.$el.hide();
        }
    }

});

