var selectGroup = (function (window, undefined) {
    "use strict";
    var selectPanel,
        selectBtnList,
        btnActive,

        selectPanelBody,
        selectPanelHeader,
        togglePanelBtn,

        panelHeaderList,
        numButtons,
        numLangs,

        body,

        numChecked = 0,
        delayToggle = 100,

        patternMatch = 'data-js-actiongroup',

        patternBtn = 'button',
        patternPanel = 'panel',

        showBtnClassname = 'actionGroup-action--active',
        showPanelClassname = 'actionGroup-panel--active',


        bindElemHandler = function (methodName, evtType) {
            var eventType = evtType || 'click';
            addEventHandler(this, eventType, methodName);
        },

        findSingleElem = function (patternElem, ptMatch) {
            var pattMatch = ptMatch || patternMatch,
                singleElem = document.querySelector('[' + pattMatch + '="' + patternElem + '"]');
            return singleElem;
        },

        closePanel = function () {
            removeClass(btnActive, showBtnClassname);
            removeClass(selectPanel, showPanelClassname);
            //selectPanelBody.removeAttribute('style');
             changeIconClass();

        },

        checkIsOver = function (e) {
            var target = e.target || e.srcElement,
                parents = $(target).parents('.actionGroup');
            if (parents.length === 0) {
                closePanel();
            }
        },

        togglePanel = function (target) {
            toggleClass(target, showBtnClassname);
            toggleClass(selectPanel, showPanelClassname);
            //selectPanelBody.style.display = (numChecked < 1) ? 'block' : 'none';
             changeIconClass();

        },


        showPanel = function (e) {
            var target = e.currentTarget || e.srcElement;
            insertBefore(target, selectPanel);
            e.preventDefault();
            if (btnActive && btnActive !== target) {
                closePanel();
            }
            btnActive = target;
            togglePanel(target);
        },

        changeIconClass = function(close) {
           /* var svgElem = togglePanelBtn.children[0];
             if (!close) {
                removeClass(svgElem, 'flipX');
                return;
             }
             toggleClass(svgElem, 'flipX');*/
        },

        toggleBodypanel = function () {
            $(selectPanelBody).slideToggle(delayToggle);
            console.log('toggleBodypanel')
            changeIconClass(true);
        },

        toggleMethodItems = function (method, args1, args2) {
            window[method](args1, args2);
        },

        toggleItems = function () {
            var isChecked = this.checked,
                methods = ['fadeUp', 'fadeDown'],
                elemObj = this.elemObj,
                displayElem = 'inline-block';
            toggleMethodItems(methods[Number(isChecked)], elemObj.panelBodyItem, displayElem);
            toggleMethodItems(methods[Number(!isChecked)], elemObj.panelHeaderItem, displayElem);

        },

        calculateNumChecked = function (nm) {
            var num = (2 * nm - 1);
            numChecked += num;
            numChecked = Math.max(0, numChecked);
            if(nm === 0 &&  numChecked === 0 ) {
                selectPanelBody.style.display = 'inline-block';
            }
            togglePanelBtn.style.display = (numLangs === numChecked ||  numChecked < 1 ) ? 'none' : 'inline-block';

        },


        checkBodyPanelElems = function (e) {
            var elem = e.currentTarget || e.srcElement,
                elemObj = elem.elemObj,
                elemLocation = elem.checked ? elemObj.locationHeader : elemObj.locationBody;
            insertBefore(elemLocation, elem);
            toggleItems.apply(elem);
            calculateNumChecked(Number(elem.checked));
        },

        addHeaderElem = function (index) {
            this.elemObj = {
                elemLabel: this.parentNode.children[1].cloneNode(true),
                panelHeaderItem: panelHeaderList.children[this.elemIndex],
                panelBodyItem: this.parentNode,
                locationHeader: null,
                locationBody: this.parentNode.children[1]
            };

            this.elemObj.panelHeaderItem.appendChild(this.elemObj.elemLabel);
            this.elemObj.locationHeader = this.elemObj.panelHeaderItem.firstChild;
            this.checked = false;
            this.elemObj.panelHeaderItem.style.display = 'none';
            addClass(this.elemObj.panelBodyItem, 'langlist-item--condensed');
        },


        createHeaderItems = function () {
            var panelHeaderItem = createNewElem('langlist-item langlist-item--condensed', 'li');
            panelHeaderList.appendChild(panelHeaderItem);
        },


        setBodypanelElemsHandlers = function (list) {
            var singleElem,
                i = 0;
            numLangs = list.length;
            for (i; i < numLangs; i++) {
                singleElem = list[i];
                singleElem.elemIndex = i;
                createHeaderItems();
                addHeaderElem.apply(singleElem);
                bindElemHandler.apply(singleElem, [checkBodyPanelElems, 'change']);
            }
            singleElem = list[0];
            singleElem.click();
        },

        getBodyPanelElems = function () {
            var bodyPanelElems = selectPanelBody.querySelectorAll('.form-checkbox');
            setBodypanelElemsHandlers(bodyPanelElems);
        },

        getPanelElems = function () {
            /*togglePanelBtn = findSingleElem('togglepanel');
            selectPanelBody = findSingleElem('body');
            selectPanelHeader = findSingleElem('header');
            panelHeaderList = createNewElem('langlist', 'ul');
            //insertBefore(togglePanelBtn, panelHeaderList);
            getBodyPanelElems();
            bindElemHandler.apply(togglePanelBtn, [toggleBodypanel]);*/
        },

        setBtnListHandlers = function () {
            var selectBtn, i = 0;
            for (i; i < numButtons; i++) {
                selectBtn = selectBtnList[i];
                bindElemHandler.apply(selectBtn, [showPanel]);
            }
            i = null;
            selectBtnList = null;
        },

        getBtnListLen = function () {
            selectBtnList = document.querySelectorAll('[' + patternMatch + '="' + patternBtn + '"]');
            numButtons = selectBtnList.length;
        },

        getBodyElem = function () {
            body = document.body;
            bindElemHandler.apply(body, [checkIsOver, 'mouseup']);
        },

        getElems = function () {
            getBtnListLen();
            selectPanel = findSingleElem(patternPanel);
            if (numButtons < 1 || !selectPanel) {
                return false;
            }
            selectPanel.style.willChange = 'height';
            setBtnListHandlers();
            getPanelElems();
            getBodyElem();
        },

        init = function () {
            getElems();
        };

    return {
        init: init
    };

})(window);