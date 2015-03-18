var BoxAnimSettingsInterface = {

    _getAnim: function($el){
        var me = this, anim = {};
        $el = $el || me.$el;
        $.extend(
            anim
            , me._getSettings('anim_fly_from', 'animFlyFrom', $el) 
            , me._getSettings('anim_fly_duration', 'animFlyDuration', $el) 
        );

        return anim;
    }

    , _setAnim: function(anim, $el){
        var me = this;
        $el = $el || me.$el;
        me._setSettings(anim, 'anim_fly_from', 'animFlyFrom', $el);
    }

    , _applyAnim: function(anim, $el){
        if(Utils.isEmpty(anim)) return;
        var me = this;
        $el = $el || me.$el;

        if(anim.animFlyFrom){
            if(anim.animFlyFrom == 'no'){
                $el.css('visibility', 'visible');
                me._initAnimFly = null;
                me._startAnimFly = null;
                anim.animFlyFrom = null;
            }
            else{

                $el.css('visibility', 'hidden');

                me._initAnimFly = function(){
                    $el.css('visibility', 'hidden');
                };

                me._startAnimFly = function(){
                    var width = $el.width(),
                        height = $el.height(),
                        top = parseInt($el.css('top')),
                        left = parseInt($el.css('left')),
                        duration = anim.animFlyDuration || 1,
                        contHeight = me.ec.$el.height(),
                        contWidth = me.ec.$el.width();

                    $el 
                        .css({
                            '-webkit-transform': 'translate(-' 
                                + ( left + 30 ) + 'px,' + ( contHeight - top ) + 'px)'
                            , '-webkit-transition': '-webkit-transform 0s'
                            , 'visibility': 'visible'
                        })
                        ;

                    setTimeout(function(){
                        $el
                            .css({
                                '-webkit-transform': 'translate(0, 0)'
                                , '-webkit-transition': '-webkit-transform ' + duration + 's ease-out'
                            })
                            ;
                    }, 100);

                }

            }

        }


        me._setAnim(anim, $el);
    }

};
