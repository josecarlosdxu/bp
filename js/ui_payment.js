/////  payment Methods
var uiPayment = {};

(function() {

    var stepContainer,
        packElem,
        shopElem,
        b2bElem,
        resumeElem,
        notb2bElem,
        isB2B,
        stepBtn,
        paymentSelected = false,
        withShops = false,
        displays = ['none', 'inline-block'],
        patt = 'data-jscart',
        setResumeSpan = function() {

            var finder = notb2bElem,
                match = withShops || isB2B ? 'resumeval' : 'resumedef';
                paymentSelected = false; 
            if (withShops) {
                paymentSelected = stepContainer.querySelector('input[type="radio"]:checked');
            }

            if (isB2B) {
                paymentSelected = b2bElem.querySelector('input[type="radio"]:checked');
            }

            if (paymentSelected) {
                finder = paymentSelected.parentNode;
                shoppingCart.paymentShop = paymentSelected.value;
            } 
            resumeElem.innerHTML = finder.querySelector(getPattern(attrs.payment, match)).innerHTML;
            sCart.showMessages();
        },

        updateShopPayment = function(val) {
            var display;
            withShops = Boolean(val);
            display = displays[Number(withShops)];
            shopElem.style.display = display;
            resumeElem.innerHTML = "";
        },

        updatePackPayment = function(selPack, update) {        
            isB2B = selPack === "b2b";
            b2bElem.style.display = displays[Number(isB2B)];
            notb2bElem.style.display = displays[Number(!isB2B)];
            resumeElem.innerHTML = "";
            packElem.style.display = displays[Number(update)];
        },

        registerElems = function() {
            stepContainer = document.querySelector(getPattern(patt, 'step-3'));
            packElem = stepContainer.querySelector(getPattern(attrs.payment, 'pack'));
            shopElem = stepContainer.querySelector(getPattern(attrs.payment, 'shop'));
            b2bElem = stepContainer.querySelector(getPattern(attrs.payment, 'b2b'));
            resumeElem = stepContainer.querySelector(getPattern(attrs.payment, 'resume'));
            notb2bElem = stepContainer.querySelector(getPattern(attrs.payment, 'notb2b'));
            stepBtn = stepContainer.querySelector(getPattern(patt, 'btn-3'));
            stepBtn.addEventListener('click', setResumeSpan, false);
            shopElem.style.display = displays[0];
            resumeElem.innerHTML = "";
        };

    this.registerElems = registerElems;
    this.updatePackPayment = updatePackPayment;
    this.updateShopPayment = updateShopPayment;

}).apply(uiPayment);