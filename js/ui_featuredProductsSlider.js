var featuredProductsSlider = {};
(function() {
    "use strict";
    var ProductList,
        ProductListItems,
        btnMinus,
        btnPlus,
        displacementWidth,
        currentPos,
        steps = 0,
        len = 0,
        factor = 0,
        currentStep = 0,
        doc = document.documentElement,
        pattern = 'data-js-anchor',
        btnAttr = 'data-js-active',

        activateBtn = function(activate) {
            var active = activate || false;
            this.setAttribute(btnAttr, active);
            if(!active){
                this.setAttribute('disabled', 'true');
                return false;
            }
            this.removeAttribute('disabled');

        },

        resetBtns = function() {
            activateBtn.apply(btnMinus);
            activateBtn.apply(btnPlus, [true]);
        },

        setBtnsProps = function() {
            addEvent(btnMinus, moveSlider);
            addEvent(btnPlus, moveSlider);
        },

        setSteps = function() {
            var itemW = Math.round(ProductListItems[0].offsetWidth),
                contW = ProductList.parentNode.offsetWidth;
            factor = Math.round(contW / itemW);
            steps = Math.ceil(len / factor);
            displacementWidth = contW;
            currentStep = 0;
        },
        moveSlider = function(e) {
            var desplace,
               styleName,
                btn = e.currentTarget;
            e.preventDefault();
            if (btn === btnPlus && currentStep < steps) {
                currentStep++;
                currentPos = displacementWidth * currentStep;
            }
            if (btn === btnMinus && currentStep > 0) {
                currentStep--;
                currentPos = currentPos - displacementWidth;
            }
            desplace = (0 - currentPos) + "px";
            activateBtn.apply(btnPlus, [currentStep < (steps - 1)]);
            activateBtn.apply(btnMinus, [currentStep > 0]);
            styleName = 'translate('+ desplace +',0px)';
            ProductList.style.webkitTransform = styleName;
            setTimeout(function() { $(window).scroll(); }, 1000);
        },
        resetSlider = function(e) {
            ProductList.removeAttribute('style');
            if (doc.offsetWidth < 768) {
                btnMinus.removeAttribute(btnAttr);
                btnPlus.removeAttribute(btnAttr);
                return false;
            }
            setSteps();
            resetBtns();
        },

        getBtns = function() {
            btnMinus = doc.querySelector(getPattern(pattern, 'featuredList-btnminus'));
            btnPlus = doc.querySelector(getPattern(pattern, 'featuredList-btnplus'));
            setBtnsProps();
            resetSlider();
        },
        getProductListItems = function() {
            ProductListItems = ProductList.querySelectorAll('.productList-item');
            len = ProductListItems.length;
            try {
                if (len === 0) throw 'SHORT';
            } catch (e) {
                if (e == 'SHORT') console.log('Corto. Referencia: ' + e);
                return false;
            }
            getBtns();
        },
        getProductList = function() {
            ProductList = doc.querySelector(getPattern(pattern, 'featuredList')) || false;
            if (!ProductList) {
                return false;
            }
            window.addEventListener('resize', resetSlider, false);
            getProductListItems();
        };

    this.init = function() {
        getProductList();
    };

}).apply(featuredProductsSlider);
window.addEventListener('load', featuredProductsSlider.init, false);
