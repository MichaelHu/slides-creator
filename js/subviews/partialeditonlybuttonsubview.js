var PartialEditOnlyButtonSubView = TextSubView.extend({

    init: function(options){
        var me = this;
        
        options || (options = {});

        // Parent method first
        me._super(options);

        me.viewClass = 'PartialEditOnlyButtonSubView';
        if(!me._isSetup){
            me.$text.html('仅编辑模式可见');
        }

        // Hidden in release mode 
        if(me._isRelease){
            me.$el.hide();
        } 
    }

});

