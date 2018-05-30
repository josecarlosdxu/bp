var checkActions = (function(window, undefined) {
    "use strict";
    var actionsBarList,
        actionsBarLen,
        fixedTable,
        fixedTablePTop,
        patternMatch = 'data-js-checkActions',
        patternBar = 'actions',
        elemAttrName = 'data-js-checkactions',
        elemAttrVal = 'elem',
        checkAllVal = 'all',
        slideDelay = 100,
        selectedRowClass = 'table-tr--selected',
        actionsBarContextClassName = '.panel-section',

        fixedTableSetPadding = function(){
            if(fixedTable){
                fixedTable.style.paddingTop = fixedTablePTop;
            }
        },
        fixedTableRemovePadding = function(){
            if(fixedTable){
                removeStyleProp(fixedTable, 'padding-top');

            }
        },

        showBar = function(actionBar) {
            $(actionBar).slideDown(slideDelay);
            fixedTableSetPadding();
        },
        hideBar = function(actionBar) {
            $(actionBar).slideUp(slideDelay, function() {
                $(this).selectedItems = 0;
                $(actionBar).removeAttr('style');
            });
            fixedTableRemovePadding();
        },
        toggleBar = function(elem, show) {
            var index = booleanToRange(show),
                actionBar = elem.actionBar,
                numItems = Math.max(actionBar.selectedItems += index, 0);
            Boolean(numItems) ? showBar(actionBar) : hideBar(actionBar);
        },

        toggleFixedTableTop = function() {
            fixedTable = document.querySelector('.fixedTableContent') || null;
            if (!fixedTable) {
                return false;
            }
            if (!fixedTablePTop) {
                fixedTablePTop = window.getComputedStyle(fixedTable).getPropertyValue('padding-top').match(/\d+/);
                fixedTablePTop = Number(fixedTablePTop)+44;
                fixedTablePTop = fixedTablePTop +'px';
            }


        },
        selectParentRow = function(elm, sel) {
            var parentRow = elm.parentNode;
            sel ? addClass(parentRow, selectedRowClass) : removeClass(parentRow, selectedRowClass);

        },
        checkAllElems = function(e) {
            var i = 0,
                elem = e.target || e.srcElement,
                elemList = elem.elemList,
                actionBar = elem.actionBar,
                len = elemList.length,
                isChecked = elem.checked;
            for (i; i < len; i++) {
                checkCheckboxElem(null, elemList[i], isChecked);
            }
            actionBar.selectedItems = isChecked * len;
            isChecked = isChecked ? showBar(actionBar) : hideBar(actionBar);
        },
        checkCheckboxElem = function(e, elm, check) {
            console.log(e)
            var elem = elm || e.target || e.srcElement,
                checkboxElem = elem.checkboxElem,
                isChecked = check || !checkboxElem.checked;
            checkboxElem.checked = isChecked;
            if (!check) {
                toggleBar(elem, isChecked);
                elem.actionBar.checkAllElem.checked = false;
            }

            selectParentRow(elem, isChecked);
        },
        selectElem = function(e) {
            var elem = e.currentTarget || e.srcElement,
                active = !elem.active;
            elem.active = active;

            toggleBar(elem, active);
            toggleClass(elem, elem.selectedClass);
        },
        setElemProps = function(actionBar) {
            var elemFirstChild = this.children[0],
                obj = {
                    'actionBar': actionBar,
                    'checkboxElem': hasClass(elemFirstChild, 'u-locked-evts') ? elemFirstChild : null,
                    'selectedClass': this.getAttribute('data-js-selectedclass') || null
                }
            for (var e in obj) {
                this[e] = obj[e];
            }
            if (this.checkboxElem) {
                this.checkboxElem.checked = false;
                bindElemHandler.apply(this, [checkCheckboxElem]);
            }
            if (this.selectedClass) {
                this.active = false;
                bindElemHandler.apply(this, [selectElem]);
            }
             toggleFixedTableTop();
        },
        checkAllSetProps = function(obj) {
            for (var e in obj) {
                this[e] = obj[e];
            }
            this.actionBar.checkAllElem = this;
            bindElemHandler.apply(this, [checkAllElems, 'change']);
        },
        getContextElems = function(actionBar) {
            var i = 0,
                checkAllElem = this.querySelector(getPattern(elemAttrName, checkAllVal)) || createNewElem(null, 'input', [{
                    'type': 'checkbox'
                }]),
                contextElems = this.querySelectorAll(getPattern(elemAttrName, elemAttrVal)),
                len = contextElems.length;
            if (len < 1) {
                return;
            }
            if (checkAllElem) {
                checkAllSetProps.apply(checkAllElem, [{
                    elemList: contextElems,
                    checked: false,
                    actionBar: actionBar
                }]);
            }
            for (i; i < len; i++) {
                setElemProps.apply(contextElems[i], [actionBar]);
            }
        },
        getBarContext = function() {
            var contextElem, context = $(this).parents(actionsBarContextClassName);
            if (context.length < 1) {
                return;
            }
            contextElem = context[0];
            this.selectedItems = 0;
            getContextElems.apply(contextElem, [this]);
        },
        setBarsProps = function() {
            for (var i = 0; i < actionsBarLen; i++) {
                getBarContext.apply(actionsBarList[i]);
            }
        },
        getBars = function() { ///  find actionbars
            var len;
            actionsBarList = document.querySelectorAll(getPattern(patternMatch, patternBar));
            actionsBarLen = actionsBarList.length;
            len = actionsBarLen > 0 ? setBarsProps() : null;
        },
        init = function() {
            getBars();
        };
    return {
        init: init
    };
})(window);
