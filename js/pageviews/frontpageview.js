var FrontPageView = PlainPageView.extend({

    events: {
        'swipeDown': 'onswipeDown'
        , 'swipeUp': 'onswipeUp'
    }

    , tpl: [
        '<h2 style="margin-top:80px; color: #f00; font-size:32px;">FrontPageView</h2>'
    ].join('')

    , init: function(options){
        this._super(options);
        this.viewClass = 'FrontPageView';
        this.render();
    }

    , render: function(){
        var me = this;
        if(!me.isSetup){
            me._super();
            me.$el.html(me.tpl);

            me.append(
                new TextSubView(
                    {
                        pos: {
                            top: 200
                            , left: 20
                        }
                        , size: {
                            height: 36
                            , width: 200
                        }
                        , text: {
                            lineHeight: '36px'
                            , color: '#0f0'
                            , textAlign: 'center'
                            , fontSize: '26px'
                        }
                    }
                    , me
                )
                , true
            );
        }
    }

});
