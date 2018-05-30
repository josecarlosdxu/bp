var imgBoxCarousel = (function(window, undefined) {
    "use strict";
    var navElem,
        navElemLen,
        btnPlus,
        btnMinus,
        itemWidth = 74,
        navElemIndex = 0,
        elemsPattern = 'data-js-imgBoxCarousel',
        navPattern = getPattern(elemsPattern, 'container'),
        move = function(pos) {
            TweenLite.to(navElem, 0.4, {
                left: pos,
                ease: "Power4.easeOut"
            });
        },
        back = function() {
            navElemIndex -= 1;
            btnPlus.removeAttribute('style');
            move("+=" + itemWidth + 'px');
            if (navElemIndex === 0) {
                btnMinus.style.display = 'none';
                return;
            }
        },
        advance = function() {
            navElemIndex += 1;
            btnMinus.removeAttribute('style');
            move('-=' + itemWidth + 'px');

            if (navElemIndex === (navElemLen - 3)) {
                btnPlus.style.display = 'none';
                return;
            }
        },
        setNavElemStyles = function() {
            navElem.style.width = (itemWidth * navElemLen) + 'px';
            navElem.style.position = 'absolute';
        },
        setElemProps = function() {
            //itemWidth = navElem.children[0].offsetWidth;
            setNavElemStyles();
            btnMinus.style.display = 'none';
            bindElemHandler.apply(btnPlus, [advance]);
            bindElemHandler.apply(btnMinus, [back]);
        },
        hideBtns = function() {
            btnMinus.style.display = 'none';
            btnPlus.style.display = 'none';
        },
        getButtons = function() {
            var isMinLen;
            btnPlus = document.querySelector(getPattern(elemsPattern, 'btnPlus'));
            btnMinus = document.querySelector(getPattern(elemsPattern, 'btnMinus'));
            isMinLen = navElemLen > 3 ? setElemProps() : hideBtns();
        },
        getElems = function() {
            navElem = document.querySelector(navPattern) || null;
            if (!navElem) {
                return;
            }
            navElemLen = navElem.children.length;
            getButtons();
        },
        init = function() {
            getElems();
        };
    return {
        init: init
    };
})(window);