var mobileNav = (function(window, undefined) {
    "use strict";
    var mainNav,
        userNav,
        langNav,
        btnShow,
        btnHide,
        btnUser,
        btnUserHide,
        btnLang,
        btnLangHide,
        body,
        htmlElement,
        timeout,
        btnMenu,
        menuitems,
        currentMenu,
        btnShowData = 'show',
        btnHideData = 'hide',
        btnShowUserMenu = 'user',
        btnHideUserMenu = 'hideUserMenu',
        btnShowLangMenu = 'lang',
        btnHideLangMenu = 'hideLangMenu',
        ulMenu = 'menu',
        btnPatt = 'data-js-btnNav',
        mainNavPatt = 'data-js-mainNav',
        mainNavData = 'mainNav',
        userNavPatt = 'data-js-userNav',
        userNavData = 'userNav',
        langNavData = 'langNav',
        navBtnPatth = 'data-js-menulist',
        navBtn = 'navigate',
        mainNavShowClass = 'mainNav--show',
        mainNavHideClass = 'mainNav--hide',
        delayHide = 500,
        delayShow = 300,

        resetMenu = function() {
            clearTimeout(timeout);
            timeout = null;
            removeClass(currentMenu, mainNavHideClass);
            currentMenu.removeAttribute('style');
            setProperties();
        },

        hideMenu = function() {

            removeClass(currentMenu, mainNavShowClass);
             addClass(currentMenu, mainNavHideClass);
            timeout = setTimeout(resetMenu, delayHide);
            //mobileLang.resetMenu();
        },
        endShow = function() {
            //console.log()
            clearTimeout(timeout);
            timeout = null;
            addClass(currentMenu, mainNavShowClass);

        },
        showMenu = function(e) {
            e.preventDefault();
            currentMenu = mainNav;
            mobileLock.lock(mainNav, hideMenu);
            unbindElemHandler.apply(btnShow, [showMenu, 'mousedown']);
            mainNav.style.display = 'block';
            timeout = setTimeout(endShow, delayShow);
            //endShow();
        },
        showUserMenu = function(e) {
            e.preventDefault();
            currentMenu = userNav;
            mobileLock.lock(userNav, hideMenu);
            unbindElemHandler.apply(btnUser, [showUserMenu, 'mousedown']);
            userNav.style.display = 'block';
            timeout = setTimeout(endShow, delayShow);
            //endShow();
        },
        showLangMenu = function(e) {
            e.preventDefault();
            currentMenu = langNav;
            console.log(langNav)
            mobileLock.lock(langNav, hideMenu);
            unbindElemHandler.apply(btnLang, [showLangMenu, 'mousedown']);
            langNav.style.display = 'block';
            timeout = setTimeout(endShow, delayShow);
            //endShow();
        },
        setProperties = function() {
            bindElemHandler.apply(btnShow, [showMenu, 'mousedown']);
            bindElemHandler.apply(btnHide, [mobileLock.unlock, 'mousedown']);
            bindElemHandler.apply(btnUser, [showUserMenu, 'mousedown']);
            bindElemHandler.apply(btnUserHide, [mobileLock.unlock, 'mousedown']);
            bindElemHandler.apply(btnLang, [showLangMenu, 'mousedown']);
            bindElemHandler.apply(btnLangHide, [mobileLock.unlock, 'mousedown']);
        },







        getBtns = function() {
            var hasButtons;
            body = document.body;
            htmlElement = document.querySelector('html');
            mainNav = findElem(mainNavPatt, mainNavData) || null;
            userNav = findElem(userNavPatt, userNavData) || null;
            langNav = findElem(userNavPatt, langNavData) || null;
            btnShow = findElem(btnPatt, btnShowData) || false;
            btnUser = findElem(btnPatt, btnShowUserMenu) || false;
            btnLang = findElem(btnPatt, btnShowLangMenu) || false;
            btnHide = findElem(btnPatt, btnHideData) || false;
            btnUserHide = findElem(btnPatt, btnHideUserMenu) || false;
            btnLangHide = findElem(btnPatt, btnHideLangMenu) || false;
            hasButtons = btnShow && btnHide && mainNav ? setProperties.apply() : null;
            btnMenu = findElem(navBtnPatth, navBtn) || false;

            //console.log(langNav)


            //menuitems = findElem(mainNavData, btnShowData) || false;;
        },
        init = function() {
            getBtns();
        };
    return {
        init: init
    };
})(window);