var TopNewsImageTextSubView = TextSubView.extend({

    init: function(options){
        var me = this;
        
        options || (options = {});

        // Parent method first
        me._super(options);

        me.viewClass = 'TopNewsImageTextSubView';
    }

    , registerEvents: function(){
        var me = this, 
            gec = me.gec,
            ec = me.ec;

        me._super();

        if(me._isRelease) return;
        gec.on('release.global save4partialedit.global save.global', me.onrelease, me);
    }

    , unregisterEvents: function(){
        var me = this, 
            ec = me.ec,
            gec = me.gec;

        if(me._isRelease) return;

        gec.off('release.global save4partialedit.global save.global', me.onrelease, me);
        me._super();
    }

    , onrelease: function(views, images, topImages){
        topImages.title = this.$text.text();
    }

});
