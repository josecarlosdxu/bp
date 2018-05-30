var actiongroup = (function(window, undefined) {
    "use strict";
    var body,
        checkPatt = '.actionGroup-checkbox',
        panelPatt = '.actionGroup-panel',
        btnPatt = '.actionGroup-button',
        msgBoxErrorClass = 'msgBox--error',
        hideClass = 'u-hide',
        evtCheck = 'change',
        evtBtn = 'click',
        bodyEvt = 'mousedown',
        showAlert = function(show) {
            var showed = show || false,
                method = showed ? removeClass : addClass,
                msgBox = this.msgBox || false;
            if (!msgBox) {
                return false;
            }
            method.apply(null, [msgBox, hideClass]);
            showed = method = msgBox = null;
        },
        checkClosePanelEvt = function(evt) {
            var checkElem = body.actiongroup.checkElem,
                target = evt.target;
            evt.preventDefault();
            evt.stopPropagation();
            if (target === checkElem.label) {
                removeEventHandler(body, bodyEvt, checkClosePanelEvt);
                return;
            }

            if (getParents(target, panelPatt) === null) {
                removeEventHandler(body, bodyEvt, checkClosePanelEvt);
                checkElem.checked = false;
            }
        },
        launchWindowListeners = function(evt) {
            var elm = evt.target,
                bar = elm.bar;
            body.actiongroup.checkElem = elm;
            addEventHandler(body, bodyEvt, checkClosePanelEvt);
            showAlert.apply(bar, [false]);
            elm = bar = null;
        },
        getCompletepanels = function(evt) {
            var panel,
                completedPanel = true,
                completedBar = true,
                btn = evt.target,
                bar = btn.bar,
                panels = bar.panels,
                len = panels.length;
            len -= 1;
            while (len >= 0) {
                panel = panels[len];
                completedPanel = getPanelProps(panel);
                if (!completedPanel) {
                    completedBar = completedPanel;
                }
                len--;
            }
            showAlert.apply(bar, [!completedBar]);
            panel = completedPanel = completedBar = btn = bar = panels = len = null;
        },
        setBtnProps = function(btn, bar) {
            btn.bar = bar;
            addEventHandler(btn, evtBtn, getCompletepanels);
        },
        getPanelProps = function(panel) {
            var checkElm,
                isChecked,
                completedLen = 0,
                checkList = panel.checkList,
                len = panel.len;
            while (len >= 0) {
                checkElm = checkList[len];
                completedLen += Number(checkElm.checked);
                len--;
            }
            checkElm = isChecked = checkList = len = null;
            return Boolean(completedLen);
        },
        setPanelProps = function(panel) {
            var checkElm,
                checkList = panel.querySelectorAll('input[type="checkbox"]'),
                len = checkList.length;
            len -= 1;
            panel.checkList = checkList;
            panel.len = len;
            //panel iterate chechs for reset
            while (len >= 0) {
                checkElm = checkList[len];
                checkElm.checked = false;
                len--;
            }
            checkElm = checkList = len = null;
        },
        setActionBarProps = function(bar) {
            //actionGroup
            var btnElm;
            if (!bar.panels) {
                bar.panels = [];
            }
            if (bar.btnElm) {
                return false;
            }
            btnElm = bar.querySelector(btnPatt);
            if (hasClass(bar.nextElementSibling, msgBoxErrorClass) !== null) {
                bar.msgBox = bar.nextElementSibling;
            }
            showAlert.apply(bar, [false]);
            setBtnProps(btnElm, bar);
            bar.btnElm = btnElm;
            bar.completed = false;
            btnElm = null;
        },
        setElemProps = function(elm) {
            // checkbox elem launcher
            var parent = elm.parentNode,
                actionBar = parent.parentNode,
                panel = parent.querySelector(panelPatt);
            setActionBarProps(actionBar);
            elm.checked = false;
            setPanelProps(panel);
            actionBar.panels.push(panel);
            elm.label = elm.nextElementSibling;
            elm.panel = panel;
            elm.bar = actionBar;
            addEventHandler(elm, evtCheck, launchWindowListeners);
        },
        getItems = function() {
            var elem,
                checkboxList = document.querySelectorAll(checkPatt) || false,
                len = checkboxList.length || false;
            if (!len && checkboxList) {
                return false;
            }
            len -= 1;
            while (len >= 0) {
                elem = checkboxList[len];
                setElemProps(elem);
                len--;
            }
            body = document.body;
            body.actiongroup = {};
            elem = checkboxList = len = null;
        },
        init = function() {
            window.removeEventListener('load', actiongroup.init, false);
            getItems();
        };
    return {
        init: init
    };
})(window);
window.addEventListener('load', actiongroup.init, false);
