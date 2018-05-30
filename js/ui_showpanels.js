var showPanels = (function (window, undefined) {
    "use strict";
    var len,
    actionsBar,
    checkList,
    checkAll,



    NumChecked = 0,
    slideDelay = 100,

    patternMatch = 'data-js-checkActions',
    selectedTRClass = 'table-tr--selected',

    patternElem = 'elem',
    patternCheckAll = 'all',
    patternBar = 'actions',


    hidePanel = function () {
        $(actionsBar).slideUp(slideDelay, function () {
            NumChecked = 0;
        });
    },

    showPanel = function () {
        $(actionsBar).slideDown(slideDelay);
    },

    toggleTrState = function (elemTr, isChecked) {
        if (isChecked) {
            addClass(elemTr, selectedTRClass);
            return;
        }
        removeClass(elemTr, selectedTRClass);
    },


    checkAllItems = function (e) {
        var checkElem,
        elemTr,
        target = e.currentTarget || e.srcElement,
        isChecked = target.checked,
        i = 0;
        for (i; i < len; i++) {
            checkElem = checkList[i];
            elemTr = checkElem.obj.tr;
            checkElem.checked = isChecked;
            toggleTrState(elemTr, isChecked);
        }
        if (isChecked) {
            showPanel();
            NumChecked = len;
            return;
        }
        hidePanel();

    },

    panelActions = function (isChecked) {
        var actionPanel,
        factor = Math.ceil(2 * (Number(isChecked)) - 1);
        NumChecked += factor;
        actionPanel = NumChecked === 1 ? showPanel() : NumChecked < 1 ? hidePanel() : null;
        actionPanel = null;
    },


    getCheckbox = function (e) {
        var target = e.target || e.srcElement,
        checkbox;
        if ((typeof target.obj) === 'undefined') {
            checkbox = target.firstChild;
            checkbox.checked = !checkbox.checked;
            e.preventDefault();
        } else {
            checkbox = target;
        }
        return checkbox;
    },

    checkShowPanel = function (e) {
        var elemTr,
        isChecked,
        checkbox = getCheckbox(e);
        isChecked = checkbox.checked;
        checkAll.checked = false;
        elemTr = checkbox.obj.tr;
        panelActions(isChecked);
        toggleTrState(elemTr, isChecked);
    },


    setListProperties = function () {
        var checkElem,
        elemTd,
        i = 0;
        for (i; i < len; i++) {
            checkElem = checkList[i];
            elemTd = checkElem.parentNode;
            checkElem.obj = {
                td: elemTd,
                tr: elemTd.parentNode
            };
            checkElem.checked = false;
            addEventHandler(elemTd, 'click', checkShowPanel);
        }
        i = null;

    },


    setCheckAllProperties = function () {
        checkAll = document.querySelector('[' + patternMatch + '="' + patternCheckAll + '"]');
        if (!checkAll) {
            checkAll = document.createElement('input');
            checkAll.type = "checkbox";
        }
        checkAll.checked = false;
        addEventHandler(checkAll, 'click', checkAllItems);
    },


    getElems = function () {
        checkList = document.querySelectorAll('[' + patternMatch + '="' + patternElem + '"]');
        actionsBar = document.querySelector('[' + patternMatch + '="' + patternBar + '"]') || document.createElement('div');
        len = checkList.length;
        if (len < 1) {
            return false;
        }
        setListProperties();
        setCheckAllProperties();

    },

    init = function () {
       // getElems();
    };

    return {
        init: init
    };

})(window);