var SublineSubView = Rocket.SubView.extend({

    className: 'subline'

    , verticalLinesTpl: [
          '<div class="vertical-subline subline-x-27"></div>' 
        , '<div class="vertical-subline subline-x-47"></div>' 
        , '<div class="vertical-subline subline-x-367"></div>' 
        , '<div class="vertical-subline subline-x-387"></div>' 
    ].join('')

    , horizontalLinesTpl: [
          '<div class="horizontal-subline subline-y-480"></div>' 
        , '<div class="horizontal-subline subline-y-568"></div>' 
        , '<div class="horizontal-subline subline-y-640"></div>' 
        , '<div class="horizontal-subline subline-y-736"></div>' 
    ].join('')

    , init: function(options){
        var me = this;
        me._super(options);
        me.$container = $('#wrapper');
        me.render();
    }

    , render: function(){
        this.drawVerticalLines()
            .drawHorizontalLines();
    }

    , registerEvents: function(){
        var me = this;
    }

    , drawVerticalLines: function(){
        var me = this;
        me.$container.append(me.verticalLinesTpl);
        return me;
    }

    , drawHorizontalLines: function(){
        var me = this;
        me.$container.append(me.horizontalLinesTpl);
        return me;
    }

});

