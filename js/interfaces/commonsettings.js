var CommonSettingsInterface = {

    _setFontSize: function(opt, $el){
        this._setSettings(opt, 'text_font_size', 'fontSize', $el);
    }

    , _setLineHeight: function(opt, $el){
        this._setSettings(opt, 'text_line_height', 'lineHeight', $el);
    }

    , _setColor: function(opt, $el){
        this._setSettings(opt, 'text_color', 'color', $el);
    }

    , _setTextAlign: function(opt, $el){
        this._setSettings(opt, 'text_align', 'textAlign', $el);
    }

    , _setBackgroundColor: function(opt, $el){
        this._setSettings(opt, 'background_color', 'backgroundColor', $el);
    }

    , _setBackgroundImage: function(opt, $el){
        this._setSettings(opt, 'background_image', 'backgroundImage', $el);
    }

    , _setBackgroundPosition: function(opt, $el){
        this._setSettings(opt, 'background_position', 'backgroundPosition', $el);
    }

    , _setBackgroundRepeat: function(opt, $el){
        this._setSettings(opt, 'background_repeat', 'backgroundRepeat', $el);
    }





    , _getFontSize: function($el){
        return this._getSettings('text_font_size', 'fontSize', $el);
    }

    , _getLineHeight: function($el){
        return this._getSettings('text_line_height', 'lineHeight', $el);
    }

    , _getColor: function($el){
        return this._getSettings('text_color', 'color', $el);
    }

    , _getTextAlign: function($el){
        return this._getSettings('text_align', 'textAlign', $el);
    }

    , _getBackgroundColor: function(opt, $el){
        return this._getSettings(opt, 'background_color', 'backgroundColor', $el);
    }

    , _getBackgroundImage: function(opt, $el){
        return this._getSettings(opt, 'background_image', 'backgroundImage', $el);
    }

    , _getBackgroundPosition: function(opt, $el){
        return this._getSettings(opt, 'background_position', 'backgroundPosition', $el);
    }

    , _getBackgroundRepeat: function(opt, $el){
        return this._getSettings(opt, 'background_repeat', 'backgroundRepeat', $el);
    }



    
    , _applyFontSize: function(opt, $el){
        this._applySettings(opt, 'font-size', 'fontSize', $el);
    }

    , _applyLineHeight: function(opt, $el){
        this._applySettings(opt, 'line-height', 'lineHeight', $el);
    }

    , _applyColor: function(opt, $el){
        this._applySettings(opt, 'color', 'color', $el);
    }

    , _applyTextAlign: function(opt, $el){
        this._applySettings(opt, 'text-align', 'textAlign', $el);
    }

    , _applyBackgroundColor: function(opt, $el){
        this._applySettings(opt, 'background-color', 'backgroundColor', $el);
    }

    , _applyBackgroundImage: function(opt, $el){
        this._applySettings(opt, 'background-image', 'backgroundImage', $el);
    }

    , _applyBackgroundPosition: function(opt, $el){
        this._applySettings(opt, 'background-position', 'backgroundPosition', $el);
    }

    , _applyBackgroundRepeat: function(opt, $el){
        this._applySettings(opt, 'background-repeat', 'backgroundRepeat', $el);
    }

};

$.extend(CommonSettingsInterface, SettingsUtilsInterface);
