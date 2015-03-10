var PanelGlobalView = Rocket.GlobalView.extend({

    className: 'global-panel mobile'

    , events: {
        'tap .panel span': 'onpanelbuttonclick'
        , 'mousedown .panel span': 'onpanelbuttonclick'
    }

    , contTpl: [
          '<div class="panel-wrapper">'
        ,   '<div class="panel iconfont">'
        ,     '<span class="panel-bottom icon-xiangxia"></span>'
        ,     '<span class="panel-top icon-xiangshang1"></span>'
        ,     '<span class="slide-new icon-jia1"></span>'
        ,     '<span class="slide-delete icon-jian1"></span>'
        ,     '<span class="slide-prev icon-xiangzuo2"></span>'
        ,     '<span class="slide-next icon-xiangyou2"></span>'
        ,     '<span class="slide-config icon-shezhi"></span>'
        ,     '<span class="text-new icon-wenbenshuru"></span>'
        ,     '<span class="topnewsimagetext-new icon-wenbenshuru"></span>'

        ,     '<span class="image-new icon-tupian"></span>'
        ,     '<span class="image-withmask-new icon-tupian"></span>'
        ,     '<span class="image-topnews-withmask-new icon-tupian"></span>'
        ,     '<span class="image-button-new">图</span>'
        ,     '<span class="image-button-1-new">图</span>'
        ,     '<span class="image-button-2-new">图</span>'

        ,     '<span class="button-share-new">享</span>'
        ,     '<span class="button-release-new">发</span>'
        ,     '<span class="button-link-new">链</span>'
        ,     '<span class="button-link-1-new">链</span>'

        ,     '<span class="boxalign-left icon-juzuo"></span>'
        ,     '<span class="boxalign-center icon-juzhong"></span>'
        ,     '<span class="boxalign-right icon-juyou"></span>'
        ,     '<span class="boxalign-bottom">底</span>'
        ,     '<span class="boxalign-left-a icon-juzuo"></span>'
        ,     '<span class="boxalign-center-a icon-juzhong"></span>'
        ,     '<span class="boxalign-right-a icon-juyou"></span>'
        ,     '<span class="boxalign-bottom-a">底</span>'

        ,     '<span class="layer-up icon-xiangshang"></span>'
        ,     '<span class="layer-down icon-paixu"></span>'
        ,     '<span class="align-left icon-juzuo"></span>'
        ,     '<span class="align-center icon-juzhong"></span>'
        ,     '<span class="align-right icon-juyou"></span>'
        ,     '<span class="font-color icon-ziti"></span>'
        ,     '<span class="zoom-in icon-fangda"></span>'
        ,     '<span class="zoom-out icon-suoxiao"></span>'
        ,     '<span class="preview icon-dianshiji"></span>'
        ,     '<span class="save icon-baocun"></span>'
        ,     '<span class="save4partialedit icon-shangchuan"></span>'
        ,     '<span class="release icon-fasong"></span>'
        ,   '</div>'
        , '</div>'
    ].join('')

    , contTpl4Desktop: [
          '<div class="panel-wrapper">'
        ,   '<div class="panel">'
        ,     '<span class="slide-new">添加页</span>'
        ,     '<span class="slide-delete">删除页</span>'
        ,     '<span class="slide-config">页配置</span>'
        ,     '<span class="slide-prev">前页</span>'
        ,     '<span class="slide-next">后页</span>'

        ,     '<span class="separator"></span>'

        ,     '<span class="text-new">新文本</span>'
        ,     '<span class="topnewsimagetext-new">新头条文本</span>'

        ,     '<span class="separator"></span>'

        ,     '<span class="image-new">新图片</span>'
        ,     '<span class="image-withmask-new">新图片（带遮罩）</span>'
        ,     '<span class="image-topnews-withmask-new">新头条图片（带遮罩）</span>'

        ,     '<span class="separator"></span>'

        ,     '<span class="image-button-new">新图片按钮</span>'
        ,     '<span class="image-button-1-new">新图片按钮1</span>'
        ,     '<span class="image-button-2-new">新图片按钮2</span>'

        ,     '<span class="button-share-new">分享按钮</span>'
        ,     '<span class="button-release-new">发布按钮</span>'
        ,     '<span class="button-link-new">链接按钮</span>'
        ,     '<span class="button-link-1-new">链接按钮1</span>'



        ,     '<span class="separator"></span>'

        ,     '<span class="boxalign-left">居左</span>'
        ,     '<span class="boxalign-center">居中</span>'
        ,     '<span class="boxalign-right">居右</span>'
        ,     '<span class="boxalign-bottom">居底</span>'
        ,     '<span class="boxalign-left-a">左固定</span>'
        ,     '<span class="boxalign-center-a">中线固定</span>'
        ,     '<span class="boxalign-right-a">右固定</span>'
        ,     '<span class="boxalign-bottom-a">底固定</span>'


        ,     '<span class="separator"></span>'

        ,     '<span class="layer-up">上移一层</span>'
        ,     '<span class="layer-down">下移一层</span>'

        ,     '<span class="separator"></span>'

        ,     '<span class="align-left">文本居左</span>'
        ,     '<span class="align-center">文本居中</span>'
        ,     '<span class="align-right">文本居右</span>'
        ,     '<span class="font-color">字号&颜色</span>'

        ,     '<span class="separator"></span>'

        ,     '<span class="zoom-in">放大</span>'
        ,     '<span class="zoom-out">缩小</span>'

        ,     '<span class="separator"></span>'

        ,     '<span class="preview">预览</span>'
        ,     '<span class="save">保存</span>'
        ,     '<span class="save4partialedit">保存用于部分编辑</span>'
        ,     '<span class="release">发布</span>'
        ,   '</div>'
        , '</div>'
    ].join('')

    , init: function(options){
        var me = this;
        me.render();
        me.$panel = me.$('.panel');

        if(me.gec.editMode == 'FULLEDIT'){
            if($(window).width() > 500){
                me.$el.removeClass('mobile')
                    .addClass('desktop');
            }
            else{
                me.initIScroll();
            }
        }
        else{
            me.hide();
        }

        me.drawSubline();
    }

    , registerEvents: function(){
        var me = this,
            ec = me.ec,
            gec = me.gec;
        gec.on('routechange', me.onroutechange, me);
        gec.on('beforeedit.global', me.onbeforeedit, me);
        gec.on('beforeimageedit.global', me.onbeforeimageedit, me);
        gec.on('release.releasebutton.global', me.onreleasefromreleasebutton, me);
        ec.on('templateinfochange', me.ontemplateinfochange, me);
    }

    , render: function(){
        var me = this;
        me.$el.html($(window).width() > 500 ? me.contTpl4Desktop : me.contTpl)
            .appendTo('body');

        // Default to bottom
        if($(window).width() <= 500){
            me.positionPanel('bottom');
        }
    }

    , initIScroll: function(){
        var me = this;

        me.iScroll = new IScroll(
            me.$('.panel-wrapper')[0] 
            , {
                scrollX: true
                , scrollY: false
                , mouseWheel: true
                , bounnce: true
            }
        );

        // Delay to make sure width of panel is updated correctly.
        setTimeout(function(){
            me.refreshIScroll();
        }, 200);
    }

    , refreshIScroll: function(){
        var me = this, totalWidth = 0, $panel = me.$panel;
        $.each($panel.children(), function(index, item){
            var $item = $(item);
            totalWidth += $item.width();
        });
        totalWidth += 16 * parseInt(me.$('.boxalign-center').css('margin-left'));
        setTimeout(function(){
            $panel.width(totalWidth );
            setTimeout(function(){
                me.iScroll.refresh();
            }, 100);
        }, 300);
    }

    , onroutechange: function(params){
        this.currentAction = params.to.action;
    }

    , clearState: function(){
        this.gec.trigger('clear.global', {target: this});
    }

    , onpanelbuttonclick: function(e){
        var me = this,
            $btn = $(e.target).closest('span'),
            cls = $btn[0].className;

        $btn.addClass('on');
        setTimeout(function(){
            $btn.removeClass('on');
        }, 300);

        if(/^align-(\w+)/.test(cls)){
            var align = RegExp.$1;
            me.gec.trigger('textalign.global', {textAlign: align});
        }
        else if(/^boxalign-((left|right|center|bottom)(-a)?)/.test(cls)){
            me.gec.trigger('boxalign.global', {type: RegExp.$1});
        }
        else if(/panel-(bottom|top)/.test(cls)){
            me.clearState();
            me.positionPanel(RegExp.$1);
        }
        else if(/slide-new/.test(cls)){
            me.clearState();
            me.toggleSlideNewPanel();
        }
        else if(/slide-config/.test(cls)){
            me.clearState();
            me.toggleSlideConfigPanel();
        }
        else if(/slide-(next|prev|delete)/.test(cls)){
            var action = RegExp.$1;
            me.clearState();
            me.gec.trigger('slideoperation.global', {action: action});
        }
        else if(/layer-(up|down)/.test(cls)){
            var action = RegExp.$1;
            me.gec.trigger('layer.global', {action: action});
        }
        else if(/(text|topnewsimagetext)-new/.test(cls)){
            var action = RegExp.$1;
            me.clearState();
            me.gec.trigger('newtext.global', {type: action});
        }
        else if(/image-(|withmask|topnews-withmask|button|button-\d)-?new/.test(cls)){
            var action = RegExp.$1;
            me.clearState();
            me.togglePopupImagePanel({imageType: action});
        }
        else if(/button-(release|share|image|link|link-1)-new/.test(cls)){
            var action = RegExp.$1;
            me.clearState();
            me.gec.trigger('newbutton.global', {type: action});
        }
        else if(/font-color/.test(cls)){
            me.toggleFontColorPanel();
        }
        else if(/zoom-(in|out)/.test(cls)){
            var action = RegExp.$1;
            me.gec.trigger('zoom.global', {action: action});
        }
        else if(/preview/.test(cls)){
            me.clearState();
            me.gec.trigger('clear.global preview.global');
            me.previewSlides();
        }
        else if(/save4partialedit|release|save/.test(cls)){
            var action = RegExp['$&'];
            me.onsave(action);
        }

    }

    , onsave: function(action){
        var me = this,
            slidesConfig = {
                order: me.gec.pageOrder
                , views: {}
                , images: []
                , topNewsImage: {}
                , isRelease: action == 'release' ? true : false
                , editMode: action == 'save4partialedit'
                    ? 'PARTIALEDIT' 
                    : action == 'save'
                        ? 'FULLEDIT'
                        : 'RELEASE'
            };

        if(!me.isPreviewed && !me.gec.isAllPagesOpened()){
            me.tip('Please preview first.');
            setTimeout(function(){
                me.previewSlides(function(){
                    me.onsave(action);
                });
            }, 1000);
            return;
        }
        me.gec
            .trigger('clear.global')
            .trigger(
                action + '.global'
                , slidesConfig.views
                , slidesConfig.images
                , slidesConfig.topNewsImage
            );

        me.saveSlides(slidesConfig, action);
    }

    , onreleasefromreleasebutton: function(){
        this.onsave('release');
    }

    , onbeforeedit: function(params){
        this.togglePopupEditPanel(params);
    }

    , onbeforeimageedit: function(params){
        $.extend(params, {isEditing: true});
        this.togglePopupImagePanel(params);
    }

    , toggleFontColorPanel: function(){
        var me = this, panel = me.fontColorPanel;
        if(!panel){
            panel = me.fontColorPanel
                = new PopupFontColorSubView(null, me);
            me.appendTo(panel, 'body'); 
        }
        panel.toggle();
    }

    , toggleSlideNewPanel: function(){
        var me = this, panel = me.slideNewPanel;
        if(!panel){
            panel = me.slideNewPanel
                = new PopupSlideNewSubView(null, me);
            me.appendTo(panel, 'body'); 
        }
        panel.toggle();
    }

    , toggleSlideConfigPanel: function(){
        var me = this, panel = me.slideConfigPanel;
        if(!panel){
            panel = me.slideConfigPanel
                = new PopupSlideConfigSubView(null, me);
            me.appendTo(panel, 'body'); 
        }
        panel.toggle();
    }

    , togglePopupImagePanel: function(params){
        var me = this, panel = me.popupImagePanel;
        if(!panel){
            panel = me.popupImagePanel
                = new PopupImageSubView(null, me);
            me.appendTo(panel, 'body'); 
        }
        panel.toggle(params);
    }

    , togglePopupEditPanel: function(params){
        var me = this, panel = me.popupEditPanel;
        if(!panel){
            panel = me.popupEditPanel
                = new PopupEditSubView(null, me);
            me.appendTo(panel, 'body'); 
        }
        panel.toggle(params && params.text || {}.text);
    }

    , positionPanel: function(pos){
        var me = this;

        if('top' == pos){
            me.$el.css({
                top: 0
                , bottom: 'auto'
            });
        }

        if('bottom' == pos){
            me.$el.css({
                bottom: 0
                , top: 'auto'
            });
        }
    }

    , previewSlides: function(callback){
        var me = this
            , order = me.gec.pageOrder
            , i = 0;

        me.tip('Preview start.');
        _play();
        me.isPreviewed = true;

        function _play(){
            if(i < order.length){
                me.navigate(order[i++]);
                setTimeout(function(){_play();}, 2000);
            }
            else{
                me.tip('Preview finish.');
                setTimeout(function(){
                    callback && callback();
                }, 1000);
            }
        }
    }

    , saveSlides: function(config, mode){
        var me = this, topImage = config.topNewsImage;

        // console.log(escape(JSON.stringify(config)));
        // var tmp;
        // console.log((tmp = specialEncode(JSON.stringify(config))));
        // console.log(unescape(tmp));
        me.ensureSendForm();
        me.$inputContent.val(specialEncode(JSON.stringify(config)));
        me.$inputTemplate.val(me.gec.templateName);
        me.$inputImgUrl.val(topImage.img_url); 
        me.$inputImgWidth.val(topImage.img_width); 
        me.$inputImgHeight.val(topImage.img_height); 
        me.$inputTitle.val(topImage.title); 
        if(navigator.cookieEnabled){
            var match = document.cookie.match(/BAIDUID=([^;]*)/);
            match && me.$inputCuid.val(match[1]); 
        }
        me.$form.submit();
        window.__cardAsyncCallback__ = function(opt){
            var href;
            if(opt && !opt.cardid) return;
            switch(mode){
                case 'save4partialedit':
                    href = './partialedit.html';
                    break;
                case 'release':
                    href = './index.html';
                    // Goto webapp when partial edit
                    if(me.gec.editMode == 'PARTIALEDIT'){
                        href = 'http://m.baidu.com/news';
                    }
                    break;
                case 'save':
                    href = './fulledit.html';
                    break;
            }

            setTimeout(function(){
                location.href = href
                    + '?cardid=' + opt.cardid
                    + '&cut_x=' + ( topImage.x || 0 )
                    + '&cut_y=' + ( topImage.y || 0 )
                    + '&cut_w=' + ( topImage.w || 640 )
                    + '&cut_h=' + ( topImage.h || 400 );
            }, 1000);
        };
    }

    , ensureSendForm: function(){
        var me = this,
            $form = me.$form,
            formTpl = [
                  '<form action="' + global_greetingcard_server + '"' 
                ,     ' method="POST" target="__hidden_iframe__">'
                ,     '<input name="action" type="hidden" value="add">'
                ,     '<input name="cuid" type="hidden" value="cuid">'
                ,     '<input name="redirect" type="hidden"'
                ,         ' value="' + global_land_page + '">'
                ,     '<input name="maxwidth" type="hidden" value="800">'
                ,     '<input name="name" type="hidden" value="name">'
                ,     '<input name="title" type="hidden" value="title">'
                ,     '<input name="template" type="hidden" value="template">'
                ,     '<input name="content" type="hidden" value="content">'
                ,     '<input name="img_url" type="hidden" value="http://myslides.baidu.com">'
                ,     '<input name="img_width" type="hidden" value="1200">'
                ,     '<input name="img_height" type="hidden" value="600">'
                , '</form>'
            ].join('');

        if(!$form){
            me._ensureHiddenIFrame();
            $form = me.$form = $(formTpl).appendTo('body').hide();
            me.$inputCuid = $form.find('input[name="cuid"]'); 
            me.$inputName = $form.find('input[name="name"]'); 
            me.$inputTitle = $form.find('input[name="title"]'); 
            me.$inputTemplate = $form.find('input[name="template"]'); 
            me.$inputContent = $form.find('input[name="content"]'); 
            me.$inputImgUrl = $form.find('input[name="img_url"]'); 
            me.$inputImgWidth = $form.find('input[name="img_width"]'); 
            me.$inputImgHeight = $form.find('input[name="img_height"]'); 
        }
    }

    , _ensureHiddenIFrame: function(){
        if($('#__hidden_iframe__').length) return;
        $(
            '<iframe id="__hidden_iframe__" name="__hidden_iframe__" style="display:none;"></iframe>'
        ).appendTo('body');
    }

    , ontemplateinfochange: function(params){
        if(params && params.template){
            this.gec.templateName = params.template;
        }
    }

    , drawSubline: function(){
        var me = this;
        new SublineSubView(null, me);
    }

});
