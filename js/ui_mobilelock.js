var mobileLock = (function(window, undefined) {
    "use strict";
    var body,
        bgShadow,
        timeout,
        delay,
        elemLauncher,
        closeLauncher,
        haslocked = false,
        defaultDelay = 300,
        bodyLockedClass = 'body--locked',
        bgShadowData = 'bgShadow',
        bgShadowClass = 'mainNav-background',
        bgShadowShowClass = 'mainNav-background--show',

        lockBody = function() {
            clearTimeout(timeout);
            timeout = null;
            addClass(body, bodyLockedClass);
            window.ontouchmove = null;
            haslocked = true;
            bindEvents();
        },
        unfixBody = function() {
            removeClass(bgShadow, bgShadowShowClass);
            removeClass(body, bodyLockedClass);
            removeNode(bgShadow);
            haslocked = false;
        },

        hideShadow = function(e) {
            var evt = e ? e.preventDefault() : null;
            // console.log(evt);
             /*if (!haslocked) {
                return false;
             }*/
            unbindElemHandler.apply(bgShadow, [hideShadow, 'touchstart']);
            unbindElemHandler.apply(bgShadow, [hideShadow, 'click']);
            if (closeLauncher) {
                closeLauncher();
            }
            unfixBody();
        },

        showShadow = function() {
            window.ontouchmove = function(e) { e.preventDefault(); };
            addClass(bgShadow, bgShadowShowClass);
        },

        bindEvents = function() {
            bindElemHandler.apply(bgShadow, [hideShadow, 'touchstart']);
            bindElemHandler.apply(bgShadow, [hideShadow, 'click']);

        },
        createShadow = function() {
            bgShadow = createNewElem(bgShadowClass);
            //console.log('elemLauncher',elemLauncher)
            insertBefore(elemLauncher, bgShadow);
            showShadow();
        },

        lock = function(elem, clsLauncher, delayLock) {
            //if (!haslocked) {
                delay = delayLock || defaultDelay;
                elemLauncher = elem;
                body = document.body;
                closeLauncher = clsLauncher;
                createShadow();
                timeout = setTimeout(lockBody, delay);
            //}
        };

    return {
        lock: lock,
        unlock: hideShadow

    };
})(window);
