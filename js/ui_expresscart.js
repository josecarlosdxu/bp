var expressCart = {};
(function() {
    "use strict";
    var cartBtn,
        cartBtnList,
        cartPagePattern,
        cartPanel,
        body,
        location,
        cartObj,
        _isShowed = false,
        patternMatch = 'data-js-expresscart',
        patternCart = 'expresscart',
        patternBtn = 'toolbar-expresscart-btn',
        showPanelClassname = 'expresscart--show',
        showBtnClassname = 'toolbar-item--active',
        toggleClasses = function(toggle, obj) {
            var e, elm, cls,change = toggle || false,
                //method = change ? 'add' : 'remove'; /// ie9 not working
                 method = change ? 'addClass' : 'removeClass';
            for (e in obj) {
                elm = obj[e][0];  
                cls =  obj[e][1];           
                window[method](elm,cls);                
                //obj[e][0].classList[method](obj[e][1]);/// ie9 not working
            }
        },
        bodyBlur = function(blur) {
            var classToAdd = blur ? 'blur' : 'focus',
                classToRemove = blur ? 'focus' : 'blur';

                removeClass(body,classToRemove);

                addClass(body,classToAdd);

              

           // body.classList.remove(classToRemove);/// ie9 not working
           // body.classList.add(classToAdd);/// ie9 not working
        },
        closePanel = function() {
            toggleClasses(false, cartObj);
            location = window.location + '';
            bodyBlur(false);
            setBtnCartListeners();
            _isShowed = false;
        },
        checkIsOver = function(e) {
            var target = e.target;
            if (target === cartBtn || !getParents(target, '.expresscart')) {
                removeEventHandler(body, 'click', checkIsOver);
                closePanel();
            }
        },
        showPanel = function(e) {
            preventEvent(e);
            cartBtn = e.currentTarget;
            cartObj.elem2 = [cartBtn, showBtnClassname];
            removeEventHandler(cartBtn, 'click', showPanel);
            addEventHandler(body, 'click', checkIsOver);
            toggleClasses(true, cartObj);
            _isShowed = true;
            if (toolbarLanguages.isShowed()) {
                toolbarLanguages.togglePanel(e);
            }
            bodyBlur(true);

        },
        setBtnCartListeners = function(elem) {
            //[].slice.call(cartBtnList).map(function(elem) { elem.addEventListener('click', showPanel) });

            [].slice.call(cartBtnList).map(function(elem) {
                //alert(elem);

                addEventHandler(elem, 'click', showPanel)

            });


        },
        setCartObj = function() {
            cartObj = { "elem1": [cartPanel, showPanelClassname], "elem2": null };
        },

        isShowed = function() {
            return _isShowed;
        },

        getElems = function() {
            cartPanel = document.querySelector('[' + patternMatch + '="' + patternCart + '"]');
            cartBtnList = document.querySelectorAll('[' + patternMatch + '="' + patternBtn + '"]');
            if (cartBtnList.lenght === 0) {
                return false;
            }
            body = document.body;
            setCartObj();
            setBtnCartListeners();
        };
    this.init = function(cartPage) {
        cartPagePattern = cartPage || 'shoppingcart';
        getElems();
    };
    this.closePanel = closePanel;
    this.isShowed = isShowed;

}).apply(expressCart);
window.addEventListener('load', expressCart.init, true);