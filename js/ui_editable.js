var editable = {};

(function() {
    var patt = 'data-edit',
        elemsPatt,
        changeBtnPatt,
        resetBtnPatt,
        inputPatt,
        getPatt = function(match) {
            return '[' + patt + '="' + match + '"]';
        },
        setElemProps = function(elem) {
            var input = elem.querySelector(inputPatt),
            changeBtn= elem.querySelector(changeBtnPatt),
            resetBtn = elem.querySelector(resetBtnPatt);
            resetBtn.input = input; 
            changeBtn.input = input;
            changeBtn.cont = elem;  
            resetBtn.defVal = input.value;  
        },

        changeField = function(evt) {           
            var btn = evt.currentTarget;
            btn.blur(); 
            btn.parentNode.blur(); 
            btn.input.blur();           
            btn.cont.blur();
            document.body.blur();           
        },

        resetField = function(evt) {
            var btn = evt.currentTarget;
            btn.input.value = btn.defVal; 
            changeField(evt);

        },

        setBtnProps = function(btn) {
            var func = btn.getAttribute(patt) === 'change' ? changeField : resetField;          
            btn.addEventListener('click', func);
        },

        setVars = function() {
            inputPatt = getPatt('input');
            elemsPatt = getPatt('elem');
            changeBtnPatt = getPatt('change');
            resetBtnPatt = getPatt('reset');
        },
        init = function() {
            setVars();
            [].slice.call(document.querySelectorAll(elemsPatt)).map(setElemProps);           
            [].slice.call(document.querySelectorAll(changeBtnPatt)).map(setBtnProps);
            [].slice.call(document.querySelectorAll(resetBtnPatt)).map(setBtnProps);
        };
    this.init = init;

}).apply(editable);

window.addEventListener('load', editable.init, false);