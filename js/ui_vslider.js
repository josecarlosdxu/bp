var uiVSlider = {},

    delay = 2500,
    patt = 'data-vslider',
    doc = document.documentElement,
    getInitPattern = function(patt, match) {
        return '[' + patt + '*="' + match + '"]';
    };

(function() {
    var slidersV,

        getVSliderElems = function(elem) {
            var sliderV = new VSlider(patt);
            sliderV.init(elem);
        },

        hasVSliders = function() {
            slidersV = doc.querySelectorAll(getPattern(patt, 'nav'));
            if (slidersV.length > 0) {
                [].slice.call(slidersV).map(getVSliderElems);
            }
        };

    this.init = function() {
        hasVSliders();
    };

}).apply(uiVSlider);

window.addEventListener('load', uiVSlider.init, false);

function VSlider(pt) {
    
    var nav,
        cont,
        btnList,
        contElemsList,
        stepsLen,
        timeout,
        stateAttr = 'data-state',
        stateSelVal = 'selected',
        sliderObj = {
            "index" :0
        },

        advanceStep = function(){
            var index = sliderObj.index;           
            sliderObj.index = index ===  stepsLen - 1 ? 0 : index+=1;
        },

        changeStep = function(evt) {
            var btn = evt.target;
            evt.preventDefault();
            sliderObj.index = btn.index;            
        },

        updateStep = function(idProp, oldVal, newVal) { 
            clearTimeout(timeout);  
            btnList[oldVal].removeAttribute(stateAttr);
            btnList[newVal].setAttribute(stateAttr,stateSelVal);
            contElemsList[oldVal].removeAttribute(stateAttr);
            contElemsList[newVal].setAttribute(stateAttr,stateSelVal);
            timeout = setTimeout(advanceStep,delay);
            return newVal;
        },

        setBtnProps = function(btn) {
            var i = arguments[1];
            btn.index = i;          
            btn.addEventListener('click', changeStep, false);          
        },

        setSliderValues = function() {
            btnList = [].slice.call(nav.querySelectorAll(getPattern(patt, 'link')));            
            contElemsList =[].slice.call(cont.querySelectorAll(getPattern(patt, 'elem')));
            stepsLen =contElemsList.length;
            btnList.map(setBtnProps);           
            timeout = setTimeout(advanceStep,delay);
            sliderObj.watch('index', updateStep);

        },

        init = function(DMElem) {           
            var parent = DMElem.parentNode.parentNode;
            cont = parent.querySelector(getPattern(patt, 'cont')) || false;            
            if(cont){              
                nav = DMElem;
                setSliderValues();
            }
        };

    this.init = init;


};