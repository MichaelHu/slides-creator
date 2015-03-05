var EditOnlyPlainPageView = PlainPageView.extend({

    init: function(options){
        this._super(options);
        this.viewClass = 'EditOnlyPlainPageView';
    }

    , onrelease: function(params){
        var me = this;
        me.gec.removePageOrder(me.action);
    }

});
