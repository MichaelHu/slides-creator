var SidePanelSubView = Rocket.SubView.extend({

    className: 'sidepanel'

    , tpl: [
          '<section class="anim-config"></section>' 
        , '<section class="font-config"></section>' 
    ].join('')

    , animConfigTpl: [
          '<h2>元素动画</h2>'
        , '<div class="title">飞入方位</div>'
        , '<div class="content anim-fly-from"><select>'
        ,     '<option value="north">上</option>'
        ,     '<option value="south">下</option>'
        ,     '<option value="west">左</option>'
        ,     '<option value="east">右</option>'
        ,     '<option value="northwest">左上</option>'
        ,     '<option value="southwest">左下</option>'
        ,     '<option value="northeast">右上</option>'
        ,     '<option value="southeast">右下</option>'
        ,     '<option value="no">无</option>'
        , '</select></div>'
        , '<div class="title">飞行时间</div>'
        , '<div class="content anim-fly-duration"><input></div>'
    ].join('')

    , init: function(options){
        var me = this;

        me._super(options);
        me.render();
    }

    , render: function(){
        var me = this;
        me.$el.append(me.tpl);
        me.$animCont = me.$('.anim-config').hide();
        me.$fontCont = me.$('.font-config').hide();

        me.$animCont.html(me.animConfigTpl);
        me.$animFlyFrom = me.$animCont
            .find('.anim-fly-from select');
        me.$animFlyDuration = me.$animCont
            .find('.anim-fly-duration input');
    }

    , registerEvents: function(){
        var me = this,
            gec = me.gec;

        gec.on('beforeanimconfig.global', me.onbeforeanimconfig, me); 
        me.$animFlyFrom.on('change', function(e){
            var $target = me.$animFlyFrom;
            me.gec.trigger('afteranimconfig.global', {animFlyFrom: $target.val()});
        });
    }

    , onbeforeanimconfig: function(params){
        var me = this;

        me.$animFlyFrom.val(params.animFlyFrom || 'no');
        me.$animFlyDuration.val(params.animFlyDuration || '0s');
        me.$animCont.show();
    }

});


