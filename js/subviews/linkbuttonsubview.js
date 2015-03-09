var LinkButtonSubView = TextSubView.extend({

    init: function(options){
        var me = this;
        
        options || (options = {});

        // Parent method first
        me._super(options);

        me.viewClass = 'LinkButtonSubView';
        if(!me._isSetup){
            me.$text.html('链接按钮');
            me.$panel.append('<span class="edit-link">@</span>');
        }

        me.$editLinkButton = me.$('.edit-link');

        if(me._isPartialEdit && !me._isLocked){
            me.showLinkEdit();
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
                    var link = me.$text.data('link');
                    if(link){
                        location.href = link;
                    }
                });
            return;
        }

        me.$editLinkButton.on('touchstart mousedown', function(e){
            e.stopPropagation();
            e.preventDefault();

            me.gec.trigger('clear.global', {target: me});
            me.$editButton.addClass('on');
            setTimeout(function(){
                me.$editButton.removeClass('on');
            }, 300);
            me.isLinkEdited = true;
            me.gec.trigger('beforeedit.global', {text: me.$text.data('link')});
        });

    }

    , unregisterEvents: function(){
        var me = this, 
            ec = me.ec,
            gec = me.gec;

        if(me._isPartialEdit) {
            me.$el.off();
        }

        me.$editLinkButton.off();
        me._super();
    }

    , showLinkEdit: function(){
        var me = this;

        me.$panel.show()
            .find('span')
            .each(function(index, item){
                $(item).hide();
            });
        me.$editLinkButton.show();
    }
    
    , hideLinkEdit: function(){
        this.$panel.hide();
    }

    , onclear: function(params){
        var me = this;

        me._super(params);

        if(!params || params.target != me){
            me.hideLinkEdit();
        }
    }

    , onafteredit: function(params){
        var me = this;

        me._super(params);
        if(params.text !== void 0 && me.isLinkEdited){
            me.$text.data('link', params.text);
        }
        me.isLinkEdited = false;
    }

    , onActivatedUnderPartialEdit: function(){
        var me = this;
        me._super();
        me.showLinkEdit();
    }

});

