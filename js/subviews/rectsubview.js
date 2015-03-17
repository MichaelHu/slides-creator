var RectSubView = Rocket.SubView.extend({

    events: {
    }

    , panelTpl: [
          '<div class="iconfont control-panel">'
        ,     '<span class="lock">&#xf0195;</span>'
        ,     '<span class="delete">&#xf013f;</span>'
        ,     '<span class="resize">&#xf0005;</span>'
        ,     '<span class="rotate">&#xf013b;</span>'
        ,     '<span class="counter-rotate">&#xf013a;</span>'
        , '</div>'
    ].join('')

    , init: function(options){
        var me = this;
        
        options || (options = {});

        // Whether subview dom node is already existed
        me._isSetup = options.isSetup || false;

        // Determine edit mode
        me._isRelease = me.gec.editMode == 'RELEASE';
        me._isPartialEdit = me.gec.editMode == 'PARTIALEDIT';
        me._isFullEdit = me.gec.editMode == 'FULLEDIT';

        me._setPos(options.pos);
        me._setSize(options.size);

        if(!me._isSetup){
            me.$el.html(me.panelTpl);
        }

        me.$panel = me.$('.control-panel');
        me.$resizeButton = me.$('.resize');
        me.$deleteButton = me.$('.delete');
        me.$lockButton = me.$('.lock');
        me.$rotateButton = me.$('.rotate');
        me.$counterRotateButton = me.$('.counter-rotate');

        // Maybe not existed
        me.$resizeHandle = me.$('.resize-handle');

        // Panel is default hidden
        me.$panel.hide();

        // Init this._isLocked flag
        me._applyLockTag(me._getLockTag());

        if(me._isRelease){
            me.$resizeHandle.hide();
        }
        else if(me._isPartialEdit){
            me.$resizeHandle.hide();
        }

        // Make sure correct subclass' viewClass
        setTimeout(function(){
            if( !me.viewClass 
                || !Utils.isString(me.viewClass) ){
                throw Error('RectSubView.init: "viewClass" is undefined or is not of type String'); 
            }    
            me.$el.data('view_class', me.viewClass);
        }, 0);

        me.render(options);
    }

    , render: function(){
        var me = this;

        setTimeout(function(){
            // Mainly for newly created items
            me._applyPos(me._getPos());
            me._applySize(me._getSize());
            me._applyRotate(me._getRotate());

            me._applyBoxAlign(me._getBoxAlign());
            me._applyZIndex(
                $.extend(
                    {zIndex: 10}
                    , me._getZIndex()
                )
            );
            me._applyAnim(me._getAnim());
        }, 200);
    }

    , onclick: function(e){
        var me = this;

        me.showBorder();
        me.isSelected = true;
        me.$el.enableDrag({
            ondrag: function(deltaX, deltaY){
                me.ondrag.apply(me, arguments);
            }
        });

    }

    , ensureResizeHandle: function(){
        var me = this;
        if(!me.$resizeHandle.length){
            me.$el.append('<div class="iconfont resize-handle">&#xf0154;</div>')
            me.$resizeHandle = me.$('.resize-handle').hide();
        }
    }

    , showBorder: function(){
        this.$el.css('border', '1px dotted #fff')
            .css('box-shadow', '0px 0px 9px #000');
    }

    , hideBorder: function(){
        this.$el.css('border', '1px dotted transparent')
            .css('box-shadow', 'none');
    }

    , registerEvents: function(){
        var me = this;

        if(me._isFullEdit){
            me.$el.on('click', function(e){
                me.gec.trigger('clear.global', {target: me});
                me.$panel.show();
                me.onclick.apply(me, arguments);
            });
        }

        if(me._isRelease) return;

        me.gec.on('zoom.global', me.onzoom, me);
        me.gec.on('layer.global', me.onlayer, me);
        me.gec.on('boxalign.global', me.onboxalign, me);
        me.gec.on('animset.global', me.onanimset, me);
        me.gec.on('clear.global', me.onclear, me);

        me.ec.on('pagebeforechange', me.onpagebeforechange, me);
        me.ec.on('pageafterchange', me.onpageafterchange, me);


        // Panel's click event is always triggered even if 
        // mousedown event on <span> within it is stop.
        // The exact reason is unknown till now.
        // The temperary solution is to stop click event on panel.
        me.$panel.on('click', function(e){
            e.stopPropagation();
            e.preventDefault();
        });

        me.$resizeButton.on('touchstart mousedown', function(e){
            me.gec.trigger('clear.global', {target: me});
            me.$resizeButton.addClass('on');
            setTimeout(function(){
                me.$resizeButton.removeClass('on');
            }, 300);

            me.ensureResizeHandle();
            me.$resizeHandle.show();
            me.showBorder();;
            me.$resizeHandle.enableDrag({
                ondragstart: function(){
                    me.$resizeHandle.addClass('on');
                }
                , ondrag: function(deltaX, deltaY){
                    me.onresizedrag.apply(me, arguments);
                }
                , ondragend: function(){
                    me.$resizeHandle.removeClass('on');
                }
            });
            e.stopPropagation();
            e.preventDefault();
        });

        me.$deleteButton.on('touchstart mousedown', function(e){
            me.$deleteButton.addClass('on');
            setTimeout(function(){
                me.destroy();
            }, 300);

        });

        me.$lockButton.on('touchstart mousedown', function(e){
            var $lock = me.$lockButton;

            if($lock.hasClass('unlocked')) {
                me._applyLockTag({lock: 'lock'});
            }
            else {
                me._clearLockTag({lock: 'lock'});
            }

        });

        me.$rotateButton.on('touchstart mousedown', function(e){
            me.onRotate();
        });

        me.$counterRotateButton.on('touchstart mousedown', function(e){
            me.onCounterRotate();
        });

    }
    
    , unregisterEvents: function(){
        var me = this;

        if(me._isRelease) return;

        me.$el.off();
        me.gec.off('zoom.global', me.onzoom, me);
        me.gec.off('layer.global', me.onlayer, me);
        me.gec.off('boxalign.global', me.onboxalign, me);
        me.gec.off('animset.global', me.onanimset, me);
        me.gec.off('clear.global', me.onclear, me);
        me.ec.off('pagebeforechange', me.onpagebeforechange, me);
        me.ec.off('pageafterchange', me.onpageafterchange, me);
        me.$resizeButton.off();
        me.$deleteButton.off();
        me.$lockButton.off();
        me.$resizeHandle.disableDrag();
        me.$rotateButton.off();
    }

    , onpagebeforechange: function(options){
        var me = this,
            to = options.to;

        if(to == me.ec){
            me.render();
            me._initAnimFly && me._initAnimFly();
        }
    }

    , onpageafterchange: function(options){
        var me = this,
            to = options.to;

        if(to == me.ec){
            setTimeout(function(){
                me._startAnimFly && me._startAnimFly();
            }, 300);
        }
    }

    , onlayer: function(params){
        var me = this, zIndex;

        if(!params || !me.isSelected) return;

        zIndex = parseInt(me.$el.css('z-index')) || 0; 
        switch(params.action){
            case 'up':
                zIndex++;
                break;
            case 'down':
                zIndex--;
                break;
            default:
                return;
        }
        me._applyZIndex({zIndex: zIndex});
    }

    , onclear: function(params){
        var me = this;

        if(!params || params.target != me){
            me.$panel.hide();
        }
        me.$el.disableDrag();
        me.isSelected = false;
        if(me.$resizeHandle){
            me.$resizeHandle.hide().disableDrag();
        }

        // Show which item is editable in partial edit mode
        if(!me._isPartialEdit || me._isLocked){
            me.hideBorder();
        }
    }

    , ondrag: function(deltaX, deltaY){
        var me = this,
            top = parseInt(me.$el.css('top')) 
                || me.$el.prop('offsetTop')
                || 0,
            left = parseInt(me.$el.css('left')) 
                || me.$el.prop('offsetLeft')
                || 0,
            opt = {
                top: top + deltaY
                , left: left + deltaX
            };

        me._clearBoxAlignAll();
        me._applyPos(opt);
    } 

    , onzoom: function(params){
        var me = this, flag = 1;

        if(!me.isSelected) return;
        if(params.action == 'out'){
            flag = -1;
        }

        var width = parseInt(me.$el.css('width')) || me.$el.width(),
            height = parseInt(me.$el.css('height')) || me.$el.width();

        me.onresizedrag(20 * flag, 20 * height / width * flag);
    }

    , onresizedrag: function(deltaX, deltaY){
        var me = this,
            width = parseInt(me.$el.css('width')) || me.$el.width(),
            height = parseInt(me.$el.css('height')) || me.$el.width(),
            opt = {
                width: width + deltaX
                , height: height + deltaY
            };

        me._applySize(opt);
    } 

    , onboxalign: function(params){
        var me = this;
        if(!me.isSelected) return;
        switch(params.type){
            case 'left': me.positionLeft(); break;
            case 'right': me.positionRight(); break;
            case 'center': me.positionCenter(); break;
            case 'bottom': me.positionBottom(); break;
            case 'left-a': me.positionLeftA(); break;
            case 'right-a': me.positionRightA(); break;
            case 'center-a': me.positionCenterA(); break;
            case 'bottom-a': me.positionBottomA(); break;
        }
    }

    , onanimset: function(params){
        var me = this;
        if(!me.isSelected) return;
        switch(params.type){
            case 'fly': me._applyAnim({animFly: 1}); break;
        }
    }

    , positionCenter: function(){
        var me = this;
        me._clearBoxAlignAll();
        me._applyBoxAlign({boxAlignCenter: 1});
    }

    , positionLeft: function(){
        var me = this;
        me._clearBoxAlignAll();
        me._applyBoxAlign({boxAlignLeft: 1});
    }

    , positionRight: function(){
        var me = this;
        me._clearBoxAlignAll();
        me._applyBoxAlign({boxAlignRight: 1});
    }

    , positionBottom: function(){
        var me = this;
        me._clearBoxAlignAll(null, 1);
        me._applyBoxAlign({boxAlignBottom: 1});
    }

    , positionCenterA: function(){
        var me = this;
            left = parseInt(me.$el.css('left')) 
                || me.$el.prop('offsetLeft') 
                || 0,
            slideWidth = me.ec.$el.width(),
            dist = slideWidth / 2 - left;

        me._clearBoxAlignAll();
        me._applyBoxAlign({boxAlignCenterA: dist});
    }

    , positionLeftA: function(){
        var me = this,
            left = parseInt(me.$el.css('left')) 
                || me.$el.prop('offsetLeft')
                || 0,
            dist = 0 - left;

        me._clearBoxAlignAll();
        me._applyBoxAlign({boxAlignLeftA: dist});
    }

    , positionRightA: function(){
        var me = this,
            width = parseInt(me.$el.css('width')) + 2
                || me.$el.prop('offsetWidth') + 2,
            left = parseInt(me.$el.css('left')) 
                || me.$el.prop('offsetLeft')
                || 0,
            slideWidth = me.ec.$el.width(),
            right = slideWidth - width - left, 
            dist = 0 - right;

        me._clearBoxAlignAll();
        me._applyBoxAlign({boxAlignRightA: dist});
    }

    , positionBottomA: function(){
        var me = this,
            height = parseInt(me.$el.css('height')) + 2
                || me.$el.prop('offsetHeight') + 2,
            top = parseInt(me.$el.css('top')) 
                || me.$el.prop('offsetTop')
                || 0,
            slideHeight = me.ec.$el.height(),
            bottom = slideHeight - height - top, 
            dist = 0 - bottom;

        me._clearBoxAlignAll(null, 1);
        me._applyBoxAlign({boxAlignBottomA: dist});
    }


    , onRotate: function(isCounter){
        var me = this,
            flag = isCounter ? -1 : 1,
            delta = flag * 3,
            opt = me._getRotate();

        opt.rotate = ( ( opt.rotate || 0 ) - 0 + delta ) % 360;
        me._applyRotate(opt);
    }

    , onCounterRotate: function(){
        var me = this;
        me.onRotate(1);
    }


});

$.extend(RectSubView.prototype, BoxSettingsInterface, BoxAnimSettingsInterface);

