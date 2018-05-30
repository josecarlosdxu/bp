var bblegal = {};

(function() {
    var patt = 'data-jsbblegal',
        toggleObj = [{ "method": "removeAttribute", "params": ["active"] }, { "method": "setAttribute", "params": ["active", "true"] }],
        body,
        opendialog,
        dialog,
        label,
        button,
        accept,
        textfield,           
        maxScrollY,

        getElem = function(match,list) {
        	var method = Boolean(list)?'querySelectorAll':'querySelector'; 
            return document[method]('[' + patt + '="' + match + '"]');
        },

        toggleState = function(elem, condition) {
            var funcObj = toggleObj[Number(condition)],
                method = funcObj.method,
                params = funcObj.params;
            elem[method].apply(elem, params);
        },

        triggerOpenEvt = function(){
        	closeDialog();
        	if(opendialog){
        		opendialog.removeEventListener('click', activate);
        		opendialog.click();
        		opendialog.addEventListener('click', activate);
        	} 
        },

        textReaded = function(evt) {
            var condition = accept.checked;
            toggleState(button, condition);
        },

        resetAccept = function() {
            accept.checked = false;
            toggleState(button, false);
        },

        onScroll = function(evt) {
            var condition = textfield.scrollTop === maxScrollY;
            if (condition) {
                textfield.removeEventListener('scroll', onScroll);
                label.focus();
            }
            toggleState(label, condition);
        },

        resetElems = function() {
            resetAccept();
            textfield.scrollTop = 0;
            textfield.addEventListener('scroll', onScroll);
            toggleState(label, false);
        },

        closeDialog= function(evt){
        	if(evt){
        		evt.preventDefault(); 
        	}        	
        	toggleState(dialog, false);       	
        	resetElems();       	
        },

        setCloseElemProps= function(el){
        	el.addEventListener('click', closeDialog);
        },

        setListeners = function() {
            accept.addEventListener('click', textReaded);
            opendialog.addEventListener('click', activate);
            button.addEventListener('click', triggerOpenEvt);
            resetElems();
        },

        setProps = function() {
        	document.body.appendChild(dialog);
            maxScrollY = Math.round(textfield.scrollHeight - textfield.getBoundingClientRect().height);            
            setListeners();
        },

        getElems = function() {
            accept = getElem('accept');
            button = getElem('button');
            label = getElem('label');
            dialog = getElem('dialog');
            opendialog = getElem('opendialog');
            [].slice.call(getElem('close',true)).map(setCloseElemProps);
            setProps();
        },

        activate = function(evt) {
        	var condition; 
            if (!textfield) {
                return false;
           } 
           evt.preventDefault();
           resetElems();           
           condition =  !Boolean(dialog.getAttribute('active')); 
           if(condition){
           	 textfield.focus();
           }
           toggleState(dialog, condition); 
        },

        init = function() {
            textfield = getElem('text');
            if (textfield) {
            	getElems();
            }
        };

    this.init = init;
    this.activate = activate;

}).apply(bblegal);
window.addEventListener("load", bblegal.init, false);