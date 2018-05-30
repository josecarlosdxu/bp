var mobileLang = (function(window, undefined) {
    "use strict";
    var btnLang,
        menu,
        langMenu,
        langList,
        langElemSelected,
        menuName = 'menu',
        langMenuName = 'langMenu',
        hideClass = 'mainNav-menu--hide',
        btnLangSelClass = 'mainNav-button--back',
        langElemName = 'lang',
        langElemSelClass = 'mainNav-buttonLang--selected',
        btnLangPatt = 'data-js-btnlang',
        elemsPatt = 'data-js-mainnav',

        updateNewLang = function() {
            var timeout;
            btnLang.innerHTML = langElemSelected.innerHTML;
            resetMenu();
        },

        changeLang = function(e) {
            e.preventDefault();
            langElemSelected = document.querySelector('.' + langElemSelClass);
            if (langElemSelected === this) {
                return false;
            }
            removeClass(langElemSelected, langElemSelClass);
            addClass(this, langElemSelClass);
            langElemSelected = this;
            updateNewLang();
        },

        resetMenu = function() {
            removeClass(menu, hideClass);
            addClass(langMenu, hideClass);
            removeClass(btnLang, btnLangSelClass);
            langMenu.removeAttribute('style');
        },

        toggleLangMenu = function(e) {
            var evt = e || document.createEvent('event');
            evt.preventDefault();
            toggleClass(menu, hideClass);
            toggleClass(langMenu, hideClass);
            toggleClass(btnLang, btnLangSelClass);
        },

        setProps = function() {
            bindElemHandler.apply(btnLang, [toggleLangMenu, 'mousedown']);
            Array.prototype.slice.call(langList).forEach(function(el) {
                bindElemHandler.apply(el, [changeLang, 'mousedown']);
            });

        },

        getElems = function() {

            var hasElems, langsLen;
            btnLang = findElem(btnLangPatt) || false;
            menu = findElem(elemsPatt, menuName) || false;
            langMenu = findElem(elemsPatt, langMenuName) || false;
            langList = document.querySelectorAll(getPattern(elemsPatt, langElemName));
            langsLen = langList.length > 0;
            hasElems = langsLen && btnLang && menu && langMenu ? setProps() : null;
        },

        init = function() {
            getElems();
        };
    return {
        init: init,
        resetMenu: resetMenu
    };
})(window);
