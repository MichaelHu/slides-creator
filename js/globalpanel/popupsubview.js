var PopupSubView = Rocket.SubView.extend({

    className: 'popup'

    , init: function(options){
        this._super(options);
        this.render();
    }

    , render: function(){
        this.$el.css({
            position: 'fixed'
            , 'z-index': 999
            , top: 0
            , left: 0
            , bottom: 0
            , right: 0
            , 'background-color': 'rgba(0,0,0,0.7)'
        });
    }

    , registerEvents: function(){
        var me = this;
        me.$el.on('click', function(){
            me.close();
        });
    }
    
    , open: function(){
        this.$el.show();
    }

    , close: function(){
        this.$el.hide();
    }

    , toggle: function(){
        this.$el.toggle();
    }

});
