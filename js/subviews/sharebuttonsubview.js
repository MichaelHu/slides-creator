var ShareButtonSubView = ReleaseOnlyButtonSubView.extend({

    init: function(options){
        var me = this;
        
        options || (options = {});

        // Parent method first
        me._super(options);

        me.viewClass = 'ShareButtonSubView';
        if(!me._isSetup){
            me.$text.html('分享');
        }
    }

    , registerEvents: function(){
        var me = this, 
            gec = me.gec,
            ec = me.ec;

        me._super();

        if(me._isRelease) {
            // Off registration on TextSubView first,
            me.$el.off()
                // then bind new click event handler.
                .on('click', function(e){
                    // gec.trigger('share.sharebutton.global');
                    location.href = 'http://m.baidu.com/news'
                        + location.search;
                });
            return;
        };

    }

    , unregisterEvents: function(){
        var me = this, 
            ec = me.ec,
            gec = me.gec;

        if(me._isRelease) {
            me.$el.off();
        }

        me._super();
    }

});

