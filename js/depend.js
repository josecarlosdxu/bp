// data-depid ="id"

// data-deptype ="show"
// data-deptype ="hide"
// data-deptype ="toggle"


var dependant = {},

    formDependant = {},

    dinamicDependant = {};

(function() {
    var elemsList,
        patt = 'data-dep',
        pattDepend = 'data-depend',
        pattType = 'data-deptype',

        changeDependants = function(elem) {
            elem.style.display = this;
        },

        setInputRadioProps = function(el) {
            var pattElems = getPattern(pattDepend, el.getAttribute(patt)), /// from tools
                action = el.getAttribute(pattType) === "show" ? "inherit" : "none",
                dependElems = [].slice.call(document.querySelectorAll(pattElems));
            el.addEventListener('change', function(e) {
                e.preventDefault();
                dependElems.map(changeDependants.bind(action));
            });


        },


        setOptionActions = function(el, index) {

            var action = Number(this) === Number(index) ? "inherit" : "none";
            if (el.dependElems) {
                el.dependElems.map(changeDependants.bind(action));
            }
        },


        setOptionProps = function(el) {
            var DOMselect = el.parentNode,
                optionsList = [].slice.call(DOMselect.options),
                pattElems = getPattern(pattDepend, el.getAttribute(patt));
            el.dependElems = [].slice.call(document.querySelectorAll(pattElems));


            if (DOMselect.hasListeners) {
                return false;
            }
            DOMselect.hasListeners = true;

            DOMselect.addEventListener('change', function(e) {
                e.preventDefault();
                optionsList.map(setOptionActions.bind(DOMselect.selectedIndex));
            });
            //DOMselect.selectedIndex = 0;
        },

        init = function() {
            [].slice.call(document.querySelectorAll('input[type="radio"][' + patt + ']')).map(setInputRadioProps);
            [].slice.call(document.querySelectorAll('option[' + patt + ']')).map(setOptionProps);
        };

    this.init = init;

}).apply(dependant);


(function() {
    var formBtn,        
        checkList = [],
        attrName = 'data-depid',
        getSelectedElems = function(){
            var selectedList = checkList.filter(function(el){
            return el.checked;
           });
          return selectedList.length > 0;
        },

        toggleBtn = function(evt) {
            var  method = getSelectedElems() ? formBtn.removeAttribute('disabled') : formBtn.setAttribute('disabled', true);
           if(evt){
            evt.preventDefault();
           }            
        },

        setCheckboxProps = function(el) {
            el.addEventListener('change', toggleBtn);
        },

        init = function() {
            checkList = [].slice.call(document.querySelectorAll('[' + attrName + ']'));
            if (checkList.length > 0) {
                formBtn = document.getElementById(checkList[0].getAttribute(attrName));
                toggleBtn();
                checkList.map(setCheckboxProps);
            }
        };

    this.init = init;
}).apply(formDependant);

window.addEventListener('load', dependant.init, true);
window.addEventListener('load', formDependant.init, true);