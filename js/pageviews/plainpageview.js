var PlainPageView = BaseSlidePageView.extend({

    events: {
        'swipeDown': 'onswipeDown'
        , 'swipeUp': 'onswipeUp'
    }

    , init: function(options){
        this._super(options);
        this.viewClass = 'PlainPageView';
    }

    , registerEvents: function(){
        var me = this;

        me._super();
    }

    , onswipeUp: function(e){
        var me = this;

        if(me.gec.editMode == 'RELEASE'
            || me.gec.editMode == 'PARTIALEDIT'){
            me.goNext();
            e.preventDefault();
        }
    }

    , onswipeDown: function(e){
        var me = this;

        if(me.gec.editMode == 'RELEASE'
            || me.gec.editMode == 'PARTIALEDIT'){
            me.goPrev();
            e.preventDefault();
        }
    }

});
