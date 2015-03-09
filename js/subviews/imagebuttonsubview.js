var ImageButtonSubView = ImageSubView.extend({

    init: function(options){
        var me = this;
        
        options || (options = {});
        me._super(options);

        me.viewClass = 'ImageButtonSubView';

        if(!me._isSetup){
            me.$innerPanel.append('<span class="edit-link">@</span>');
        }

        me.$editLinkButton = me.$innerPanel.find('.edit-link');
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
                    var link = me.$el.data('link');
                    if(link){
                        location.href = link;
                    }
                });
            return;
        }

        gec.on('afteredit.global', me.onafteredit, me);
        me.$editLinkButton.on('touchstart mousedown', function(e){
            e.stopPropagation();
            e.preventDefault();

            me.gec.trigger('clear.global', {target: me});
            // Make sure it can response to `imagechange` event
            me.isSelected = true;
            me.$editLinkButton.addClass('on');
            setTimeout(function(){
                me.$editLinkButton.removeClass('on');
            }, 300);
            me.isLinkEdited = true;
            me.gec.trigger('beforeedit.global', {url: me.$el.data('link')});
            return;
        });

    }

    , unregisterEvents: function(){
        var me = this, 
            ec = me.ec,
            gec = me.gec;

        if(me._isRelease) return;

        me.$editLinkButton.off();
        gec.off('afteredit.global', me.onafteredit, me);
        me._super();
    }

    , onafteredit: function(params){
        var me = this;

        if(params.text !== void 0 && me.isLinkEdited){
            me.$el.data('link', params.text);
        }
        me.isLinkEdited = false;
    }

});

