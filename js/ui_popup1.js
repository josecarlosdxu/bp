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
        topScroll,
        popupBg,
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
        closePopup = function(evt) {
            var e = evt || document.createEvent('Event'),
                body = document.body,
                target = e.target || e.srcElement,
                popupGrid = document.querySelector('[data-js-popupGrid]') || popupBg.children[0],
                btnClose = target.getAttribute('data-js-popup') === "close",
                parentNode = target.parentNode;

            if (parentNode !== popupGrid && parentNode !== body && !btnClose) {
                return false;
            }
            lockBody(false);
            removeEventHandler(document.body, 'mousedown', closePopup);
            removeClass(popupBg, popupBgCursorClassname);
            document.documentElement.dispatchEvent(newEventPopupLoaded); // para cerrar el loading


        },

        lockBody = function(activate) {
            var act = activate || false,
            isMobile = document.querySelector('.mobileHeader')|| false,
            bodyTop = "-"+topScroll+"px",
            body = document.body;

            if (act) {
                //popupBg.style.overflowY = "scroll";
                addClass(body, 'body--locked');
                //body.style.top = bodyTop;
                return false;
            }
            removeClass(body, 'body--locked');
            //body.removeAttribute("style");
            popupBg.removeAttribute("style");
        },

        setListeners = function() {
            popupCloseBtn = popupElem.querySelectorAll(btnMatch);
            popupSubmitBtn = popupElem.querySelector(submitMatch);
            popupCloseBtnLength = popupCloseBtn.length;
            if (popupCloseBtn) {
                for (var i = 0; i < popupCloseBtnLength; i++) {
                    addEventHandler(popupCloseBtn[i], 'mousedown', closePopup);
                }
            }
            if (popupSubmitBtn) {
                addEventHandler(popupSubmitBtn, 'mousedown', actionPopup);
            }
            popupBg = document.querySelector(popupBgPattern);
            addClass(popupBg, popupBgCursorClassname);
            lockBody(true);
            addEventHandler(document.body, 'click', closePopup);

        },

        createDOMObject = function(stringElem) {
            var DOMObj, div = document.createElement('div');
            div.innerHTML = stringElem;
            DOMObj = div.firstChild;
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
             var replaceEvent;
            popupElem = popupElm || null;
            topScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (!popupElem) {
                return false;
            }
            if ((typeof popupElem) === 'string') {
                popupElem = createDOMObject(popupElm);
            }
            replaceEvent = new CustomEvent('replace');
            newEventPopupLoading = loading.setLoadingEvent(popupElem);
            newEventPopupLoaded = loading.setLoadedEvent(newEventPopupLoading);
            document.documentElement.dispatchEvent(newEventPopupLoading);
            document.documentElement.dispatchEvent(replaceEvent);
            setListeners();
        },

        getPopup = function(url, popSbmtAction, pActionArgs) {
            var replaceEvent, eventPopupLoading = loading.setLoadingEvent();
            popupSubmitAction = popSbmtAction || null;
            popupActionArgs = pActionArgs || [];
            urlPopup = url;
            document.documentElement.dispatchEvent(eventPopupLoading);
            // para iniciar el loading
            $('<div/>').load(urlPopup, function() {    

               popupElem = $(this).children()[0];
               $('.loading').replaceWith(popupElem);

            replaceEvent = new CustomEvent('replace');
            newEventPopupLoading = loading.setLoadingEvent(popupElem);
            newEventPopupLoaded = loading.setLoadedEvent(newEventPopupLoading);
            document.documentElement.dispatchEvent(newEventPopupLoading);
            document.documentElement.dispatchEvent(replaceEvent);
            setListeners();
               //addClass(document.body, 'body--locked');
                //setPopup(popupElem);
            });

        };

    return {
        getPopup: getPopup,
        setPopup: setPopup,
        getPopupInfo: getPopupInfo,
        getPopupElem: getPopupElem

    };

})(window);
