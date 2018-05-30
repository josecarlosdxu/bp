var stickyTable = (function(window, undefined) {
    "use strict";
    var win,
        topPage,
        tableHead,
        tableBody,
        topPos = 54,
        patt = 'data-js-stickytable',
        fixedHeadClass = 'cart-tableHeadCont--fixed',
        stickyHeadClass = 'cart-tableHeadCont--sticky',
        fixedBodyClass = 'cart-tableBody--fixed',
        toggleSticky = function(add) {
            var method = add ? 'addClass' : 'removeClass';
            window[method](tableHead, fixedHeadClass);
        },
        checkPos = function() {
            var topPage = window.pageYOffset || window.clientY;
            toggleSticky(topPage > topPos && topPage < tableBody.offsetHeight + 20);
        },
        setProperties = function() {
            if (window.getComputedStyle(tableHead).position.match('sticky')) {
                addClass(tableHead, stickyHeadClass);
                return;
            }
            addClass(tableBody, fixedBodyClass);
            window.ontouchstart = checkPos;
            window.ontouchend = checkPos;
            window.onscroll = checkPos;
        },
        init = function() {
            var hasElems;
            tableHead = findElem(patt, 'tableHead') || null;
            tableBody = findElem(patt, 'tableBody') || false;
            hasElems = tableHead && tableBody ? setProperties.apply() : null;
        };
    return {
        init: init
    };
})(window);