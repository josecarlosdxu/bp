//managing shoppingcart pack & shops steps

// step states: active, locked, completed

//stepsBTNS   ---- locked stepsBTNS.btn1, locked stepsBTNS.btn2 .... 

//stepsEdit Btns

/////////////stepsBtns.activeBtn = 1;///////////////////////////
/////////////stepsBtns.lockedBtn = 1;//////////////////////////
/////////////steps.stepActive = 2;////////////////////////////


var cartSteps = {},

    stepsBtns = {
        "activeBtn": 0,
        "lockedBtn": 1
    },

    steps = {
        "stepActive": 1
    };

(function() {

    var md,
        stepList,
        stepsBtnsList,
        stepsCompleted,
        finalBtnsList,
        topDiff = 20,
        patt = 'data-jscart',
        stepActiveClass = 'shoppingCartStep--active',
        stepEditableClass = 'shoppingCartStep--editable',

        defineStepState = function(elem, index) {
            var number = index + 1,
                name = 'step' + number,
                step = {};
            step.state = steps.stepActive === number ? 'active' : 'locked';
            step.num = number;
            step.DOMElem = elem;
            steps[name] = step;
        },

        showStepElems = function(elem) {
            elem.style.display = "inherit";
        },

        updateStates = function(newVal) {
            var count = 1,
                match = 'show-' + newVal,
                domElemTop = steps['step' + newVal].DOMElem.offsetTop;
                md = new MobileDetect(window.navigator.userAgent);
              
            while (count < newVal) {
                changeStepState(count, 'completed');
                count++;
            }
            changeStepState(newVal, 'active');
            if (newVal < 4 && !md.mobile()) {
                //window.scrollTo(0, domElemTop + topDiff);
                 //window.scrollTo(0, 0);
            }
            [].slice.call(document.querySelectorAll(getPattern(attrs.step, match))).map(showStepElems);
        },

        updateSteps = function(idProp, oldVal, newVal) {           
            if (idProp === 'stepActive') {
                updateStates(newVal);
            }
            return newVal;
        },

        editAction = function(evt) {
            var e,
                stepElem,
                lastElemState,
                len = Object.keys(steps).length - 1,
                lastElem = steps['step' + len];
            if (evt.target.editBtn) {
                for (e in steps) {
                    stepElem = steps[e];
                    if (stepElem !== this && e !== 'stepActive') {
                        changeStepState(stepElem.num, 'locked');
                    }
                }
                sCart.hideMessages();
                steps.stepActive = this;
                return false;

            }
            for (e in steps) {
                stepElem = steps[e];
                if (e !== 'stepActive' && stepElem.state !== 'locked') {
                    changeStepState(stepElem.num, 'completed');
                }
            }
            steps.stepActive = this;
            lastElemState = lastElem.state === 'completed' ? 'locked' : 'locked';
            lastElem.state = lastElemState;
            sCart.hideMessages();
        },

        editElemProps = function(elem) {
            elem.step = elem.getAttribute(attrs.edit).replace('step-', '');
            elem.editBtn = true;
            elem.addEventListener('click', editAction.bind(elem.step));
        },

        changeStepState = function(stepnum, state) {
            var name = "step" + stepnum,
                elem = steps[name],
                domElem = elem.DOMElem,
                classToAdd = state === 'active' ? stepActiveClass : state === 'completed' ? stepEditableClass : '';
            elem.state = state;
            domElem.classList.remove(stepEditableClass);
            domElem.classList.remove(stepActiveClass);
            if (classToAdd !== '') {
                domElem.classList.add(classToAdd);
            }

        },

        activateStepBtn = function(idProp, oldVal, newVal) {           
            var btn = stepsBtnsList[newVal - 1],
                hasDisabled = idProp !== 'activeBtn';
            stepsBtnsList[newVal - 1].disabled = hasDisabled;
            return newVal;
        },

        registerStepsBtns = function(elem, index) {
            elem.step = Number(elem.getAttribute(patt).replace('btn-', '')) + 1;
            elem.editBtn = false;
            elem.addEventListener('click', editAction.bind(elem.step));
            if (index === 0) {
                elem.disabled = true;
                elem.addEventListener('click', sCart.checkShopPack);
                elem.addEventListener('click', sCart.checkUpdateCart);
            }
        };

    this.registerSteps = function() {
        stepList = [].slice.call(document.querySelectorAll('[' + patt + '*="step-"]'));
        stepList.map(defineStepState);
        stepsBtnsList = [].slice.call(document.querySelectorAll('[' + patt + '*=btn]'));
        stepsBtnsList.map(registerStepsBtns);
        //finalBtnsList = [].slice.call(document.querySelectorAll(getPattern(patt,'finalbtn')));
        //console.log(getPattern(patt,'finalbtn'));
        //console.log(document.querySelectorAll('[data-jscart="finalbtn"]'));
        [].slice.call(document.querySelectorAll(getPattern(attrs.edit))).map(editElemProps);
        steps.watch('stepActive', updateSteps);
        for (var e in stepsBtns) {
            stepsBtns.watch(e, activateStepBtn);
        }
    };

}).apply(cartSteps);