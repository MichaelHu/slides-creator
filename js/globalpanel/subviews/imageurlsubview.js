var ImageUrlSubView = Rocket.SubView.extend({

    className: 'image-url-container'

    , events: {
        'click .confirm': 'onconfirmclick'
    }

    , init: function(options){
        var me = this;

        me._super();
        me.render();
        me.$text = me.$('textarea');
        me.$confirm = me.$('.confirm');
    }

    , tpl: [
          '<textarea></textarea>'
        , '<div class="confirm">确定</div>'
    ].join('')

    , render: function(){
        var me = this;
        me._super();
        me.$el.append(me.tpl);
    }

    , registerEvents: function(){
        var me = this, pec = me._parent;

        me._super();

        pec.on('editimage', me.oneditimage, me);
        pec.on('typechange', me.ontypechange, me);
    }

    , onconfirmclick: function(){
        var me = this;
        me._parent.trigger('confirm', {url: me.$text.val()});
    }

    , oneditimage: function(params){
        if(params && params.url){
            this.$text.val(params.url);
        }
    }

    , ontypechange: function(params){
        var me = this;
        
        if(params && params.type == 'url'){
            me.show();
        }
        else {
            me.hide();
        }
    }

    , setValue: function(val){
        if(val !== void 0){
            this.$text.val(val);
        }
    }

    , toggle: function(val){
        var me = this;
        me._super();
        if(me.$el.css('display') != 'none'){
            me.open(val);
        }
        else{
            me.close();
        }
    }

    , open: function(val){
        this.setValue(val);
        this.show();
    }

    , close: function(){
        var me = this;

        me.gec.trigger('afterimage.global', {src: ''});
        this.hide();
    }
    
    
});

