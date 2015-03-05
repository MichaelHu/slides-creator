define(
    ['require', 'zepto', 'canvas']
    , function(require, $, Canvas){


var scale = window.devicePixelRatio || 1,
    PI = Math.PI,
    $canvas = $('#cover-loading canvas'),
    $img = $('#cover-loading img'),
    $percent = $('#cover-loading .percent'),
    pixelWidth = scale * 60,
    pixelHeight = pixelWidth,
    canvas = new Canvas($canvas);



function isAndroid23AndBelow(){
    var ua = window.navigator.userAgent,     
        match = ua.match(/Android (\d+)\.(\d+)/),     
        ver = 30;                            

    if(match && match.length){               
        ver = ( match[1] + '' + match[2] ) - 0;       
    }
  
    return ver <= 23;                        
}


canvas
    .width(pixelWidth)
    .height(pixelHeight)
    .textAlign('center')
    .textBaseline('top')
    ;

function _renderArc(options){

    canvas
        .clearRect(
            0
            , 0
            , canvas.getWidth()
            , canvas.getHeight()
        )
        .save()
        .beginPath()
        .arc(options.x, options.y
            , options.radius, options.sAngle
            , options.eAngle,
            true )
        .strokeStyle(options.color)
        .lineWidth(options.lineWidth)
        .stroke()
        .restore()
        ;


    // Android 2及以下的webview不支持context.toDataURL方法
    if(isAndroid23AndBelow()){               
        $img.hide();
        $canvas.show();
    } 
    else {
      
        var imgData = canvas.canvas.toDataURL("image/png");
      
        if(imgData){
            // @note: 事件注册顺序很关键     
            $img.attr('src', imgData)
                .off()
                .on('load', function(){      
                    $img.off('load')         
                        .show()              
                        ;
                })                           
                .on('error', function(){     
                    $img.off('error');       
                })                           
                ;                            
        }

    }



}

function render(percent){
    var opt = {
            x: 30 * scale 
            , y: 30 * scale 
            , radius: 27 * scale
            , sAngle: 1.5 * PI  
            , eAngle: ( 100 - percent ) / 100 * 2 * PI - PI / 2
            , color: '#f00'
            , lineWidth: 6
        };
    _renderArc(opt);
    $percent.html(percent);
}

return render;

});
