define(
    ['require', 'zepto', 'rocket', 'rocket-ppt', 'cover-loading']
    , function(require, $, Rocket, RocketPPT, CoverLoading){


var templateName = 'default';


function getQuery(name){
    var qstr = location.search,
        rname = new RegExp(name + '=([^&]+)'),
        match;
    if((match = qstr.match(rname))){
        return decodeURIComponent(match[1]);
    }
    return null;
}

if(!getQuery('cardid')){
    start();
}
else{
    $.ajax({
        dataType: 'jsonp'
        , url: global_greetingcard_server
        , data: { 
            action: 'get'
            , cardid: getQuery('cardid') 
            , x: getQuery('cut_x') || 0
            , y: getQuery('cut_y') || 0
            , w: getQuery('cut_w') || 640
            , h: getQuery('cut_h') || 400
            , ratio: 1
            , detail: 1
        } 
        , timeout: 5000
        , success: function(resp){
            var config;
            if(resp && resp.data && resp.data.content){
                templateName = resp.data.template || templateName;
                config = JSON.parse(unescape(resp.data.content));
                start(config);
            }
        }
        , error: function(){
            console.log(arguments);
        }
    });
}


function clearLoading(){
    $('#cover-loading')
        .animate({opacity: 0}, 1000, 'ease-in', function(){$(this).hide();});   
}


function start(initConfig){

    if(initConfig && initConfig.images){
        loadImages(initConfig.images, function(){
            clearLoading();
        });
    }
    else{
        clearLoading();
    }

    initSlides(initConfig);
}




function initSlides(initConfig){

    var localConfig = null;
    
    var localConfig = JSON.parse(unescape(localConfig));

    var slidesConfig = initConfig || localConfig || {
        order: ['index']
        , views: {
            'index': {
                'class': 'PlainPageView'
                , 'html': '<div class="slide"></div>'
            }
        }
        , isRelease: false
    };


    var AppRouter = Rocket.Router.extend({

        routes: {
            '*anything': '_defaultHandler:index'
        }

        , pageOrder: slidesConfig.order

        , templateName: slidesConfig.template || templateName

        , isRelease: slidesConfig.isRelease

        // Default mode is FULLEDIT
        , editMode: slidesConfig.editMode || 'FULLEDIT'

        // TB
        // , defaultPageTransition: 'flipTB'
        , defaultPageTransition: 'slideTB'
        // , defaultPageTransition: 'slidefadeTB'
        // , defaultPageTransition: 'rotatecubeTB'
        // , defaultPageTransition: 'scaledownupscaleup'


        // LR
        // , defaultPageTransition: 'rotateslide'
        // , defaultPageTransition: 'rotateslidedelay'

        // ALL
        // , defaultPageTransition: 'scaledowncenterscaleupcenter'
        // , defaultPageTransition: 'scaledownscaleupdown'
        // , defaultPageTransition: 'scaledownupscaleup'
        // , defaultPageTransition: 'rotatefallscaleup'
        // , defaultPageTransition: 'rotatenewspaper'





        // , defaultPageTransition: 'rotatecubeLR'
        // , defaultPageTransition: 'rotatecarouselLR'
        // , defaultPageTransition: 'slideLR'
        // , defaultPageTransition: 'movefaderotateunfoldTB'
        // , defaultPageTransition: 'rotatecarouselTB'
        // , defaultPageTransition: 'rotatepushslideTB'
        // , defaultPageTransition: 'rotateroomTB'
        // , defaultPageTransition: 'rotateslideTB'
        // , defaultPageTransition: 'scaledownslideTB'
        // , defaultPageTransition: 'slideeasingTB'
        // , defaultPageTransition: 'slidescaleupTB'

        // , defaultPageTransition: 'rotatefoldmovefadeTB'

        , isAllPagesOpened: function(){
            var me = this, 
                views = me.views,
                actions = me.pageOrder;
            for(var i=0; i<actions.length; i++){
                if(views[actions[i]]) continue;
                else return false;
            }
            return true;
        }
    });

    var appRouter = new AppRouter();

    $.each(slidesConfig.views, function(key, item){
        var $el = $(item.html)
                .appendTo('#wrapper')
                // Make sure it's hidden.
                .hide();

        appRouter.addRoute(key, '_defaultHandler:' + key);
        appRouter.registerViewClass(
            key
            , RocketPPT[item['class']].extend({el: $el[0], isSetup: true})
        );
    });

    if(appRouter.editMode != 'RELEASE'){
        new RocketPPT['PanelGlobalView'](null, appRouter);
    }

    if(appRouter.editMode == 'PARTIALEDIT'){
        showOperationTip();
    }

    window.appRouter = appRouter;

    
    if(appRouter.editMode == 'RELEASE'){
        // Browse from the first slide when relase mode
        location.href = '#';
    }

    appRouter.start();

    _sendNSClickStat({
        act: '2015postcard'
        , act_data_1: appRouter.editMode
        , act_data_2: appRouter.templateName
    });
}

function loadImages(images, callback){
    if(!images || !images.length) {
        callback && callback();
        return;
    } 
    var len = images.length, 
        i = 0,
        finished = 0,
        img;
    
    CoverLoading(30);

    while(i < len){
        img = new Image();
        img.src = images[i++];
        img.onload = img.onabort 
            = img.onerror 
            = function(){
                finished++; 
                CoverLoading(Math.ceil(70 * finished / len + 30));
                if(finished >= len){
                    setTimeout(function(){
                        callback && callback();
                    }, 100);
                }
            };
    } 
}


// Operation tip
var $opTip = $('<div class="operation-tip"></div>')
            .appendTo('body').hide();

$opTip.on('click', function(){hideOperationTip();});

function showOperationTip(){
    $opTip.show();
}

function hideOperationTip(){
    $opTip.hide();
}


// Statistics
function _sendStatData(url, params){

    setTimeout(function(){

        var $statLink = $('<link rel="stylesheet" />');
        $('head').append($statLink);

        $statLink.attr(
            'href'
            , [  
                url + ( url.indexOf('?') >= 0 ? '' : '?' ) 
                    + $.param(params) 
                , (new Date()).getTime()
            ].join('&')
        );   

        setTimeout(function(){
            $statLink.remove();
        }, 5000);

    },0);

}

function _sendNSClickStat(params, instantly/*optional*/){
    var url = 'http://nsclick.baidu.com/v.gif',
        _params;

    _params = $.extend(
        {    
            pid: 107
            , wise: 1
            , from: 'topic' 
        }
        , params
    );

    if(!instantly){
        setTimeout(function(){
            _sendStatData(url, _params);
        }, 100);
    }
    else{
        _sendStatData(url, _params);
    }

}

// Minimize output size of escape. 
// Note that it's not for general use.
window.specialEncode = function(str){
    return str.replace(/[\w\W]/g, function($0){
        if($0.charCodeAt(0) > 255 || $0 == '%'){    
            return escape($0);
        }
        return $0;
    });
}


});
