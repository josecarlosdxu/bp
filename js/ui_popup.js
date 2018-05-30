var popup = (function(window, undefined) {
    "use strict";
    var urlPopup,
        popupElem,
        popupCloseBtn,
        popupSubmitBtn,
        popupCloseBtnLength,
        newEventPopupLoading,
        newEventPopupLoaded,
        popupSubmitAction,
        popupActionArgs,
        //topScroll,
        popupBg,
        onLoadingFunc,
        popupBgPattern = '.popup-container',
        popupBgCursorClassname = 'popup-container--cursor',
        pattern = 'data-js-popup',
        popupMatch = '[' + pattern + '="popup"]',
        btnMatch = '[' + pattern + '="close"]',
        submitMatch = '[' + pattern + '="submitAction"]',


        actionPopup = function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (popupSubmitAction) {
                popupSubmitAction(popupActionArgs);

            }
            //closePopup();  ///////----------only for demo!!!!
        },

        removePopup = function() {


            lockBody(false);
            document.body.removeEventListener('click', closePopup);
            // document.body.removeChild(popupBg);
            newEventPopupLoaded = loading.setLoadedEvent(newEventPopupLoading);
            document.documentElement.dispatchEvent(newEventPopupLoaded);

            //document.documentElement.dispatchEvent(newEventPopupLoaded); 

            return true;
        },


        closePopup = function(evt) {
            var target = evt.target || evt.srcElement,
                isBtnClose = target.getAttribute('data-js-popup') === "close" ? removePopup() :
                !getParents(target, '[data-js-popup="popup"]') ? removePopup() :
                false;
        },

        relocateBody = function(e) {
            e.preventDefault();
            window.removeEventListener('scroll', relocateBody);
        },

        lockBody = function(activate) {
            var act = activate || false,
                isMobile = document.querySelector('.mobileHeader') || false,
                //bodyTop = "-"+topScroll+"px",
                body = document.body;
            if (act) {
                addClass(body, 'body--locked');
                return false;
            }
            //body.style.position = "absolute";
            removeClass(body, 'body--locked');
            //window.addEventListener('scroll', relocateBody);
            popupBg.removeAttribute("style");
        },

        setListeners = function() {
            /*[].slice.call(popupElem.querySelectorAll(btnMatch)).map(
                function(el){
                   // el.addEventListener('mousedown', closePopup, false);
                }

            ); */

            if (onLoadingFunc) {
                onLoadingFunc();
            }
            popupSubmitBtn = popupElem.querySelector(submitMatch);
            if (popupSubmitBtn) {
                popupSubmitBtn.addEventListener('mousedown', actionPopup, false);
            }
            popupBg = document.querySelector(popupBgPattern);
            addClass(popupBg, popupBgCursorClassname);
            lockBody(true);
            if(popupElem.getAttribute('data-locked')){
                popupElem.querySelector('[type="submit"]').addEventListener('click', actionPopup, false);
                return false;
            }
            document.body.addEventListener('click', closePopup, false);

        },

        createDOMObject = function(stringElem) {
            var DOMObj,
                div = document.createElement('div');
            div.innerHTML = stringElem;
            DOMObj = div.children[0];
            return DOMObj;
        },

        getPopupInfo = function(msg, icn) {
            var message = msg || null,
                icon = icn || 'draw_error';

            $.post(baseUri + 'notfound/getPopupInfo', {
                msg: message,
                icon: icon
            }, function(result) {
                setPopup(result);
            });
        },
        getPopupElem = function() {
            return popupElem;
        },

        setPopup = function(popupElm) {
            var loadingObj,
                loadingCont,
                replaceEvent;
            if (!popupElm) {
                return false;
            }
            popupElem = typeof popupElm === 'string' ? createDOMObject(popupElm) : popupElm;
            loadingObj = document.querySelector('.popup-container .loading') || false;
            if (!loadingObj) {
                return false;
            }
            loadingCont = loadingObj.parentNode;
            loadingCont.appendChild(popupElem);
            loadingCont.removeChild(loadingObj);
            setListeners();

        },

        setLoadingFunc = function(func) {

            onLoadingFunc = func;

        },

        getPopup = function(url, popSbmtAction, pActionArgs) {
            var request = new XMLHttpRequest();
            newEventPopupLoading = loading.setLoadingEvent();
            popupSubmitAction = popSbmtAction || null;
            popupActionArgs = pActionArgs || [];
            urlPopup = url;
            document.documentElement.dispatchEvent(newEventPopupLoading);

            request.open('GET', urlPopup, true);
            request.onload = function() {

                if (request.status >= 200 && request.status < 400) {
                    var resp = request.responseText;

                    setPopup(resp);
                }


            };
            if (!document.querySelector('.loading')) {
                return false;
            }

            request.send();



        };

    return {
        setLoadingFunc: setLoadingFunc,
        getPopup: getPopup,
        setPopup: setPopup,
        getPopupInfo: getPopupInfo,
        getPopupElem: getPopupElem,
        removePopup: removePopup

    };

})(window);