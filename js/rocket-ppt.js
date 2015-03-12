define(
    ['require', 'jquery', 'zepto', 'rocket']
    , function(require, $$, $, Rocket){

var undef = void 0;
var subViewClasses = {};

// window.IScroll
// require('iscroll');
// Spectrum
// require('spectrum'); 

__inline('disable-scrolling.js')
__inline('draggable.js')

__inline('globalpanel/panelglobalview.js')
__inline('globalpanel/popupsubview.js')
__inline('globalpanel/popupeditsubview.js')
__inline('globalpanel/popupfontcolorsubview.js')
__inline('globalpanel/popupimagesubview.js')
__inline('globalpanel/popupslideconfigsubview.js')
__inline('globalpanel/popupslidenewsubview.js')
__inline('globalpanel/sublinesubview.js')
__inline('globalpanel/subviews/imageuploadsubview.js')
__inline('globalpanel/subviews/imageurlsubview.js')

__inline('interfaces/settingsutils.js')
__inline('interfaces/boxsettings.js')
__inline('interfaces/commonsettings.js')

__inline('pageviews/baseslidepageview.js')
__inline('pageviews/plainpageview.js')
__inline('pageviews/frontpageview.js')
__inline('pageviews/editonlyplainpageview.js')

__inline('subviews/rectsubview.js')

__inline('subviews/imagesubview.js')
__inline('subviews/imagewithmasksubview.js')
__inline('subviews/topnewsimagewithmasksubview.js')
__inline('subviews/imagebuttonsubview.js')
__inline('subviews/imagereleaseonlybuttonsubview.js')
__inline('subviews/imageeditonlybuttonsubview.js')

__inline('subviews/textsubview.js')
__inline('subviews/releaseonlybuttonsubview.js')
__inline('subviews/partialeditonlybuttonsubview.js')
__inline('subviews/releasebuttonsubview.js')
__inline('subviews/sharebuttonsubview.js')
__inline('subviews/linkbuttonsubview.js')
__inline('subviews/linkreleaseonlybuttonsubview.js')
__inline('subviews/topnewsimagetextsubview.js')
// __inline('subviews/scrolltextsubview.js')



$.extend(
    subViewClasses
    , {
        RectSubView: RectSubView
        , ImageSubView: ImageSubView
        , ImageWithMaskSubView: ImageWithMaskSubView
        , TopNewsImageWithMaskSubView: TopNewsImageWithMaskSubView
        , ImageButtonSubView: ImageButtonSubView
        , ImageReleaseOnlyButtonSubView: ImageReleaseOnlyButtonSubView
        , ImageEditOnlyButtonSubView: ImageEditOnlyButtonSubView

        , TextSubView: TextSubView
        , PartialEditOnlyButtonSubView: PartialEditOnlyButtonSubView
        , ReleaseOnlyButtonSubView: ReleaseOnlyButtonSubView
        , TopNewsImageTextSubView: TopNewsImageTextSubView
//         , ScrollTextSubView: ScrollTextSubView

        , ReleaseButtonSubView: ReleaseButtonSubView
        , LinkButtonSubView: LinkButtonSubView
        , LinkReleaseOnlyButtonSubView: LinkReleaseOnlyButtonSubView
        , ShareButtonSubView: ShareButtonSubView
    }
);


return {
    PanelGlobalView: PanelGlobalView  
    , PlainPageView: PlainPageView 
    , FrontPageView: FrontPageView 
    , EditOnlyPlainPageView: EditOnlyPlainPageView 
};

});
