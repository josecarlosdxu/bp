var menuPanel = (function (window, undefined) {
    "use strict";
    var activeBtn,
        panelPattern = 'data-js-menupanel_idpanel',
        buttonIdAttr = 'data-js-menupanel_idbutton',
        panelPosAttr = 'data-js-menupanel_pos',
        buttonActiveClass = 'menuPanel-button--active',
        panelActiveClass = 'menuPanel--active',
        patternMatch = ' data-js-menupanel',
        btnPatternText = 'button',



        hidePanel = function (btn) {
            removeClass(  btn.buttonPanel, panelActiveClass);
            removeClass(btn, buttonActiveClass);
            activeBtn.active = false;
            activeBtn = null;
            unbindElemHandler.apply(document.body, [clickExternal]);
        },

        clickExternal = function(e){
            var target = e.target || e.srcElement;
            if($(target).parents('['+patternMatch+']').length <1  && target !== activeBtn) {
             hidePanel(activeBtn, activeBtn.buttonPanel);
           }

        },
        setPanelPosition = function (panel, btn) {
            var indexLeft = btn.parentNode.parentNode.getBoundingClientRect().left,
           btnLeft = btn.getBoundingClientRect().left - indexLeft ,
           outlineWidth =  6;
            panel.style.left =  btnLeft + outlineWidth +'px';
        },

        showPanel = function (btn, panel) {
            if (activeBtn) {
                hidePanel(activeBtn);
            }
            activeBtn = btn;
            addClass(panel, panelActiveClass);
            addClass(btn, buttonActiveClass);
            setPanelPosition(panel, btn);
            bindElemHandler.apply(document.body, [clickExternal]);
        },

        activateBtn = function (e) {
            var btn = e.currentTarget || e.srcElement,
                panel = btn.buttonPanel,
                isActive = !btn.active;
                btn.active = isActive;
                isActive ? showPanel(btn, panel) : hidePanel(btn, panel);
        },
        setButtonProps = function () {
            var obj = {
                buttonPanel: document.querySelector(getPattern(panelPattern, this.getAttribute(buttonIdAttr))),
                active: false

            }
            for (var e in obj) {
                this[e] = obj[e];
            }
            bindElemHandler.apply(this, [activateBtn]);
        },

        iterateButtons = function (buttonsList, len) {
            for (var i = 0; i < len; i++) {
                setButtonProps.apply(buttonsList[i]);
            }
        },

        getButtons = function () {
            var buttonsList = document.querySelectorAll(getPattern(patternMatch, btnPatternText)),
                len = buttonsList.length;
            len > 0 ? iterateButtons(buttonsList, len) : null;
        },
        init = function () {
            getButtons();
        };
    return {
        init: init
    };
})(window);