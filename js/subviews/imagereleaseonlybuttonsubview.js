var ImageReleaseOnlyButtonSubView = ImageButtonSubView.extend({

    init: function(options){
        var me = this;
        
        options || (options = {});
        me._super(options);

        me.viewClass = 'ImageReleaseOnlyButtonSubView';

        // Hidden in partial edit mode 
        if(me._isPartialEdit){
            me.$el.hide();
        } 
        // Maybe hidden in partial edit mode, show it forcely.
        else if(me._isRelease){
            me.$el.show();
        }
    }

});

