var PopupSlideConfigSubView = PopupSubView.extend({

    init: function(options){
        var me = this;
        me._super(options);
        me.$panel = me.$('.popupslideconfig');
        me.$templateInfo = me.$('.template-info')
            .val(me.gec.templateName || 'default');
    }

    , popupSlideConfigTpl: [
          '<div class="popupslideconfig">'
        ,      '<div class="color"><b>背景颜色</b><input class="color-picker"></div>'
        ,      '<div class="template"><b>贺卡模板</b>'
        ,           '<input class="template-info" type="text" value="default">'
        ,      '</div>'
        , '</div>'
    ].join('')

    , render: function(){
        var me = this; 

        me._super();
        me.$el.html(me.popupSlideConfigTpl);
        me.createColorPicker();
        return me;
    } 

    , registerEvents: function(){
        var me = this;

        me._super();
        me.$panel.on('click', function(e){
            e.stopPropagation();
        });

        me.$templateInfo.on('change', function(){
            me.ec.trigger('templateinfochange', {'template': this.value});
        });
    }

    , createColorPicker: function(){
        var me = this,
            // Must be 6 hex digits
            initialColor = '#67890a';

        $$(me.$('.color-picker')[0]).css('color', initialColor).spectrum({
            color: initialColor
            , showInput: true
            // , showButtons: false
            , preferredFormat: 'hex3'
            // , allowEmpty: true
            // , appendTo: me.$el
            // , cancelText: ''
            // , showInitial: true
            , clickoutFiresChange: true
            , showPalette: true
            // , showPaletteOnly: true
            , palette: [
                ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
                ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
                ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
                ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
                ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
                ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
                ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
                ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
            ]
            , change: function(color){
                me.gec.trigger('slidebgcolor.global', {color: color.toHexString()});
            }
        });
    }

});
