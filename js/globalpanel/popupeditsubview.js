var PopupEditSubView = PopupSubView.extend({

    init: function(options){
        var me = this;
        me._super(options);
        me.$popupEdit = me.$('.popup-edit-subview');
        me.$text = me.$('textarea');
        me.$confirmButton = me.$('.confirm');
    }

    , popupEditTpl: [
          '<div class="popup-edit-subview">'
        ,     '<textarea></textarea>'
        ,     '<div class="confirm">确定</div>'
        , '</div>'
    ].join('')

    , render: function(){
        var me = this;
        me._super();
        me.$el.append(me.popupEditTpl);
    }

    , registerEvents: function(){
        var me = this;
        me._super();
        me.$popupEdit.on('click', function(e){
            e.stopPropagation();
        });
        me.$confirmButton.on('click', function(e){
            e.stopPropagation();
            me.gec.trigger('afteredit.global', {
                text: me._decodeText(me.$text.val())
            });
            me.close();
        })
    }

    , setValue: function(val){
        if(val !== void 0){
            this.$text.val(this._encodeText(val));
        }
    }

    , toggle: function(val){
        var me = this;
        me._super();
        if(me.$el.css('display') != 'none'){
            me.open(val);
        }
        else{
            me.close();
        }
    }

    , open: function(val){
        this._super();
        this.setValue(val);
    }

    , _encodeText: function(text){
        return text.replace(/<br *\/?>/g, '\n')
            .replace(/&nbsp;/g, ' ')
            ;
    }

    , _decodeText: function(text){
        return text.replace(/\n/g, '<br>')
            .replace(/ /g, '&nbsp;')
            .replace(/(法|fa).*(轮|lun).*(大法)*|习近平|李克强|(六|liu|6)(四|si|4)/g, '*')
            ;
    }

    
});
