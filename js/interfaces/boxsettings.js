var BoxSettingsInterface = {

    _getPos: function($el){
        var me = this, pos = {};
        $el = $el || me.$el;
        $.extend(
            pos
            , me._getSettings('pos_left', 'left', $el) 
            , me._getSettings('pos_top', 'top', $el) 
            , me._getSettings('pos_right', 'right', $el) 
            , me._getSettings('pos_bottom', 'bottom', $el) 
        );

        return pos;
    }

    , _getSize: function($el){
        var me = this, size = {};
        $el = $el || me.$el;
        $.extend(
            size
            , me._getSettings('size_width', 'width', $el) 
            , me._getSettings('size_height', 'height', $el) 
        );

        return size;
    }

    , _getZIndex: function($el){
        var me = this;

        $el = $el || me.$el;
        return me._getSettings('layer_zindex', 'zIndex', $el);
    }

    , _getRotate: function($el){
        var me = this;

        $el = $el || me.$el;
        return me._getSettings('transform_rotate', 'rotate', $el);
    }

    , _getLockTag: function($el){
        var me = this;

        $el = $el || me.$el;
        return me._getSettings('lock', 'lock', $el);
    }

    , _getBoxAlign: function($el){
        var me = this, align = {};
        $el = $el || me.$el;
        $.extend(
            align
            , me._getSettings('pos_boxalign_center', 'boxAlignCenter', $el)
            , me._getSettings('pos_boxalign_left', 'boxAlignLeft', $el)
            , me._getSettings('pos_boxalign_right', 'boxAlignRight', $el)
            , me._getSettings('pos_boxalign_bottom', 'boxAlignBottom', $el)
            , me._getSettings('pos_boxalign_center_a', 'boxAlignCenterA', $el)
            , me._getSettings('pos_boxalign_left_a', 'boxAlignLeftA', $el)
            , me._getSettings('pos_boxalign_right_a', 'boxAlignRightA', $el)
            , me._getSettings('pos_boxalign_bottom_a', 'boxAlignBottomA', $el)
        );

        return align;
    }




    , _setPos: function(pos, $el){
        var me = this;
        $el = $el || me.$el;
        me._setSettings(pos, 'pos_left', 'left', $el);
        me._setSettings(pos, 'pos_top', 'top', $el);
        me._setSettings(pos, 'pos_right', 'right', $el);
        me._setSettings(pos, 'pos_bottom', 'bottom', $el);
    }

    , _setSize: function(size, $el){
        var me = this;
        $el = $el || me.$el;
        me._setSettings(size, 'size_width', 'width', $el);
        me._setSettings(size, 'size_height', 'height', $el);
    }

    , _setBoxAlign: function(align, $el){
        var me = this;

        $el = $el || me.$el;
        me._setSettings(align, 'pos_boxalign_center', 'boxAlignCenter', $el)
        me._setSettings(align, 'pos_boxalign_left', 'boxAlignLeft', $el)
        me._setSettings(align, 'pos_boxalign_right', 'boxAlignRight', $el)
        me._setSettings(align, 'pos_boxalign_bottom', 'boxAlignBottom', $el)
        me._setSettings(align, 'pos_boxalign_center_a', 'boxAlignCenterA', $el)
        me._setSettings(align, 'pos_boxalign_left_a', 'boxAlignLeftA', $el)
        me._setSettings(align, 'pos_boxalign_right_a', 'boxAlignRightA', $el)
        me._setSettings(align, 'pos_boxalign_bottom_a', 'boxAlignBottomA', $el)
    }

    , _setZIndex: function(layer, $el){
        var me = this;

        $el = $el || me.$el;
        return me._setSettings(layer, 'layer_zindex', 'zIndex', $el);
    }

    , _setRotate: function(rotate, $el){
        var me = this;

        $el = $el || me.$el;
        return me._setSettings(rotate, 'transform_rotate', 'rotate', $el);
    }

    , _setLockTag: function(lock, $el){
        var me = this;

        $el = $el || me.$el;
        return me._setSettings(lock, 'lock', 'lock', $el);
    }





    , _clearBoxAlign: function(align, $el){
        var me = this;

        $el = $el || me.$el;
        me._clearSettings(align, 'pos_boxalign_center', 'boxAlignCenter', $el)
        me._clearSettings(align, 'pos_boxalign_left', 'boxAlignLeft', $el)
        me._clearSettings(align, 'pos_boxalign_right', 'boxAlignRight', $el)
        me._clearSettings(align, 'pos_boxalign_bottom', 'boxAlignBottom', $el)
        me._clearSettings(align, 'pos_boxalign_center_a', 'boxAlignCenterA', $el)
        me._clearSettings(align, 'pos_boxalign_left_a', 'boxAlignLeftA', $el)
        me._clearSettings(align, 'pos_boxalign_right_a', 'boxAlignRightA', $el)
        me._clearSettings(align, 'pos_boxalign_bottom_a', 'boxAlignBottomA', $el)
    }

    , _clearBoxAlignAll: function($el, isVertical){
        var me = this;

        $el = $el || me.$el;
        if(isVertical){
            me._clearBoxAlign(
                {
                    'boxAlignBottom': 1
                    , 'boxAlignBottomA': 1
                }
                , $el
            );
        }
        else{
            me._clearBoxAlign(
                {
                    'boxAlignCenter': 1
                    , 'boxAlignRight': 1
                    , 'boxAlignLeft': 1
                    , 'boxAlignCenterA': 1
                    , 'boxAlignRightA': 1
                    , 'boxAlignLeftA': 1
                }
                , $el
            );
        }
    }

    , _clearLockTag: function(lock, $el){
        var me = this;
        if(Utils.isEmpty(lock) || !lock.lock) return;

        $el = $el || me.$el;
        me._clearSettings(lock, 'lock', 'lock', $el);
        me._isLocked = false;
        me.$lockButton.html('&#xf0195;')
            .removeClass('locked')
            .addClass('unlocked');
    }





    , _applyPos: function(pos, $el){
        if(Utils.isEmpty(pos)) return;
        var opt = $.extend({'position': 'absolute'}, pos);
        $el = $el || this.$el;
        $el.css(opt);
        this._setPos(pos, $el);
    } 

    , _applySize: function(size, $el){
        if(Utils.isEmpty(size)) return;
        var opt = $.extend({'position': 'absolute'}, size);
        $el = $el || this.$el;
        $el.css(opt);
        this._setSize(size, $el);
    }

    , _applyBoxAlign: function(align){
        if(Utils.isEmpty(align)) return;
        var me = this;
    
        apply();

        function apply(){
            // Make sure width we got is correct
            if(!me.ec.isActivePage()){
                setTimeout(apply, 50);
                return;
            }

            if(align.boxAlignCenter){
                var width = me.$el.width(),
                    slideWidth = me.ec.$el.width();

                me._applyPos({
                    left: ( slideWidth - width ) / 2
                    , right: 'auto'
                });
            }
            else if(align.boxAlignLeft){
                me._applyPos({
                    left: 0
                    , right: 'auto'
                });
            }
            else if(align.boxAlignRight){
                me._applyPos({
                    right: 0
                    , left: 'auto'
                });
            }
            else if(align.boxAlignBottom){
                me._applyPos({
                    bottom: 0
                    , top: 'auto'
                });
            }
            else if(align.boxAlignCenterA != undef){
                var slideWidth = me.ec.$el.width(),
                    dist = parseInt(align.boxAlignCenterA);

                me._applyPos({
                    left: slideWidth / 2 - dist
                    , right: 'auto'
                });
            }
            else if(align.boxAlignLeftA != undef){
                var dist = parseInt(align.boxAlignLeftA);

                me._applyPos({
                    left: 0 - dist
                    , right: 'auto'
                });
            }
            else if(align.boxAlignRightA != undef){
                var dist = parseInt(align.boxAlignRightA);

                me._applyPos({
                    right: 0 - dist
                    , left: 'auto'
                });
            }
            else if(align.boxAlignBottomA != undef){
                var dist = parseInt(align.boxAlignBottomA);

                me._applyPos({
                    bottom: 0 - dist
                    , top: 'auto'
                });
            }



            me._setBoxAlign(align);
        }
    }

    , _applyZIndex: function(layer, $el){
        if(Utils.isEmpty(layer)) return;
        $el = $el || this.$el;
        $el.css(layer);
        this._setZIndex(layer, $el);
    }

    , _applyRotate: function(rotate, $el){
        if(Utils.isEmpty(rotate)) return;
        $el = $el || this.$el;
        $el.css('-webkit-transform', 'rotate(' + rotate.rotate + 'deg)');
        this._setRotate(rotate, $el);
    }

    , _applyLockTag: function(lock, $el){
        var me = this;

        $el = $el || me.$el;
        if(Utils.isEmpty(lock)){
            me._clearLockTag({lock: 'lock'}, $el);
        }
        else{
            me._isLocked = true;
            me._setLockTag(lock, $el);
            me.$lockButton.html('&#xf00c9;')
                .removeClass('unlocked')
                .addClass('locked');
        }
    }


};

$.extend(BoxSettingsInterface, SettingsUtilsInterface);
