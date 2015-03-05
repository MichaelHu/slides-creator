var PopupSlideNewSubView = PopupSubView.extend({

    init: function(options){
        var me = this;

        me._super(options);
        me.$panel = me.$('.slidenewpanel');
    }

    , slideNewTpl: [
          '<div class="slidenewpanel">'
        ,     '<div class="tpl-cont" data-type="plain">'
        ,         '<div class="tpl-thumbnail"></div>'
        ,         '<div class="tpl-info">空白页</div>'
        ,     '</div>'
        ,     '<div class="tpl-cont" data-type="editonly">'
        ,         '<div class="tpl-thumbnail"></div>'
        ,         '<div class="tpl-info">仅编辑</div>'
        ,     '</div>'
        ,     '<div class="tpl-cont" data-type="front">'
        ,         '<div class="tpl-thumbnail"></div>'
        ,         '<div class="tpl-info">贺卡页</div>'
        ,     '</div>'
        , '</div>'
    ].join('')

    , render: function(){
        var me = this; 

        me._super();
        me.$el.html(me.slideNewTpl);
        return me;
    } 

    , registerEvents: function(){
        var me = this;
        me._super();
        me.$panel.on('click', function(e){
            e.stopPropagation();
            me.onpanelclick(e);
            setTimeout(function(){
                me.close();
            }, 200);
        });
    }

    , onpanelclick: function(e){
        var me = this,
            $target = $(e.target).closest('.tpl-cont'),
            action = 'slide' + me.getUniqueSlideID(),
            PageView;

        switch($target.data('type')){
            case 'plain':
                PageView = PlainPageView;
                break;
            case 'front':
                PageView = FrontPageView;
                break;
            case 'editonly':
                PageView = EditOnlyPlainPageView;
                break;

            default:
                PageView = PlainPageView;
        }

        me.gec.trigger('slideoperation.global', {action: 'new'})
            .registerViewClass(action, PageView)
            .addRoute(action, '_defaultHandler:' + action)
            .insertPageOrder(action, {pos: 'AFTER', relatedAction: me.ec.currentAction});

        me.navigate(action);
    }

    , _getMaxSlideID: function(){
        var order = this.gec.getPageOrder(), 
            i = order.length - 1,
            max = 1; 
       
        while(i >= 0){
            if(/^slide(\d+)$/.test(order[i])){
                if(RegExp.$1 - 0 > max) {
                    max = RegExp.$1 - 0; 
                }
            }
            i--;
        }
        return max;
    }

    , getUniqueSlideID: function(){
        var me = this;
        if(void 0 === me._uniqueSlideID){
            me._uniqueSlideID = me._getMaxSlideID();
        }
        return ++me._uniqueSlideID;
    }

});
