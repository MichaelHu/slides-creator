var TextSubView = RectSubView.extend({

    events: {
    }

    , textTpl: [
        '<div class="text"></div>'
    ].join('')

    , init: function(options){
        var me = this;
        
        options || (options = {});

        // Parent method first
        me._super(options);

        me.viewClass = 'TextSubView';
        if(!me._isSetup){
            me.$el.append(me.textTpl);
            me.$panel.append('<span class="edit icon-bianji"></span>');
        }

        me.$text = me.$('.text')
            .css({'height': '100%', 'overflow': 'hidden'})
            ;
        me.$editButton = me.$('.edit');

        if(!me._isSetup){
            me.$text.html('TextSubView');
        }
    }

    , render: function(options){
        var me = this;
        me._super();
        setTimeout(function(){
            me.applyTextSettings(options && options.text);
        }, 200); 
    }

    , registerEvents: function(){
        var me = this, 
            gec = me.gec,
            ec = me.ec;

        me._super();

        if(me._isRelease) return;

        if(me._isPartialEdit && !me._isLocked){
            me.$el.on('click', function(e){
                e.stopPropagation();
                e.preventDefault();
                me.onActivatedUnderPartialEdit();
            });
            // me.showBorder();
        }

        me.$editButton.on('touchstart mousedown', function(e){
            e.stopPropagation();
            e.preventDefault();

            me.gec.trigger('clear.global', {target: me});
            me.$editButton.addClass('on');
            setTimeout(function(){
                me.$editButton.removeClass('on');
            }, 300);
            me.isEdited = true;
            me.gec.trigger('beforeedit.global', {text: me.$text.html()});
            return;

            // Discarded
            me.$text.attr('contenteditable', 'true')
                .focus()
                .on('blur', function(e){
                    $(this).attr('contenteditable', 'false')
                        .off();
                }) 
                .on('click', function(e){
                    e.stopPropagation();
                });

        });


        ec.on('pagebeforechange', me.onpagebeforechange, me);
        gec.on('textalign.global', me.ontextalign, me);
        gec.on('color.global', me.oncolor, me);
        gec.on('fontsize.global', me.onfontsize, me);
        gec.on('lineheight.global', me.onlineheight, me);
        gec.on('afteredit.global', me.onafteredit, me);
    }

    , unregisterEvents: function(){
        var me = this, 
            ec = me.ec,
            gec = me.gec;

        if(me._isRelease) return;

        me.$editButton.off();
        ec.off('pagebeforechange', me.onpagebeforechange, me);
        gec.off('textalign.global', me.ontextalign, me);
        gec.off('color.global', me.oncolor, me);
        gec.off('fontsize.global', me.onfontsize, me);
        gec.off('lineheight.global', me.onlineheight, me);
        gec.off('afteredit.global', me.onafteredit, me);
        me._super();
    }

    , onpagebeforechange: function(options){
        this._super(options);
    }

    , onafteredit: function(params){
        var me = this;

        if(params.text !== void 0 && me.isEdited){
            me.$text.html(params.text);
        }
        me.isEdited = false;
    }

    , onfontsize: function(params){
        var me = this;
        if(me.isSelected){
            me._applyFontSize(params);
        }
    }

    , onlineheight: function(params){
        var me = this;
        if(me.isSelected){
            me._applyLineHeight(params);
        }
    }

    , ontextalign: function(params){
        var me = this;
        if(me.isSelected){
            me._applyTextAlign(params);
        }
    }

    , oncolor: function(params){
        var me = this;
        if(me.isSelected){
            me._applyColor(params);
        }
    }

    , applyTextSettings: function(opt){
        var me = this;
        me._applyFontSize(opt || me._getFontSize());
        me._applyLineHeight(opt || me._getLineHeight());
        me._applyColor(opt || me._getColor());
        me._applyTextAlign(opt || me._getTextAlign());
    }

    , onActivatedUnderPartialEdit: function(){
        var me = this;
        me.gec.trigger('clear.global', {target: me});
        // Make sure it can response to `imagechange` event
        me.isSelected = true;
        me.isEdited = true;
        me.gec.trigger('beforeedit.global', {text: me.$text.html()});
    }

});

$.extend(TextSubView.prototype, CommonSettingsInterface);
