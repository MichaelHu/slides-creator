var ReleaseButtonSubView = TextSubView.extend({

    init: function(options){
        var me = this;
        
        options || (options = {});

        // Parent method first
        me._super(options);

        me.viewClass = 'ReleaseButtonSubView';
        if(!me._isSetup){
            me.$text.html('发布');
        }
    }

    , registerEvents: function(){
        var me = this, 
            gec = me.gec,
            ec = me.ec;

        me._super();

        if(me._isPartialEdit) {
            // Off registration on TextSubView first,
            me.$el.off()
                // then bind new click event handler.
                .on('click', function(e){
                    gec.trigger('release.releasebutton.global');
                });
            return;
        };

    }

    , unregisterEvents: function(){
        var me = this, 
            ec = me.ec,
            gec = me.gec;

        if(me._isPartialEdit) {
            me.$el.off();
        }

        me._super();
    }

});

