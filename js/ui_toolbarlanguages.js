var toolbarLanguages = {};


(function() {
    "use strict";
    var languagesNav,
        languagesPanel,
        languagesBtn,
        eventToolbar,
        body,
        patternMatch = 'data-js-toolbar-languages',
        activeBtnClass = 'toolbar-item--active',
        selectedClass = 'langlist--selected',
        languagesPanelPatt = '[ data-js-langlist ="langlist"]',
        _isShowed = false,
        hidePanel = function() {
            removeClass(languagesBtn, activeBtnClass);
            removeClass(languagesPanel, selectedClass);
            removeEventHandler(body, 'click', btnClick);
            removeClass(body, 'blur');
            languagesBtn.blur();
        },

        showPanel = function() {
            addClass(languagesBtn, activeBtnClass);
            addClass(languagesPanel, selectedClass);
            addEventHandler(body, 'click', btnClick);
            addClass(body, 'blur');
            removeClass(body, 'focus');
        },

        togglePanel = function(e) {
            var target = e.target,
                toShow = target === languagesBtn && !_isShowed,
                method = toShow ? showPanel : hidePanel;
            _isShowed = !_isShowed;
            method.apply();
        },
        btnClick = function(e) {
            var target = e.target,
                currentTarget = e.currentTarget,
                hasLink = hasClass(target, 'langlist-link');
            e.preventDefault();
            e.stopPropagation();
            if (expressCart.isShowed()) {
                expressCart.closePanel();
            }
            if (currentTarget === languagesNav && !hasLink) {
                return false;
            }
            if (hasLink) {
                document.location.href = target.getAttribute('href');
            }
            currentTarget.dispatchEvent(eventToolbar);
        },
        setListeners = function() {
            eventToolbar = eventBuilder('toolbarEvent');
            languagesBtn.prototype = new EventDispatcher();
            addEventHandler(languagesBtn, 'click', btnClick);
            addEventHandler(languagesNav, 'click', btnClick);
            addEventHandler(document.documentElement, 'toolbarEvent', togglePanel);
        },

        isShowed = function() {
            return _isShowed;
        },

        getElems = function() {
            languagesNav = document.querySelector('[' + patternMatch + '="toolbar-languages"]');
            languagesBtn = document.querySelector('[' + patternMatch + '="toolbar-languages-btn"]');
            languagesPanel = document.querySelector(languagesPanelPatt);
            body = document.body;
            setListeners();
        },
        init = function() {
            getElems();
        };

    this.init = init;
    this.togglePanel = togglePanel;
    this.isShowed = isShowed;

}).apply(toolbarLanguages);
window.addEventListener('load', toolbarLanguages.init, true);