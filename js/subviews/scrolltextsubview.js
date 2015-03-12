var ScrollTextSubView = TextSubView.extend({

    events: {
    }

    , textTpl: [
          '<div class="text-wrapper">'
        ,     '<div class="text"></div>'
        , '</div>'
    ].join('')

    , init: function(options){
        var me = this;
        
        options || (options = {});

        // Parent method first
        me._super(options);

        me.viewClass = 'ScrollTextSubView';

        me.$text.css({'height': 'auto', 'overflow': 'visible'});

        me.$textWrapper = me.$('.text-wrapper')
            .css({'height': '100%', 'overflow': 'hidden'})
            ;

        if(!me._isSetup){
            me.$text.html('ScrollText<br>scroll text<br>scroll text');
        }
    }

    , render: function(options){
        var me = this;
        me._super(options);
        me.tryToScroll();
    }

    , registerEvents: function(){
        var me = this, 
            gec = me.gec,
            ec = me.ec;

        me._super();

        if(me._isRelease) return;
    }

    , unregisterEvents: function(){
        var me = this, 
            ec = me.ec,
            gec = me.gec;

        if(me._isRelease) return;

        me._super();
    }

    , tryToScroll: function(){
        var me = this;

        if(!me.$text 
            || !me.$text.length 
            || !Utils.isReallyDisplay(me.el)){
            setTimeout(function(){
                me.tryToScroll();
            }, 300);
        }
        else{
            me.startToScroll();
        }

    }

    , startToScroll: function(){
        var me = this,
            height = me.$text.height(),
            wrapperHeight = me.$textWrapper.height(),
            lineHeight = parseInt(me.$text.css('line-height')),
            duration = height / lineHeight * 1;

        me.$text
            .css({
                '-webkit-transform': 'translate(0, ' + wrapperHeight + 'px)'
                , '-webkit-transition': '-webkit-transform 0s'
            })
            ;

        setTimeout(function(){
            me.$text
                .css({
                    '-webkit-transform': 'translate(0, -' + height + 'px)'
                    , '-webkit-transition': '-webkit-transform ' + duration + 's linear'
                })
                ;

            setTimeout(function(){
                me.startToScroll();
            }, duration * 1000 + 300);
        }, 100);

    }

    , onpagebeforechange: function(options){
        this._super(options);
    }

    , onafteredit: function(params){
        var me = this;

        me._super(params);
    }

    , onfontsize: function(params){
        var me = this;
        me._super(params);
    }

    , onlineheight: function(params){
        var me = this;
        me._super(params);
    }

    , ontextalign: function(params){
        var me = this;
        me._super(params);
    }

    , oncolor: function(params){
        var me = this;
        me._super(params);
    }

});

