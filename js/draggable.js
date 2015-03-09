(function(){

function enableDrag(el, options){
    var $el = $(el),
        initialX, initialY,
        lastX, lastY,
        currentX, currentY,
        opt = options || {};

    $el.on('touchstart.draggable mousedown.draggable', function(e){
        var t = e.touches && e.touches[0] || e;
        currentX = lastX = initialX = t.clientX; 
        currentY = lastY = initialY = t.clientY; 
        opt.ondragstart && opt.ondragstart();
        e.stopPropagation();
        e.preventDefault();

        $el.on('touchmove mousemove', function(e){
            var t = e.touches && e.touches[0] || e;
            lastX = currentX; 
            lastY = currentY; 
            currentX = t.clientX;
            currentY = t.clientY;
            opt.ondrag && opt.ondrag(
                currentX - lastX
                , currentY - lastY
                , currentX - initialX
                , currentY - initialY
            );
            e.stopPropagation();
            e.preventDefault();
        })
        .on('touchend mouseup', function(e){
            opt.ondragend && opt.ondragend();
            e.stopPropagation();
            e.preventDefault();
            $el.off('touchmove touchend mousemove mouseup');
        });

    })

}

function disableDrag(el){
    $(el).off('.draggable');
}

$.fn.enableDrag = function(options){
    enableDrag(this[0], options);
};

$.fn.disableDrag = function(){
    disableDrag(this[0]);
};

})();
