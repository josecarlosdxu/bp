 var serverErrorMsg = { "error1": "No se ha podido conectar con el servidor.", "error2": "Por favor, inténtelo de nuevo más tarde" },
     uiAccount = {},
     manageTabs = {},
     uiCountries = {},

     uiAccountObj = {
         'countryVal': null,
         'countryCode': null,
         'prefix': '0',
         'postcode': null,
         'adress': null,
         'city': null,
         'state': null,
         'company': null,
         'phone': null,
         'phonemobile': null,
         'zipcode': null
     },

     uiTabsObj = {
         'panelSelected': null,
         'mailField': null,
         'confirmMailField': null,
         'vat': null
     },
     eventLoading,
     eventLoaded,
     doc = document.documentElement,
     regionList = [{ "postcode": "02", "name": "ALBACETE" }, { "postcode": "03", "name": "ALICANTE / ALACANT" }, { "postcode": "04", "name": "ALMERÍA" }, { "postcode": "01", "name": "ARABA / ÁLAVA" }, { "postcode": "33", "name": "ASTURIAS" }, { "postcode": "05", "name": "ÁVILA" }, { "postcode": "06", "name": "BADAJOZ" }, { "postcode": "07", "name": "BALEARS, ILLES" }, { "postcode": "08", "name": "BARCELONA" }, { "postcode": "48", "name": "BIZKAIA" }, { "postcode": "09", "name": "BURGOS" }, { "postcode": "10", "name": "CÁCERES" }, { "postcode": "11", "name": "CÁDIZ" }, { "postcode": "39", "name": "CANTABRIA" }, { "postcode": "12", "name": "CASTELLÓN / CASTELLÓ" }, { "postcode": "51", "name": "CEUTA" }, { "postcode": "13", "name": "CIUDAD REAL" }, { "postcode": "14", "name": "CÓRDOBA" }, { "postcode": "15", "name": "CORUÑA, A" }, { "postcode": "16", "name": "CUENCA" }, { "postcode": "20", "name": "GIPUZKOA" }, { "postcode": "17", "name": "GIRONA" }, { "postcode": "18", "name": "GRANADA" }, { "postcode": "19", "name": "GUADALAJARA" }, { "postcode": "21", "name": "HUELVA" }, { "postcode": "22", "name": "HUESCA" }, { "postcode": "23", "name": "JAÉN" }, { "postcode": "26", "name": "LA RIOJA" }, { "postcode": "24", "name": "LEÓN" }, { "postcode": "25", "name": "LLEIDA" }, { "postcode": "27", "name": "LUGO" }, { "postcode": "28", "name": "MADRID" }, { "postcode": "29", "name": "MÁLAGA" }, { "postcode": "52", "name": "MELILLA" }, { "postcode": "30", "name": "MURCIA" }, { "postcode": "31", "name": "NAVARRA" }, { "postcode": "32", "name": "OURENSE" }, { "postcode": "34", "name": "PALENCIA" }, { "postcode": "35", "name": "PALMAS, LAS" }, { "postcode": "36", "name": "PONTEVEDRA" }, { "postcode": "37", "name": "SALAMANCA" }, { "postcode": "38", "name": "SANTA CRUZ DE TENERIFE" }, { "postcode": "40", "name": "SEGOVIA" }, { "postcode": "41", "name": "SEVILLA" }, { "postcode": "42", "name": "SORIA" }, { "postcode": "43", "name": "TARRAGONA" }, { "postcode": "44", "name": "TERUEL" }, { "postcode": "45", "name": "TOLEDO" }, { "postcode": "46", "name": "VALENCIA / VALÉNCIA" }, { "postcode": "47", "name": "VALLADOLID" }, { "postcode": "49", "name": "ZAMORA" }, { "postcode": "50", "name": "ZARAGOZA" }];

 (function() {
     // manageTabs 
     var tabSelected,
         panelSelected,
         pattern = 'data-js-tab',
         selClass = 'tabs-item--selected',
         dataHrefPatt = 'data-href',
         tooltipPatt = 'data-js-tooltip',
         getNodeList = function(ptMatch) {
             return doc.querySelectorAll(getPattern(pattern, ptMatch));
         },

         lockTabItems = function(elem) {
             var nextSibling = elem.nextElementSibling || false;
             elem.disabled = Boolean(Number(this));
             elem.blur();
             elem.classList.remove('form-input--err');
             elem.classList.remove('form-select--error');
             if (nextSibling && nextSibling.classList.contains('form-inputMsg')) {
                 nextSibling.classList.add('u-hide');
             }

         },

         selectTab = function(elem) {
             var elemToSel = tabSelected !== elem,
                 displayType = elemToSel ? 'block' : 'none',
                 classMethod = elemToSel ? 'add' : 'remove';
             elem.classList[classMethod](selClass);
             elem.radio.checked = elemToSel;
             elem.panel.style.display = displayType;
             elem.selected = !elemToSel;
             tabSelected = elemToSel ? elem : null;
             [].slice.call(doc.querySelectorAll(':invalid')).map(function(ele) { ele.classList.remove('form-input--error'); });
             [].slice.call(doc.querySelectorAll('.form-select--error')).map(function(ele) { ele.classList.remove('form-select--error'); });



             if (tabSelected) {
                 uiTabsObj.vat = uiTabsObj.panelSelected.querySelector('[data-js-vat_number]');
             }

         },

         disabledAllElems = function(panel, val) {
             [].slice.call(panel.querySelectorAll('input')).map(lockTabItems.bind(val));
             [].slice.call(panel.querySelectorAll('select')).map(lockTabItems.bind(val));
         },

         clickTab = function(evt) {
             var tab = evt.currentTarget,
                 target = evt.target;
             if (target !== tab.tooltipBtn && tabSelected !== tab) {
                 selectTab(tabSelected);
                 disabledAllElems(uiTabsObj.panelSelected, 1);
                 uiTabsObj.panelSelected = tab.panel;
                 disabledAllElems(uiTabsObj.panelSelected, 0);
                 selectTab(tab);
             }
         },

         setTabProps = function(elem) {
             var panelId = elem.getAttribute(dataHrefPatt);
             elem.tooltipBtn = elem.querySelector(getPattern(tooltipPatt));
             elem.selected = Boolean(hasClass(elem, selClass));
             elem.radio = elem.querySelector(getPattern('type', 'radio'));
             elem.panel = doc.querySelector(getPattern('data-section', panelId));
             elem.addEventListener('click', clickTab, false);
             if (elem.selected) {
                 uiTabsObj.panelSelected = elem.panel;
                 selectTab(elem);
             } else {
                 disabledAllElems(elem.panel, 1);
             }
         },

         hasLabels = function() {
             var labelNodeList = getNodeList('label');
             if (labelNodeList.length > 0) {
                 [].slice.call(labelNodeList).map(setTabProps);
             }
         };

     this.init = function() {
         hasLabels();
     };

 }).apply(manageTabs);


 (function() {
     // uiCountries
     var selectNodeList,
         selCountryPatt = 'data-js-country',
         prefixPatt = 'data-js-country_prefix',
         isoAttr = 'data-iso-code',

         setSelectProps = function(sel) {
             var method;
             sel.addEventListener('input', function() {
                 var optionSelected = sel.options[sel.selectedIndex];
                 sel.classList.remove('form-select--error');
                 uiAccountObj.countryVal = sel.value;
                 uiAccountObj.countryCode = optionSelected.getAttribute(isoAttr);
                 uiAccountObj.prefix = optionSelected.getAttribute('data-prefix');
                 uiAccountObj.zipcode = optionSelected.getAttribute('data-zip-code');
                 [].slice.call(selectNodeList).map(function(ele) { ele.value = sel.value; });
             }, false);
             sel.addEventListener('blur', function() {
                 method = sel.value === "0" ? 'add' : 'remove';
                 sel.classList[method]('form-select--error');
             });
         },

         setElems = function() {
             [].slice.call(selectNodeList).map(setSelectProps);
         },

         hasSelects = function() {
             selectNodeList = doc.querySelectorAll(getPattern(selCountryPatt));
             if (selectNodeList.length > 0) {
                 setElems();
             }
         };

     this.init = function() {
         hasSelects();
     };

 }).apply(uiCountries);

 (function() {
     // uiAccount
     var accountForm,
         stateList,
         postCodeList,
         adressFieldList,
         cityFieldList,
         companyList,
         phoneList,
         mobileList,
         vatList,
         passPatt = 'data-jspass',
         prefixPatt = 'data-js-country_prefix',
         phonePrefixPatt = 'data-js-phone-prefix',

         getReplicatedList = function(patt) {
             return [].slice.call(accountForm.querySelectorAll(getPattern(patt)));
         },

         preventPaste = function(elem) {
             elem.setAttribute('oncopy', 'return false');
             elem.setAttribute('onpaste', 'return false');
         },

         setStateElemsValue = function(elem) {
             elem.value = String(this);
             elem.setAttribute('value', elem.value);
             elem.classList.remove('form-input--err');

         },

         validateZipCode = function(zip) {
             var patt,
                 placeholder,
                 id_country = uiAccountObj.countryCode;
             patt = zip.replaceAll(' ', '[ ]');
             patt = patt.replaceAll('-', '[-]');
             patt = patt.replaceAll('N', '[0-9]');
             patt = patt.replaceAll('L', '[a-zA-Z]');
             patt = patt.replaceAll('C', id_country);

             if (id_country === 'GB') {
                 patt = '^([A-z0-9][A-HK-Ya-hk-y0-9 ][ACDEHJKMNPRTUVXYaehmnprtvxy0-9 ]?[ABEFHMNPRSVWXYabehmnprvwxy0-9]? {0,2}[0-9][ABD-HJLN-UW-Zabd-hjln-uw-z]{2}|GIR ?0AA)$';
             }

             if (id_country === 'PT') {
                 patt = '^([0-9][0-9][0-9][0-9][ ][0-9][0-9][0-9])$';
             }
            
             postCodeList.map(function(ele) {

                 if (patt === '') {
                     ele.removeAttribute('pattern');
                     ele.placeholder = ele.placeholderDefault;

                 } else {
                     ele.setAttribute('pattern', patt);
                     placeholder = zip.replaceAll('N', '0');
                     placeholder = placeholder.replaceAll('L', 'A');
                     placeholder = placeholder.replaceAll('C', id_country);
                     ele.placeholder = placeholder;
                 }
                 ele.msg = jsText[ele.getAttribute('data-js-postcode')] + ' ' + ele.placeholder;
             });
         },

         setESRegion = function(evt) {
             var regionCode,
                 val = evt.target.value;
             if (val.length > 1) {
                 regionCode = val.substr(0, 2);
                 regionList.map(function(ele) {
                     if (ele.postcode === regionCode) {
                         stateList.map(setStateElemsValue.bind(ele.name));
                     }
                 });
             }
         },

         toggleEquivalence = function(bool) {
             var equivalenceCont = doc.querySelector(getPattern('data-jsequivalence')),
                 eqInput = equivalenceCont.querySelectorAll('input[type="radio"]')[0],
                 hideClass = 'u-hide',
                 method = bool ? 'remove' : 'add';
             eqInput.required = bool;
             equivalenceCont.classList[method](hideClass);
         },

         setZipProps = function(elem) {
             var isES = String(this) === "ES",
                 method = isES ? 'addEventListener' : 'removeEventListener';
             elem[method]('input', setESRegion);
             if (!isES) {
                 stateList.map(setStateElemsValue.bind(''));
                 elem.value = "";
             }
             toggleEquivalence(isES);
             toggleErrorMsg(elem);
         },

         updateAccount = function(idProp, oldVal, newVal) {
             var method,
                 isES,
                 listToMap = idProp === "postcode" ? postCodeList :
                 idProp === "adress" ? adressFieldList :
                 idProp === "city" ? cityFieldList :
                 idProp === "state" ? stateList :
                 idProp === "company" ? companyList :
                 idProp === "phone" ? phoneList :
                 idProp === "phonemobile" ? mobileList :
                 idProp === "vat" ? vatList :
                 false;

             if (idProp === "countryVal") {
                 stateList.map(setStateElemsValue.bind(''));
             }

             if (idProp === "countryCode") {
                 stateList.map(function(ele) {
                     isES = newVal === "ES";
                     method = isES ? 'add' : 'remove';
                     ele.classList[method]('disabled');
                     //method = isES ? 'removeAttribute' : 'setAttribute';
                     ele.removeAttribute('pattern');
                     //ele[method]('pattern', ele.patternDefault);
                     ele.setAttribute('tabindex', isES ? '-1' : '0');
                 });
                 [].slice.call(doc.querySelectorAll(getPattern(prefixPatt))).map(function(ele) { ele.value = newVal; });
                 postCodeList.map(setZipProps.bind(newVal));
             }

             if (idProp === "prefix") {
                 var pr = newVal === "0" ? '' : '+' + newVal;
                 [].slice.call(doc.querySelectorAll(getPattern(phonePrefixPatt))).map(function(ele) { ele.value = pr; });
             }

             if (idProp === "zipcode") {
                 validateZipCode(newVal);
             }


             if (listToMap) {
                 listToMap.map(function(elem) { elem.value = newVal; });
             }

             //console.log(idProp, newVal);
             return newVal;
         },

         replicateInputVal = function(elem) {
             var prop = String(this);
             elem.addEventListener('input', function() {
                 if (checkFieldComplete(elem)) {
                     uiAccountObj[prop] = elem.value;
                 }
             });
         },

         setReplicatedFieldsProps = function() {
             postCodeList = getReplicatedList('data-js-postcode');
             adressFieldList = getReplicatedList('data-jsaddress');
             cityFieldList = getReplicatedList('data-jscity');
             companyList = getReplicatedList('data-jscompany');
             phoneList = getReplicatedList('data-jsphone');
             mobileList = getReplicatedList('data-jsphonemobile');
             vatList = getReplicatedList('data-js-vat_number');
             stateList = [].slice.call(accountForm.querySelectorAll(getPattern('data-js-state', 'text')));
             postCodeList.map(function(elem) { elem.placeholderDefault = elem.placeholder; });
             stateList.map(function(elem) { 
                elem.patternDefault = elem.pattern; 
                elem.removeAttribute('pattern');

            });
             postCodeList.map(replicateInputVal.bind('postcode'));
             adressFieldList.map(replicateInputVal.bind('adress'));
             cityFieldList.map(replicateInputVal.bind('city'));
             stateList.map(replicateInputVal.bind('state'));
             phoneList.map(replicateInputVal.bind('phone'));
             mobileList.map(replicateInputVal.bind('phonemobile'));
             vatList.map(replicateInputVal.bind('vat'));
         },

         removeFieldErrorClass = function(obj) {
             var elem = obj.target || obj;
             toggleErrorMsg(elem);
         },

         addFieldErrorClass = function(obj) {
             var elem = obj.target || obj,
                 emptyVal = elem.value === "",
                 msg = jsText[elem.getAttribute('data-jserror')] || elem.msg || false,
                 invalid = Boolean(elem.parentNode.querySelector(':invalid')) && !emptyVal;
             if (invalid && msg) {
                 toggleErrorMsg(elem, msg);
                 return false;
             }
             if (emptyVal) {
                 
                 elem.classList.add('form-input--err');
             }
         },

         setAccountFieldProps = function(elem) {
             elem.addEventListener('focus', removeFieldErrorClass);
             elem.addEventListener('blur', addFieldErrorClass);
         },

         confirmMailProps = function() {
             var mailVal,
                 confirmVal,
                 msg,
                 confirmMailField = accountForm.querySelector(getPattern('data-js-confirm_email'));
             preventPaste(confirmMailField);
             uiTabsObj.confirmMailField = confirmMailField;
             confirmMailField.addEventListener('focus', removeFieldErrorClass);
             confirmMailField.addEventListener('blur', function() {
                 confirmVal = confirmMailField.value;
                 mailVal = uiTabsObj.mailField.value;
                 if (confirmVal === "") {
                     confirmMailField.classList.add('form-input--err');
                     return false;
                 }
                 msg = !Boolean(validateEmail(confirmVal)) ? jsText.text23 : confirmVal !== mailVal ? jsText.text79 : null;
                 toggleErrorMsg(confirmMailField, msg);
             });
         },

         mailProps = function() {
             var mailVal,
                 mailField = accountForm.querySelector(getPattern('data-js-email'));
             mailField.msg = 'text23';
             uiTabsObj.mailField = mailField;
             mailField.addEventListener('focus', removeFieldErrorClass);
             mailField.addEventListener('blur', function() {
                 mailVal = mailField.value;
                 if (mailVal === "") {
                     mailField.classList.add('form-input--err');
                     return false;
                 }
                 if (!Boolean(validateEmail(mailVal))) {
                     toggleErrorMsg(mailField, jsText.text23);
                 }
             });
         },

         checkPass = function(evt) {
             var re = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                 elem = evt.target,
                 passVal = elem.value,
                 complete = passVal !== "",
                 isConfirm = elem === passConfirm,
                 isEqual = passConfirm.value === passField.value,
                 isPassFormat = re.test(passVal),
                 msg = !isPassFormat ? jsText.text63 : isConfirm && !isEqual ? jsText.text25 : '';
             if (!complete) {
                 elem.classList.add('form-input--err');
                 return false;
             }
             toggleErrorMsg(elem, msg);
         },

         passProps = function(elem) {
             var attr = elem.getAttribute(passPatt);
             elem.title = jsText.text63;
             elem.message = jsText.text63;
             toggleErrorMsg(elem);
             if (attr === "confirm") {
                 passConfirm = elem;
             } else {
                 passField = elem;
             }
             elem.confirm = elem.getAttribute(passPatt) === "confirm";
             elem.addEventListener('blur', checkPass);
             elem.addEventListener('focus', function() { toggleErrorMsg(elem); });
         },

         getAccountFormElems = function() {
             [].slice.call(accountForm.querySelectorAll('input[type="text"][required]')).map(setAccountFieldProps);
             [].slice.call(doc.querySelectorAll(getPattern(passPatt))).map(passProps);
             setReplicatedFieldsProps();
             mailProps();
             confirmMailProps();
         },

         hasAccountForm = function() {
             accountForm = doc.querySelector(getPattern('data-js-create-account')) || false;
             if (!accountForm) {
                 return false;
             }
             getAccountFormElems();
             for (var e in uiAccountObj) {
                 uiAccountObj.watch(e, updateAccount);
             }
             manageTabs.init();
             uiCountries.init();
         };

     this.init = function() {
         hasAccountForm();
     };
     this.setESRegion = setESRegion;

 }).apply(uiAccount);

 window.addEventListener('load', uiAccount.init, false);

 String.prototype.replaceAll = function(search, replacement) {
     var target = this;
     return target.split(search).join(replacement);
 };

 function toggleErrorMsg(elem, msg) {

     var message = msg || false;


     if (!elem.spanMsg) {
         var spanMsg = document.createElement('span');
         spanMsg.classList.add('form-inputMsg', 'form-inputMsg--error', 'u-hide');
         insertAfter(elem, spanMsg);
         elem.spanMsg = spanMsg;
     }
     if (!message) {
         elem.spanMsg.classList.add('u-hide');
         elem.classList.remove('form-input--err');
         return false;
     }

     if (doc.offsetWidth < 480) {
         //elem.scrollIntoView({behavior: "smooth",  block:  "end"});
         elem.scrollIntoView(false);
         //alert(doc.scrollTop)
         window.scrollTo(0, doc.scrollTop + 50);
     };
     elem.spanMsg.innerHTML = msg;
     elem.spanMsg.classList.remove('u-hide');
     elem.classList.add('form-input--err');
     //elem.blur();
 };

 function checkFieldComplete(obj) {
     var elem = obj.target || obj;
     return Boolean(elem.value);
 };


function checkVatCustomerExists(func) {

    var result,

        baseUrl = 'http://192.168.1.243:8080/static/',
        route = baseUrl+'jsonmock.json',//route mock
        //route = baseUrl+'jsonmock_error.json',//route mock error        
        mailInput = uiTabsObj.mailField,
        mailVal = mailInput.value,
        vatField = uiTabsObj.vat,
        vatVal = vatField.value,
        sendObj = {
            "email": mailVal,
            "vat_number": vatVal
        },
        request = new XMLHttpRequest();

    request.open('GET', route, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            result = JSON.parse(request.responseText);
            func(result);
        } else {
            fillErrorPopup(serverErrorMsg);
        }
    };
    request.onerror = function() {
        fillErrorPopup(serverErrorMsg);
    };
    request.send(sendObj);
};


 function validateCaptcha(captchaField, func) {
     /*var value = captchaField.value;
     $.ajax({
         type: 'post',
         url: baseUri + 'jsonmock.txt',
         async: false,
         cache: false,
         datatype: 'json',
         data: {
             captcha: value
         },
         success: function(result) {
            
             if (result !== '') {
                 document.documentElement.dispatchEvent(eventLoaded);
                 result = JSON.parse(result);
                 if (result.error === true) {
                     toggleErrorMsg(captchaField, result.msg);
                     captchaField.blur();
                 } else {
                     func();
                 }


             }
         },
         error: function(data) {
             document.documentElement.dispatchEvent(eventLoaded);
             fillErrorPopup(serverErrorMsg);
         }
     });*/
 }