(function(require){

// Disable scrolling bounce under iOS
var firstTouch = {},
    threshold = 5;

$(document).on('touchstart', function(e){
    var t = e.touches[0];
    firstTouch.y = t.clientY;
})
.on('touchmove', function(e){
    var t = e.touches[0],
        scrollY = window.scrollY,
        scrollHeight = document.body.scrollHeight,
        clientHeight = window.innerHeight;

    if(scrollY + clientHeight + threshold >= scrollHeight){
        if(t.clientY - firstTouch.y < 0){
            e.preventDefault();
        }
    }
    else if(scrollY <= threshold){
        if(t.clientY - firstTouch.y > 0){
            e.preventDefault();
        }
    }
});

})();
