define(
    ['require', 'zepto']
    , function(require, $){


var fn = function(c){
    if( 'string' == typeof c){
        c = $(c);
    }

    c = $(c)[0];

    if (!c 
        || !c['tagName'] 
        || c['tagName'].toLowerCase() != 'canvas'){
        throw new Error("there not a canvas element");
    }

    this.canvas = c;
    this.ctx = this.canvas.getContext("2d");
};

fn.prototype = {


    /**
     * getter
     */
    getContext: function(){
        return this.ctx;
    }

    ,getTextWidth: function(text){
        return this.ctx.measureText(text).width;
    }

    ,getWidth: function(){
        return this.canvas.width;
    }

    ,getHeight: function(){
        return this.canvas.height;
    }





    /**
     * stroke style
     */
    , strokeStyle: function(s){
        if(s){
            this.ctx.strokeStyle = s;
        } 
        return this;
    }

    /**
     * fill style
     */
    , fillStyle: function(s){
        if(s){
            this.ctx.fillStyle = s;
        } 
        return this;
    }



    /**
     * line style
     */
    , lineCap: function(lc){
        /**
         * butt (default) , round, square
         */
        if(lc){
            this.ctx.lineCap = lc;
        }
        return this;
    }

    , lineJoin: function(lj){
        /**
         * milter (default) , bevel, round
         * 尖角，斜角，圆角
         */
        if(lj){
            this.ctx.lineJoin = lj;
        }
        return this;
    }

    , lineWidth: function(lw){
        if(typeof lw == 'number'){
            this.ctx.lineWidth = lw;
        }
        return this;
    }


    /**
     * rect
     */
    , rect: function(x, y, width, height){
        this.ctx.rect(x, y, width, height);
        return this;
    } 

    , fillRect: function(x, y, width, height){
        this.ctx.fillRect(x, y, width, height);
        return this;
    } 

    , strokeRect: function(x, y, width, height){
        this.ctx.strokeRect(x, y, width, height);
        return this;
    } 

    , clearRect: function(x, y, width, height){
        this.ctx.clearRect(x, y, width, height);
        return this;
    } 



    /**
     * path
     */
    , fill: function(){
        this.ctx.fill();
        return this;
    } 

    , stroke: function(){
        this.ctx.stroke();
        return this;
    } 

    , beginPath: function(){
        this.ctx.beginPath();
        return this;
    } 

    , closePath: function(){
        this.ctx.closePath();
        return this;
    } 

    ,moveTo: function(x, y){
        this.ctx.moveTo(x, y);
        return this;
    }

    ,lineTo: function(x, y){
        this.ctx.lineTo(x, y);
        return this;
    }

    ,clip: function(){
        this.ctx.clip();
        return this;
    }

    ,arc: function(x, y, r, sAngle, eAngle, counterclickwise){
        this.ctx.arc(x, y, r, sAngle, eAngle, counterclickwise);
        return this;
    }

    ,quadraticCurveTo: function(cpx, cpy, x, y){
        this.ctx.quadraticCurveTo(cpx, cpy, x, y);
        return this;
    }

    ,bezierCurveTo: function(cp1x, cp1y, cp2x, cp2y, x, y){
        this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
        return this;
    }

    ,arcTo: function(x1, y1, x2, y2, r){
        this.ctx.arcTo(x1, y1, x2, y2, r);
        return this;
    }

    ,isPointInPath: function(x, y){
        this.ctx.isPointInPath(x, y);
        return this;
    }




    /**
     * transform of axis
     */
    ,scale: function(scaleWidth, scaleHeight){
        this.ctx.scale(scaleWidth, scaleHeight);
        return this;
    }

    ,rotate: function(angle){
        this.ctx.rotate(angle); 
        return this;
    }

    ,translate: function(x, y){
        this.ctx.translate(x, y);
        return this;
    }

    ,transform: function(a, b, c, d, e, f){
        /** 
         * a c e   x   ax+cy+ez
         * b d f * y = bx+dy+fz
         * 0 0 1   z   z
         */ 
        this.ctx.transform(a, b, c, d, e, f);
        return this;
    }

    ,setTransform: function(a, b, c, d, e, f){
        this.ctx.setTransform(a, b, c, d, e, f);
        return this;
    }


    /**
     * text
     */
    ,font: function(cssFont){
        this.ctx.font = cssFont;
        return this;
    }
    
    ,textAlign: function(align){
        // start (default), end, center, left, right
        this.ctx.textAlign = align;
        return this;
    }

    ,textBaseline: function(align){
        // alphabetic (default), top, hanging, middle, ideographic, bottom 
        this.ctx.textBaseline = align;
        return this;
    }


    ,fillText: function(text, x, y, maxWidth){
        this.ctx.fillText(text, x, y, maxWidth || this.getTextWidth(text));
        return this;
    }

    ,strokeText: function(text, x, y, maxWidth){
        this.ctx.strokeText(text, x, y, maxWidth);
        return this;
    }




    /**
     * composite
     */
    ,globalAlpha: function(alpha){
        // 0.0 ~ 1.0
        this.ctx.globalAlpha = alpha;
        return this;
    }

    ,globalCompositeOperation: function(gco){
        // source-over (default), destination-over
        this.ctx.globalCompositeOperation = gco;
        return this;
    }




    /**
     * canvas state, includes: 
     * 1. The current transformation matrix.
     * 2. The current clipping region.
     * 3. The current values of the following attributes: strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor, globalCompositeOperation, font, textAlign, textBaseline.
     */
    ,save: function(){
        this.ctx.save();
        return this;
    }

    ,restore: function(){
        this.ctx.restore();
        return this;
    }



    
    /**
     * size 
     * note: change width or height will clear canvas
     */
    ,width: function(w){
        if(w){
            this.canvas.width = w;
        }
        return this;
    }

    ,height: function(h){
        if(h){
            this.canvas.height = h;
        }
        return this;
    }

    ,css: function(){
        $.fn.css.apply($(this.canvas), arguments);
        return this;
    }


};


return fn; 


});
