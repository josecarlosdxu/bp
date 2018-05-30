var uiFormSteps = {},
    uiRelated = {},
    uiRequired = {},
    uiCheckInput = {},
    doc = document.documentElement,
    popupErrorAccountString = '<aside data-js-popup="popup" class="popup u-lg-45 animated fadeInDown u-pdt"><div class="popup-content"><div class="modularGrid"><div class="modularGrid-module u-md-25 u-tac"><img src="https://www.bigbuy.eu/public/img/draw_warning.svg" class="popup-img"></div><div class="modularGrid-module u-md-60"><h2 class="popup-extra u-mgb" data-jspopuptitle></h2><div data-jspopupcont class="u-pdh font-size1"></div></div></div><button title="Cerrar" class="button button--icon popup-close" data-js-popup="close">✕</button></aside>',
    getInitPattern = function(patt, match) {
        return '[' + patt + '*="' + match + '"]';
    };

(function() {
    var submitBtn,
        accountForm,
        stepList,
        stepsLen,
        panelActive,
        stepsObj,

        captchaField,
        patt = 'data-js-step',
        selClass = 'steps-item--selected',


        stepFw = function() {
            if (stepsObj.active < stepsLen) {
                stepsObj.active++;
            }
        },

        stepBw = function() {
            if (stepsObj.active > 1) {
                stepsObj.active--;
            }
        },

        stepsObj = {
            "active": 1,
            "fw": stepFw,
            "bw": stepBw
        },

        toggleRequired = function(elem) {
            elem.required = Boolean(Number(this));
        },

        updateStep = function(idProp, oldVal, newVal) {
            var oldStep = stepList[oldVal - 1],
                newStep = stepList[newVal - 1];
            panelActive = newStep.panel;
            oldStep.classList.remove(selClass);
            newStep.classList.add(selClass);
            oldStep.panel.style.display = 'none';
            panelActive.removeAttribute('style');
            oldStep.requiredList.map(toggleRequired.bind(0));
            newStep.requiredList.map(toggleRequired.bind(1));
            window.scrollTo(0, 0);
            return newVal;
        },

        resetFormElem = function(e) {
            var elem = e.target;
            elem.removeEventListener('input', resetFormElem);
            toggleErrorMsg(elem);
            elem.classList.remove('form-input--err');
            elem.classList.remove('form-select--error');
        },

        checkRequiredFields = function(elem) {
            var errorCode = elem.getAttribute('data-jserror') || false,
                hasPostCode = elem.getAttribute('data-js-postcode') || false,
                complete = elem.value !== "",
                msg = hasPostCode && complete ? msg = jsText[hasPostCode] + ' ' + elem.placeholder : errorCode && complete ? jsText[errorCode] : null;
            toggleErrorMsg(elem, msg);
            elem.classList.add('form-input--err');
            elem.addEventListener('input', resetFormElem);
        },


        checkServerFields = function() {  
            eventLoading = loading.setLoadingEvent();
            eventLoaded = loading.setLoadedEvent(eventLoading);
            document.documentElement.dispatchEvent(eventLoading);            
            checkVatCustomerExists(getServerResponse);  
            localStorage.setItem("uiAccountObj", JSON.stringify(uiAccountObj));
            localStorage.setItem("uservalues", JSON.stringify($(accountForm).serializeArray()));
        },

        checkeStep1Fields = function(evt) {  



            var validationErrors,
                headerPanel = stepList[0].panel.children[0],
                panel = uiTabsObj.panelSelected,
                headerInvalidFields = headerPanel.querySelectorAll(':invalid'),
                headerErrorFields = headerPanel.querySelectorAll('.form-input--err'),
                emptyFields = panel.querySelectorAll(':invalid'),
                panelSelect = panel.querySelector('select'),
                invalidSelect = !Boolean(Number(panelSelect.value)),
                selectMethod = invalidSelect ? 'add' : 'remove';

                


               



            panelSelect.classList[selectMethod]('form-select--error');  

            [].slice.call(headerInvalidFields).map(function(elem) { elem.classList.add('form-input--err') });
            [].slice.call(emptyFields).map(checkRequiredFields);
            validationErrors = emptyFields.length > 0 || headerInvalidFields.length > 0 || headerErrorFields.length > 0 || invalidSelect;

            if(uiAccountObj.countryCode ==="ES" && uiTabsObj.vat.value!=="" &&! ValidateSpanishID(uiTabsObj.vat.value).valid){
                    toggleErrorMsg(uiTabsObj.vat, "El número es incorrecto"); 
                    validationErrors=true;
            }

           
            if (!validationErrors) { 
                checkServerFields();
            }
        },



        changeStep = function(evt) {
            var btn = evt.target,
                focused = document.querySelector(':focus') || document.createElement('input');
            focused.blur();
            evt.preventDefault();

            if (btn.stepAction === stepBw) {

                btn.stepAction();
                return false;
            }
            checkeStep1Fields();

        },

        setStepProps = function(elem) {
            elem.num = elem.getAttribute(patt).slice(4);
            elem.panel = doc.querySelector(getPattern(patt, 'content' + elem.num));
            elem.requiredList = [].slice.call(elem.panel.querySelectorAll('[required]'));
        },

        setBtnProps = function(btn) {
            btn.stepAction = stepsObj[btn.getAttribute(patt)];
            btn.addEventListener('mousedown', changeStep, false);
            btn.addEventListener('click', function(e) { e.preventDefault(); });
        },


        sendForm = function() {
            eventLoading = loading.setLoadingEvent();
            doc.dispatchEvent(eventLoading);

            checkServerForm(accountForm);
            localStorage.setItem("uiAccountObj", JSON.stringify(uiAccountObj));
            localStorage.setItem("uservalues", JSON.stringify($(accountForm).serializeArray()));
            //accountForm.submit();




        },

        checkFinalStep = function(bool) {
            var invalidElemsList,
                preventSubmitInput = doc.querySelector(getPattern('data-js-preventsubmit'));
            preventSubmitInput.value = Number(bool) || '';

            invalidElemsList = [].slice.call(panelActive.querySelectorAll(':invalid'));
            if (invalidElemsList.length > 0) {
                invalidElemsList.map(function(elem) {

                    if (elem.type === "text") {
                        elem.classList.add('form-input--err');
                        elem.addEventListener('input', resetFormElem);
                        return false;
                    }
                    if (elem.type === "radio") {
                        elem.classList.add('form-input--error');
                        return false;
                    }
                    if (elem.tagName === "TEXTAREA") {
                        elem.classList.add('form-textarea--error');
                        return false;
                    }
                });
                return false;
            }
            eventLoading = loading.setLoadingEvent();
            doc.dispatchEvent(eventLoading);
            eventLoaded = loading.setLoadedEvent(eventLoading);
            validateCaptcha(captchaField, sendForm);

        },

        getSubmitBtn = function() {
            accountForm = doc.querySelector(getPattern('data-js-create-account'));
            submitBtn = doc.querySelector(getPattern('data-js-validate-form'));
            
            //accountForm.querySelector(getPattern('data-href','section1')).click(); 
            //accountForm.querySelectorAll(getPattern('name','type_customer'))[0].checked = true;           
            submitBtn.addEventListener('mousedown', uiRequired.complete, false);
            submitBtn.addEventListener('click', uiCheckInput.complete, false);
        },


        getPreviousESState = function(accountValues){

            var e,
            region,
            elem,
            regionPrefix = accountValues.postcode.substr(0, 2);
            for(e in regionList){
                elem =  regionList[e];
                if(elem.postcode === regionPrefix){
                    region =  elem.name ;
                }
            }
            [].slice.call(doc.querySelectorAll(getPattern('data-js-state'))).map(function(ele) {ele.value=region});
            [].slice.call(doc.querySelectorAll(getPattern('data-js-postcode'))).map(function(ele) {ele.addEventListener('input',uiAccount.setESRegion)});
        },
         getAccountValues = function() {

            var e,               
                val,               
                accountValues =localStorage.getItem("uiAccountObj")|| false;
            if (!accountValues) {
                accountForm.reset();
                return false;
            }            

            accountValues = JSON.parse(accountValues);
            for (e in accountValues) {
                val = accountValues[e] || false;
                if(val){
                    uiAccountObj[e] = val;
                }              
            }
            
            if(accountValues.countryCode ==="ES"){
                getPreviousESState(accountValues);
            } 
           
        },


        getUserValues = function() {
            var e,
                data,
                elem,
                name,
                val,
                uservalues = localStorage.getItem("uservalues") || false;                
            if (!uservalues) {
                return false;
            }
            uservalues = JSON.parse(uservalues);
            for (e in uservalues) {
                data = uservalues[e];
                name = data.name;
                val = data.value;
                elemList = [].slice.call(document.querySelectorAll(getPattern('name', name))) || [document.createElement('input')];
                elemList.map(function(elem) {
                    if (name !== "type_customer") {
                        elem.value = val;
                    }
                   //console.log(name);
                });
            }
           
        },

        getServerResponse = function(result) {
            var errorsList;
            if (result.error !== true) {
                doc.dispatchEvent(eventLoaded);
                stepFw();
                return false;
            }
            errorsList = result.errors;
            if (errorsList.email) {
                toggleErrorMsg(uiTabsObj.mailField, errorsList.email);
            }
            if (errorsList.vat_number) {
                toggleErrorMsg(uiTabsObj.vat, errorsList.vat_number);
            }
            doc.dispatchEvent(eventLoaded);

        },

        getElems = function() {
            [].slice.call(doc.querySelectorAll(getInitPattern(patt, 'w'))).map(setBtnProps);
            stepList = [].slice.call(doc.querySelectorAll(getInitPattern(patt, 'step')));
            stepList.map(setStepProps);
            stepsLen = stepList.length;
            stepsObj.watch('active', updateStep);
            getSubmitBtn();
            getUserValues();
            getAccountValues();
            captchaField = doc.querySelector(getPattern('data-js-captcha'));

        },

        hasSteps = function() {
            stepList = doc.querySelectorAll(getPattern(patt));
            if (stepList.length > 0) {
                getElems();
            }
            ////localStorage.clear(); ///////////////////////
        };

    this.checkFinalStep = checkFinalStep;

    this.init = function() {
        hasSteps();
    };
}).apply(uiFormSteps);

(function() {
    // required checkboxes group   
    var patt = 'data-jsrequired',
        requiredElemsLen = 0,
        setErrorClass = function(e) {
            var errorClass = 'error',
                classMethod = Boolean(e) ? 'remove' : 'add',
                elem = arguments[1] || e.currentTarget;
            elem.classList[classMethod](errorClass);
        },

        getRequiredElemsLen = function(elem) {
            var checkedLen = elem.querySelectorAll('.form-checkbox:checked').length,
                hasCheckedLen = Boolean(checkedLen),
                actionMethod = hasCheckedLen ? 'removeEventListener' : 'addEventListener';
            requiredElemsLen += checkedLen;
            setErrorClass(hasCheckedLen, elem);
            elem[actionMethod]('click', setErrorClass);
        },

        getRequiredLen = function() {
            var requiredList = [].slice.call(doc.querySelectorAll(getInitPattern(patt, 'checkbox-group')));
            if (requiredList.length === 0) {
                return false;
            }
            requiredElemsLen = 0;
            requiredList.map(getRequiredElemsLen);
            if (!Boolean(requiredElemsLen)) {
                window.scrollTo(0, 0);
            }
            return Boolean(requiredElemsLen);
        };

    this.complete = function(evt) {
        evt.preventDefault();
        return getRequiredLen();
        //return true;
    };
}).apply(uiRequired);

(function() {
    // radio sibling input / select
    var checkList,
        patt = 'data-check',
        inputMatch = 'input',
        elemMatch = 'elem',
        siblingElemsList = [],
        invalidElemsLen = 0,

        resetSiblingElem = function(elem) {
            elem.removeAttribute('required');
            elem.classList.remove(elem.errorClass);
        },

        toggleRequiredElems = function(evt) {
            var elem = evt.target,
                siblingElem = elem.siblingInput;
            siblingElemsList.map(resetSiblingElem);
            siblingElem.setAttribute('required', 'true');
        },

        resetSiblingElemProps = function(elem) {
            var fieldRequired = this;
            elem.addEventListener('change', function() {
                fieldRequired.removeAttribute('required');
            });
        },

        getSiblingField = function(elem) {
            var siblingInput = elem.parentNode.querySelector(getPattern(patt, elemMatch));
            siblingInput.errorClass = siblingInput.type === "text" ? "form-input--error" : "form-select--error";
            elem.siblingInput = siblingInput;
            siblingElemsList.push(siblingInput);
            [].slice.call(doc.querySelectorAll('[name="' + elem.name + '"]:not([data-check="input"])')).map(resetSiblingElemProps.bind(siblingInput));
            siblingInput.addEventListener('input', function() {
                siblingInput.classList.remove(siblingInput.errorClass);               
            }, false);
            elem.addEventListener('change', toggleRequiredElems, false);
        },

        getSiblingFieldValid = function(elem) {
            var invalidLen,
                siblingInput = elem.siblingInput,
                val = siblingInput.value,
                //invalidLen = siblingInput.type === "text" ? !Boolean(validateUrl(val)) : !Boolean(parseInt(siblingInput.value)),
                invalidLen = siblingInput.type === "text" ? false: !Boolean(parseInt(siblingInput.value)),
                errorClass = siblingInput.errorClass,
                classMethod = invalidLen ? 'add' : 'remove';
            siblingInput.classList[classMethod](errorClass);
            invalidElemsLen += Number(invalidLen);
        },

        checkListCheckedElems = function(evt) {
            var checkListChecked = [].slice.call(doc.querySelectorAll(getPattern(patt, inputMatch) + ':checked')),
                len = checkListChecked.length;
            evt.preventDefault();
            if (len === 0) {
                uiFormSteps.checkFinalStep(true);
                return false;
            }
            invalidElemsLen = 0;
            checkListChecked.map(getSiblingFieldValid);
            uiFormSteps.checkFinalStep(invalidElemsLen === 0);
            return invalidElemsLen === 0;
        },

        getCheckList = function() {
            checkList = [].slice.call(doc.querySelectorAll(getPattern(patt, inputMatch)));
            checkList.map(getSiblingField);
        };

    this.complete = function(evt) {
        return checkListCheckedElems(evt);
    };

    this.init = function() {
        getCheckList();
    };

}).apply(uiCheckInput);

(function() {
    // required checkboxes group indexed children parent 
    var patt = 'data-jsrelated',
        checkOption = function(evt) {
            var elem = evt.target,
                cont = elem.cont;
            if (cont.querySelectorAll('.form-checkbox:checked').length > 0) {
                cont.checkbox.checked = true;
            }
        },

        setCheckboxProps = function(input) {
            input.cont = this;
            input.addEventListener('change', checkOption);
        },

        getCont = function(cont) {
            cont.checkbox = cont.querySelector(getPattern(patt, 'checkbox'));
            cont.checkList = [].slice.call(cont.querySelectorAll('.form-checkbox'));
            cont.checkList.map(setCheckboxProps.bind(cont));
        },

        hasRelatedElems = function() {
            var relatedList = doc.querySelectorAll(getInitPattern(patt, 'container'));
            if (relatedList.length > 0) {
                [].slice.call(relatedList).map(getCont);
            }
        };

    this.init = function() {
        hasRelatedElems();
    };

}).apply(uiRelated);

window.addEventListener('load', uiCheckInput.init, false);
window.addEventListener('load', uiFormSteps.init, false);
window.addEventListener('load', uiRelated.init, false);

function fillErrorPopup(errs) {
    var a,
        popuptitle,
        popupcont,
        popupContStr = '',
        errorsList = errs || { "error1": "el error 1", "error2": " el error 2" },
        popupDiv = document.createElement('div');
    popupDiv.innerHTML = popupErrorAccountString;
    popupcont = popupDiv.querySelector('[data-jspopupcont]');
    popupcont.classList.add('u-pdt--half');
    popuptitle = popupDiv.querySelector('[data-jspopuptitle]');
    popuptitle.style.display = "none";
    for (a in errorsList) {
        popupContStr += '<p class="font-size1 u-block u-mgb--half">' + errorsList[a] + '</p>';
    }
    popupcont.innerHTML = popupContStr;
    eventLoaded = loading.setLoadedEvent(eventLoading);
    doc.dispatchEvent(eventLoaded);
    popup.setPopup(popupDiv);
}

function checkServerForm(form) {
    var result,
        url = form.getAttribute("action"),
        formData = $(form).serializeArray();
    $.post(url, formData).done(function(data) {
        result = JSON.parse(data);
        if (result.error === true) {
            fillErrorPopup(result.errors);
        } else {
            //
            window.location = baseUri + 'account/account_success';
        }
    }).fail(function() {
        fillErrorPopup(serverErrorMsg);
    });
}