var helpCenterPanel = (function(window, undefined) {
    "use strict";
    var activeSection,
        activeLabel = false,
        btnMatch = 'data-js-helpbtn',
        sectionMatch = 'data-js-helpsection',
        selectedPanelClass = 'helpSection--selected',
        selectedLabelClass = 'menuList-link--selected',
        showSections = function(evt) {
            var btnPanel = evt.target.panel,
                btnLabel = evt.target.label;
            evt.preventDefault();

            if (btnPanel === activeSection) {
                return false;
            }
            if(activeLabel){
                removeClass(activeLabel, selectedLabelClass);
            }
            removeClass(activeSection, selectedPanelClass);
            addClass(btnPanel, selectedPanelClass);
            addClass(btnLabel,selectedLabelClass);
            activeSection = btnPanel;
            activeLabel = btnLabel;

            btnPanel = btnLabel = null;
        },
        setBtnsProps = function(btn) {
             var btnPanel = findElem(sectionMatch, btn.id) || false,
             btnLabel = document.querySelector('label[for="'+btn.id+'"]') || false;

             if (!btnPanel && btnLabel) {
                 addClass(btnLabel,'menuList-link--disabled');
                 removeNode(btn);             }

             if (!btnPanel && !btnLabel) {
                return false;
            }

            btn.panel = btnPanel
            btn.label = btnLabel;
            btn.checked = false;
            btnPanel = btnPanel = null;
            bindElemHandler.apply(btn, [showSections, 'change']);
        },
        getActiveSection = function() {
            activeSection = document.querySelector('.' + selectedPanelClass) || false;
            if (!activeSection) {
                return false;
            }
        },
        getBtns = function() {
            var len, i = 0,
                btnsList = document.querySelectorAll('[' + btnMatch + ']') || false;
            if (!btnsList) {
                return false;
            }
            len = btnsList.length;
            if(len === 0){
                len = i = btnsList = null;
                return false;
            }
            for (i; i < len; i++) {
                setBtnsProps(btnsList[i]);
            }
            getActiveSection();
            len = i = btnsList = null;
        },
        init = function() {
            getBtns();
        };
    return {
        init: init
    };

})(window);
window.addEventListener("load", helpCenterPanel.init, false);
