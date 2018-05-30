var selectLang = {},

    selectMultiLang = {};




(function() {
    "use strict";
    var pattern = 'data-js-lang',
        closeLangList = function() {
            checklang.checked = false;
        },

        changeSelection = function(evt) {
            var optionElem = evt.target,
                optionElemLangList = optionElem.langlist,
                optionSelectedElem = optionElemLangList.selectedElem;
            optionSelectedElem.innerHTML = optionElem.htmlContent;
            optionElemLangList.langField.value = optionElem.textValue;

        },

        getLangField = function(langlist) {
            var langField = langlist.querySelector('[' + pattern + '="langField"');
            return langField;
        },
        getSelectedElem = function(langlist) {
            var selectedElem = langlist.querySelector('[' + pattern + '="selected"');
            return selectedElem;
        },


        getLanglistElems = function(langlist) {
            var itemsListElem,
                itemsList = langlist.querySelectorAll('[' + pattern + '="item"'),
                counter = 0,
                len = itemsList.length;
            langlist.selectedElem = getSelectedElem(langlist);
            langlist.langField = getLangField(langlist);

            while (counter < len) {
                itemsListElem = itemsList[counter];
                itemsListElem.langlist = langlist;
                itemsListElem.htmlContent = itemsListElem.innerHTML;
                itemsListElem.textValue = itemsListElem.textContent;
                addEventHandler(itemsListElem, 'click', changeSelection);
                counter++;
            }
            counter = itemsList = itemsListElem = null;
        },







        getLanglist = function(selectLists) {
            var selectListstElem,
                counter = 0,
                len = selectLists.length;
            while (counter < len) {
                selectListstElem = selectLists[counter];
                getLanglistElems(selectListstElem);
                counter++;
            }
            counter = selectListstElem = null;
        },

        getSelectLists = function() {
            var selectLists = document.querySelectorAll('[' + pattern + '="list"') || false;
            if (selectLists) {
                getLanglist(selectLists);
            }

        },
        init = function() {
            getSelectLists();
        };
    this.init = init;


}).apply(selectLang);

window.addEventListener("load", selectLang.init, false);

//https://codepen.io/surjithctly/pen/pLDwe

(function() {
    "use strict";
    var scope,
        labelElem,
        checkList,
        defText ="",
        labelTexts =[],
        maxSelectNum = 6,
        numSelected = 0,
        patt = 'data-jslang',

        setLabelElem = function(){
            labelElem.innerHTML =labelTexts.join(', ');
        },

        writeSelected = function(el,index){
            labelTexts[index] = el.value;
            setLabelElem();
        },

        disableElems = function(el) {
            if (el.checked === false) {
                el.disabled = true;
                el.label.classList.add('disabled');
            }
        },

        removeFromValues = function(str){
            var arrValuesStr = labelTexts.join(","),
            strToRemove = arrValuesStr.indexOf(str)>0 ?','+str: str+',';
            labelTexts =  arrValuesStr.replace(strToRemove,'').split();
            setLabelElem(); 
        },

        enableElems = function(el) {
            el.disabled = false;
            el.label.classList.remove('disabled');
        },

        checkSelected = function(e) {
            var el = e.currentTarget,
            sum = Number(el.checked) * 2 - 1; 

            if(sum < 0){
                removeFromValues(el.value); 
            }

            if (numSelected === maxSelectNum && sum < 0) {
                checkList.map(enableElems);
            }
            numSelected += sum; 

            if (numSelected === maxSelectNum) {
                checkList.map(disableElems);
            }
             if(numSelected === 0){
                labelElem.innerHTML = defText;
                labelElem.classList.remove('enabled');
                return false;
            }

            labelElem.classList.add('enabled');
            [].slice.call(scope.querySelectorAll('input.form-checkbox:checked')).map(writeSelected);

        },

        setItemListeners = function(el) {             
            el.selected = el.checked; 
            el.checked = false;
            el.label = el.parentNode;
            el.addEventListener('change', checkSelected);
            if(el.selected){
                el.click();
                el.removeAttribute('checked');
            }


        },

        setValues = function() {
            labelElem = scope.querySelector(getPattern(patt, 'text'));
            defText = labelElem.innerHTML;
            checkList = [].slice.call(scope.querySelectorAll(getPattern(patt, 'item')));
            checkList.map(setItemListeners);

        },
        init = function() {
            scope = document.querySelector(getPattern(patt, 'multiple'));
            if (scope) {
                setValues();
            }

        };
    this.init = init;

}).apply(selectMultiLang);

window.addEventListener("load", selectMultiLang.init, false);
