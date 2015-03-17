var SidePanelSubView = Rocket.SubView.extend({

    className: 'sidepanel'

    , tpl: [
          '<section class="anim-config"></section>' 
        , '<section class="font-config"></section>' 
    ].join('')

    , init: function(options){
        var me = this;

        me._super(options);
        me.render();
    }

    , render: function(){
        var me = this;
        me.$el.append(me.tpl);
    }

    , registerEvents: function(){
        var me = this;
    }

});


