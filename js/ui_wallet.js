var uiWallet = (function(window, undefined) {
    "use strict";
    var wInput,
        wButton,
        wQuantity,
        wForm,
        wParamsObj = {},
        wPrefix = 'data-js-wallet',
        minPrice = 300,
        externalFunc = function() {
            //alert(arguments[0]);
        },

        setWalletOptions = function() {
            wParamsObj.cantidad = wQuantity;
            wParamsObj.tipo = wForm.tipo.value;
            externalFunc(wParamsObj);
        },

        removeErrorClass = function(evt) {
            removeClass(wInput, 'form-input--error');
        },

        setErrorClass = function() {
            addClass(wInput, 'form-input--error');
        },

        setInputValue = function() {
            wInput.value = wQuantity;
            if (wQuantity >= minPrice) {
                setWalletOptions();
                removeErrorClass();
                return;
            }
            setErrorClass();
        },

        setNullValue = function() {
            wQuantity = 0;
            setErrorClass();
            return wQuantity;
        },

        getQuantity = function() {
            wQuantity = +wInput.value ? wInput.value : setNullValue();
            setInputValue();
        },

        buttonAction = function(evt) {
            evt.preventDefault();
            getQuantity();
        },

        setListeners = function() {
            bindElemHandler.apply(wButton, [buttonAction]);
            bindElemHandler.apply(wInput, [removeErrorClass, 'keypress']);
        },

        getElems = function() {
            wInput = findElem(wPrefix, 'quantity') || false;
            if (!wInput) {
                return;
            }
            wForm = findElem(wPrefix, 'form');
            wButton = findElem(wPrefix, 'button');
            setListeners();
        },

        setMinPrice = function(minP) {
            minPrice = minP;
        },

        setExternalMethod = function(func) {
            externalFunc = func;
            getElems();
        };

    return {
        minPrice: setMinPrice,
        /*/// OPTIONAL--> Change default min price value (300) ||||   uiWallet.minPrice(500)/**/
        externalMethod: setExternalMethod
            /*//// REQUIRED--> Assign an external function that takes an object as a parameter.
                    /* Ex. external_function(obj{tipo:string,cantidad:Number})  ||||  uiWallet.externalMethod(functionName)/**/
    };
})(window);
