var selectCurrency = {};
    

//https://codepen.io/surjithctly/pen/pLDwe

(function() {
    "use strict";
    var scope,
        labelElem,
        checkList,
        defText ="",
        labelTexts =[],
        maxSelectNum = 3,
        numSelected = 0,
        selectedLabelClass ='selected',
        patt = 'data-jscurrency',

        setLabelElem = function(){
            labelElem.innerHTML = defText+' '+labelTexts.join(', ');
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
            checked =el.checked,
            sum = Number(checked) * 2 - 1,
            method = checked?'add':'remove';

            el.label.classList[method](selectedLabelClass);

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
            [].slice.call(scope.querySelectorAll('input[data-jscurrency="item"]:checked')).map(writeSelected);

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

        lockedElem = function(el) {
            //el.click();           
            el.removeEventListener('change', checkSelected);
            el.setAttribute('checked','checked');

            el.label.classList.add('locked');

        },

        setValues = function() {
            labelElem = scope.querySelector(getPattern(patt, 'text'));
            defText = labelElem.innerHTML;
            checkList = [].slice.call(scope.querySelectorAll(getPattern(patt, 'item')));
            checkList.map(setItemListeners);
            lockedElem(checkList[0]);
            
        },
        init = function() {
            scope = document.querySelector(getPattern(patt, 'multiple'));
            if (scope) {                
                setValues();
            }

        };
    this.init = init;

}).apply(selectCurrency);

window.addEventListener("load", selectCurrency.init, false);
