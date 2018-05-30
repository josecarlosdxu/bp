var backwardMenu = (function(window, undefined) {
    "use strict";
    var directoryBtn,
        directoryContainer,
        directorySecundary,
        mainNavBackMenu,
        delayDirectoryShow = 300,
        body = document.body,
        backwardMenuShow = false,
        backwardMenuClicked = false,
        directoryMenuShow = false,
        directoryMenuSecundaryShow = false,
        directoryPatt = 'data-js-directory',
        mainNavBackPatt = 'data-js-mainnavback',
        mainNavBackName = 'menu',
        mainNavBackShowClass = 'mainNav-menu--forward',
        directoryContentShowClass = 'directory-container--show',
        directoryBtnName = 'btn',
        directoryContainerName = 'container',
        directoryContentName = 'content',
        directorySecundaryName = 'secundary',
        directoryItemName = 'item',
        directorySecundaryClass = 'directory-list--showed',




        directoryBtnPatt = getPattern(directoryPatt, directoryBtnName),
        directoryContentPatt = getPattern(directoryPatt, directoryContentName),
        toggleMainNavContent = function(evt) {
            var e = evt || false;
            if (!e && backwardMenuClicked) {
                return false;
            }
            backwardMenuShow = !backwardMenuShow;
            if (e) {
                backwardMenuClicked = !backwardMenuClicked;
                backwardMenuShow = backwardMenuClicked;
            }
            if (backwardMenuShow) {
                addClass(mainNavBackMenu, mainNavBackShowClass);
                return;
            }
            removeClass(mainNavBackMenu, mainNavBackShowClass);
        },

        setBodyMouseOutListeners = function(on) {
            if (on) {
                bindElemHandler.apply(body, [isOutMenu, 'mouseover']);
                return;
            }
            unbindElemHandler.apply(body, [isOutMenu, 'mouseover']);
            showDirectoryElem(on);
        },

        closeDirectoryMenu = function() {
            setBodyMouseOutListeners(false);
            directoryMenuSecundaryShow = false;
            removeClass(directorySecundary, directorySecundaryClass);
        },

        isOutMenu = function(evt) {
            var target = evt.target,
                isOut = getParents(target, directoryBtnPatt) === null && getParents(target, directoryContentPatt) === null && true;
            if (isOut) {
                closeDirectoryMenu();
            }

        },

        showDirectoryElem = function(on) {
            var method = on ? 'addClass' : 'removeClass',
                delay = on ? delayDirectoryShow : 100,

                timeout = setTimeout(function() {
                    //console.log('alert')

                    window[method](directoryContainer,directoryContentShowClass);
                    //directoryContainer.style.display = displayType;

                    clearTimeout(timeout);
                    method = delay = timeout = null;



                }, delay);
            directoryMenuShow = on;
            setDirectoryBtnListeners(!on);


        },

        toggleDirectoryState = function(evt) {
            showDirectoryElem(!directoryMenuShow);
            setBodyMouseOutListeners(directoryMenuShow);

        },

        toggleDirectorySecundaryState = function() {
            if (!directoryMenuSecundaryShow) {
                directoryMenuSecundaryShow = true;
                addClass(directorySecundary, directorySecundaryClass);
            }

        },

        setDirectoryItemListeners = function() {
            var directoryItem, directoryItemList = getElemsList(directoryPatt, directoryItemName),
                len = directoryItemList.length - 1;
            while (len > -1) {
                directoryItem = directoryItemList[len];
                bindElemHandler.apply(directoryItem, [toggleDirectorySecundaryState]);
                len--;
            }
            len = directoryItem = directoryItemList = null;
        },

        setDirectoryBtnListeners = function(on) {
            //if (on) {
               // bindElemHandler.apply(directoryBtn, [toggleDirectoryState, 'mouseover']);
                //return;
            //}
            //unbindElemHandler.apply(directoryBtn, [toggleDirectoryState, 'mouseover']);
        },

        getItems = function() {
            directoryBtn = findElem(directoryPatt, directoryBtnName) || false;
            directoryBtn = findElem(directoryPatt, directoryBtnName) || false;
            directoryContainer = findElem(directoryPatt, directoryContainerName) || false;
            directorySecundary = findElem(directoryPatt, directorySecundaryName) || false;
            mainNavBackMenu = findElem(mainNavBackPatt, mainNavBackName) || false;
            setDirectoryItemListeners();
            setDirectoryBtnListeners(true);
            bindElemHandler.apply(directoryBtn, [toggleMainNavContent]);
        },
        init = function() {
            getItems();
        };
    return {
        init: init
    };
})(window);
window.addEventListener("load", backwardMenu.init, false);
