var BaseSlidePageView = Rocket.PageView.extend({

    className: 'slide'

    , init: function(options){
        var me = this;
        me._super(options);
        me.setupSubViews();
        setTimeout(function(){
            if( !me.viewClass || !Utils.isString(me.viewClass) ){
                throw Error('BaseSlidePageView.init: "viewClass" is undefined or is not of type String'); 
            }    
        }, 0);
    }

    , registerEvents: function(){
        var me = this, gec = me.gec;
        gec.on('slideoperation.global', me.onslideoperation, me);
        gec.on('slidebgcolor.global', me.onslidebgcolor, me);
        gec.on('release.global', me.onrelease, me);
        gec.on('save4partialedit.global', me.onsave4partialedit, me);
        gec.on('save.global', me.onsave, me);
        gec.on('newtext.global', me.onnewtext, me);
        gec.on('newimage.global', me.onnewimage, me);
        gec.on('newbutton.global', me.onnewbutton, me);
    }

    , unregisterEvents: function(){
        var me = this, gec = me.gec;
        gec.off('slideoperation.global', me.onslideoperation, me);
        gec.off('slidebgcolor.global', me.onslidebgcolor, me);
        gec.off('release.global', me.onrelease, me);
        gec.off('save4partialedit.global', me.onsave4partialedit, me);
        gec.off('save.global', me.onsave, me);
        gec.off('newtext.global', me.onnewtext, me);
        gec.off('newimage.global', me.onnewimage, me);
        gec.off('newbutton.global', me.onnewbutton, me);
    }

    , setupSubViews: function(){
        var me = this;

        me.$el.children().each(function(index, item){
            var viewClass = $(item).data('view_class');
            if(viewClass && Utils.isFunction(subViewClasses[viewClass])){
                me.append(
                    new ( 
                        subViewClasses[viewClass].extend({el: item}) 
                    ) ({isSetup: true}, me)
                    , true
                );
            }
        });
    }

    , onslideoperation: function(params){
        var me = this;

        if(me.isActivePage()){
            switch(params.action){
                case 'delete':
                    me.destroy();
                    break;
                case 'prev':
                    me.goPrev();
                    break;
                case 'next':
                    me.goNext();
                    break;
            }
        }
    }

    , onslidebgcolor: function(params){
        var me = this;
        if(!params || !params.color) return;
        if(me.isActivePage()){
            me._applyBackgroundColor({
                backgroundColor: params.color
            });
        }
    }

    , onsave: function(params){
        var me = this;
        
        params[me.action] = {
            'class': me.viewClass
            // Make sure slide is default hidden
            , 'html': me.$el.prop('outerHTML')
                        .replace(/style="display: block;"/, '')
        };
    }

    , onrelease: function(params){
        this.onsave(params);
    }

    , onsave4partialedit: function(params){
        this.onsave(params);
    }

    , onnewtext: function(params){
        var me = this, textClass,
            size = {height: 30, width: 200},
            text = {
                lineHeight: '36px'
                , color: '#fff'
                , textAlign: 'center'
                , fontSize: '26px'
            };

        if(!me.isActivePage()) return;
        
        switch(params.type){
            case 'topnewsimagetext':
                textClass = TopNewsImageTextSubView; 
                break;
            case 'scrolltext':
                textClass = ScrollTextSubView; 
                size.height = 100;
                text.fontSize = '16px';
                text.lineHeight = '26px';
                console.log('scrolltext');
                console.log(text);
                break;
            default:
                textClass = TextSubView; 
                break;
        }

        me.append(
            new textClass(
                {
                    pos: {
                        top: 100
                        , left: 50
                    }
                    , size: size 
                    , text: text 
                }
                , me
            )
            , true
        );

    }

    , onnewbutton: function(params){
        var me = this, buttonClass;

        if(!me.isActivePage()) return;

        switch(params.type){
            case 'release':
                buttonClass = ReleaseButtonSubView; 
                break;
            case 'share':
                buttonClass = ShareButtonSubView; 
                break;
            case 'link-1':
                buttonClass = LinkReleaseOnlyButtonSubView; 
                break;

            default:
                buttonClass = LinkButtonSubView; 
                break;
        }

        
        me.append(
            new buttonClass(
                {
                    pos: {
                        top: 100
                        , left: 50
                    }
                    , size: {
                        height: 30
                        , width: 160
                    }
                    , text: {
                        lineHeight: '30px'
                        , color: '#666'
                        , textAlign: 'center'
                        , fontSize: '18px'
                    }
                }
                , me
            )
            , true
        );

    }

    , onnewimage: function(params){
        var me = this,
            ImageClass,
            size = {height: 100, width: 150};

        switch(params.type){
            case 'withmask':
                ImageClass = ImageWithMaskSubView;
                break;
            case 'button':
                ImageClass = ImageButtonSubView;
                size.height = 50;
                break;
            case 'button-1':
                ImageClass = ImageEditOnlyButtonSubView;
                size.height = 50;
                break;
            case 'button-2':
                ImageClass = ImageReleaseOnlyButtonSubView;
                size.height = 50;
            case 'topnews-withmask':
                ImageClass = TopNewsImageWithMaskSubView;
                break;

            default:
                ImageClass = ImageSubView;
        }

        if(!me.isActivePage() || !params.url) return;
        
        me.append(
            new ImageClass(
                {
                    pos: {
                        top: 160
                        , left: 50
                    }
                    , size: size 
                    , text: {
                        textAlign: 'center'
                    }
                    , data: {
                        url: params.url
                        , w: params.w
                        , h: params.h
                    }
                }
                , me
            )
            , true
        );

    }

    , goNext: function(options){
        this.navigate(this._getAction('NEXT'), options);
    }

    , goPrev: function(options){
        this.navigate(this._getAction('PREV'), options);
    }

    , _getAction: function(type){
        var me = this,
            pageOrder = me.gec.getPageOrder(), isPrev, i = 0;

        switch(type){
            case 'PREV': isPrev = 1;
            case 'NEXT':
                while(i < pageOrder.length){
                    if(pageOrder[i] == me.action){
                        if(isPrev){
                            return pageOrder[i > 0 ? i - 1 : i];
                        }
                        return pageOrder[i < pageOrder.length - 1 ? i + 1 : i];
                    }
                    i++;
                }
            default:
                if(/\d+/.test(type)){
                    return pageOrder[type];
                }
                else{
                    return me.action;
                }
        } 
    }

    , destroy: function(){
        var me = this,
            action = me._getAction('PREV');

        if(action != me.action
            || (action = me._getAction('NEXT')) != me.action
            ){
            me.navigate(action, {replace: true});
            setTimeout(function(){
                delete me._router.views[me.action];
                me.gec.removeRoute(me.action)
                    .removePageOrder(me.action);
                // Don't use me._super() in another process 
                BaseSlidePageView._superClass.prototype.destroy.apply(me);
            }, 1000);
        }
        else{
            me.tip('Only 1 slide left !');
        }
    }

});

$.extend(BaseSlidePageView.prototype, CommonSettingsInterface);
