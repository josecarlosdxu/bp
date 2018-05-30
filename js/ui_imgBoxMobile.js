var imgBoxMobile = (function (window, undefined) {
    "use strict";

    var bigImg,
    imgboxPatt = 'data-js-imgbox',
    thumbPatt = getPattern(imgboxPatt, 'thumb'),
    bigImgPatt = getPattern(imgboxPatt, 'bigimg'),

    preventEvt = function (e) {
        e.preventDefault();
    },

    changeImg = function (e) {
        var target = e.target || e.srcElement;
        preventEvt(e);
        bigImg.src = target.src;
    },

    setProperties = function () {
        bigImg = this;
        bindElemHandler.apply(bigImg, [preventEvt, 'mousedown']);
        Array.prototype.slice.call(arguments).forEach( function( el ) {
            bindElemHandler.apply(el, [changeImg, 'mousedown']);
        });

    },

    getElems = function () {
        var bigImgFind = document.querySelector(bigImgPatt) || false,
        thumblist = document.querySelectorAll(thumbPatt),
        thumbsLen = thumblist.length > 0 &&  bigImgFind ? setProperties.apply(bigImgFind,thumblist): null;
    },
    init = function () {
        getElems();
    };
    return {
        init: init
    };
})(window);