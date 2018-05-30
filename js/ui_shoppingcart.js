var receivedParams = {
    /*"idpack": "26",
    "preselectedshops": [
        { "idtheme": 1, "idcatalog": 2 },
        { "idtheme": 2, "idcatalog": 1 }
    ]*/
};
var sCart = {},
    attrs = {
        "price": "data-jsprice",
        "priceval": "data-jspriceval",
        "shoppriceval": "data-jsshopriceval",
        "pack": "data-jspack",
        "quote": "data-jsquote",
        "shop": "data-jsshop",
        "finalshop": "data-jsfinalshop",
        "payment": "data-jspayment",
        "step": "data-jsstep",
        "edit": "data-jseditbtn",
        "login": "data-jslogin",
        "log": "data-jslog",
        "message": "data-jscartsmessage",
        "wallet": "data-jswallet"
    },

    shoppingCart = {
        "packPrice": 0,
        "loginQuote": 0,
        "packQuote": 0,
        "selectedPack": "",
        "shops": 0,
        "update": false,
        "upgrade": false,
        "haspack": false,
        "shoplist": "",
        "paymentShop": "",
        "paymentPack": ""
    };


(function() {

    var packQuotePriceElem,
        userLang,
        totals,
        msgList,
        totalElem,
        subtotalElem,
        ivaElem,
        quoteSpansList,
        enterpriseReminderPack,
        patt = 'data-jscart',

        setPackPrice = function(elem) {
            formatPrice(elem, null, null, String(this));
        },

        toggleDisplayElem = function(elem, shw) {
            var show = Boolean(shw),
                styleDisplay = show ? 'inherit' : 'none';
            elem.style.display = styleDisplay;
            //return elem.getBoundingClientRect();
        },

        setPackQuote = function(type, elem) {

            if (type === 'pack') {
                toggleDisplayElem(elem, shoppingCart.update);
            }
            if (type === 'container' && elem.hasAttribute('style')) {
                elem.removeAttribute('style');
            }
            if (type === 'packQuote') {
                elem.innerHTML = String(this);
            }
        },

        stopFFFormsEvt = function(elem) {
            elem.addEventListener('submit', function(evt) {
                evt.preventDefault();
            })
        },

        setDefaultFinalShop = function() {
            var defaultFinalShop = document.querySelector(getPattern(attrs.finalshop, 'shop'));
            finalShopList.registerShop(defaultFinalShop);
        },

        checkUpdateCart = function() {
            var hasShops = Boolean(shoppingCart.shops),
                showTotals = hasShops;

            if (!hasShops && !shoppingCart.haspack || shoppingCart.upgrade) {
                showTotals = true;
            }

            toggleDisplayElem(totals, showTotals);
            locked2Step();
        },

        locked2Step = function() {
            var lock = shoppingCart.haspack && selectedPack.name !== 'enterprise' && !shoppingCart.update || Boolean(shoppingCart.shops) && selectedPack.name !== 'enterprise';

            if (!shoppingCart.update && shoppingCart.shops === 0) {
                lock = true;
            }

            if (lock) {
                stepsBtns.lockedBtn = 2;
                // stepsBtns.lockedBtn = 3;

            } else {
                stepsBtns.activeBtn = 2;
                //stepsBtns.activeBtn = 3;
            }
        },

        hideMessages = function() {
            msgList.map(function(elem) {
                elem.style.display = 'none';
            });
        },

        getHiddenInput = function(name, value) {
            return '<input  name="' + name + '" type="hidden" value="' + value + '">';
        },

        updateForms = function(elem) {
            var shoplist = shoppingCart.shoplist;
            elem.innerHTML = "";
            len = shoplist.length,
                shoplistObj = { "shops": shoppingCart.shoplist };
            elem.innerHTML += getHiddenInput('shops[]', JSON.stringify(shoplistObj).replace(/"/g, "'"));
            elem.innerHTML += getHiddenInput('pack_id', selectedPack.idpack);
            if (len > 0) {
                elem.innerHTML += getHiddenInput('payment_pack', 'paypal');
                elem.innerHTML += getHiddenInput('payment_shop', shoppingCart.paymentShop);
            }
            if (len === 0 && selectedPack.name !== "b2b") {
                elem.innerHTML += getHiddenInput('payment_pack', 'paypal');
            }
            if (selectedPack.name === "b2b") {
                elem.innerHTML += getHiddenInput('payment_pack', shoppingCart.paymentShop);
            }
            elem.appendChild(elem.button);

        },

        registerForms = function(elem) {
            elem.button = elem.querySelector('button.button--primary');
            elem.button.disabled = false;
            elem.addEventListener('submit', function(evt) {
                //evt.preventDefault();
                elem.button.disabled = true;
            })
            elem.removeChild(elem.button);
        },

        showMessages = function() {
            var msgIndex,
                msgElem,
                msgElemTop,
                topDiff = 50,
                quoteSpan = document.querySelector(getPattern(attrs.message, 'quote')),
                md = new MobileDetect(window.navigator.userAgent);
            quoteSpan.innerHTML = selectedPack.packQuote.replace(/\b\w/g, function(l) {
                return l.toUpperCase()
            });
            hideMessages();
            quoteSpan.removeAttribute('style');

            if (shoppingCart.haspack && shoppingCart.update) {
                msgIndex = 2;
            }
            if (!shoppingCart.haspack && shoppingCart.update && shoppingCart.shops === 0) {
                msgIndex = 1;
            }
            if (!shoppingCart.haspack && shoppingCart.update && shoppingCart.shops > 0) {
                msgIndex = 0;
            }
            if (shoppingCart.haspack && shoppingCart.shops > 0 && !shoppingCart.update) {
                msgIndex = 4;
            }

            msgElem = msgList[msgIndex];
            toggleDisplayElem(msgElem, true);
            msgElemTop = msgElem.offsetTop;
            if (!md.mobile()) {
                //window.scrollTo(0, msgElemTop + topDiff); 
            }
            [].slice.call(document.querySelectorAll(getPattern(patt, 'form'))).map(updateForms);
        },

        checkShopPack = function(bool) {
            var isEnterprisePack = selectedPack.name === 'enterprise';
            if (selectedPack.name !== 'enterprise') {
                isEnterprisePack = shoppingCart.shops === 0;
            }
            locked2Step();
            toggleDisplayElem(enterpriseReminderPack, !isEnterprisePack);
            [].slice.call(enterpriseReminderPack.querySelectorAll(getPattern(patt, 'packplan'))).map(function(elem) {
                elem.checked = false;
            });
        },

        setWalletState = function(elm) {
            var totalprice = Number(this),
                elem = elm,
                hasEnabled = elem.value >= totalprice;
            toggleDisplayElem(elem, hasEnabled);
            elem.radio.disabled = !hasEnabled;
        },

        getWalletElems = function(elem) {
            elem.radio = elem.querySelector(getPattern('type', 'radio'));
            elem.label = elem.querySelector('label');
            elem.value = elem.getAttribute(attrs.wallet);
        },

        updatePrices = function() {
            var total,
                iva = 0,
                shops = shoppingCart.shops,
                subtotal = shoppingCart.haspack ? shops : Number(shoppingCart.packPrice) + Number(shoppingCart.loginQuote) + shops;

            if (shoppingCart.upgrade) {
                subtotal = Number(shoppingCart.packPrice) + Number(shoppingCart.loginQuote) + shops;
            }

            if (ivaElem) {
                iva = subtotal * 0.21;
                formatPrice(ivaElem, null, null, iva);
            }

            total = subtotal + iva;
            [].slice.call(document.querySelectorAll(getPattern(attrs.wallet))).map(setWalletState.bind(total));
            formatPrice(subtotalElem, null, null, subtotal);
            formatPrice(totalElem, null, null, total);
        },

        updateCart = function(idProp, newVal) {
           
            if (idProp === "loginQuote") {
                setPackPrice.apply(newVal, [document.querySelector(getPattern(attrs.price, 'login'))]);
                shoppingCart.loginQuote = newVal;
                updatePrices();
            }

            if (idProp === "packQuote") {
                [].slice.call(document.querySelectorAll(getPattern(attrs.quote, 'container'))).map(setPackQuote.bind(newVal, 'container'));
                [].slice.call(quoteSpansList).map(setPackQuote.bind(newVal, 'packQuote'));
                shoppingCart.packQuote = newVal;
                stepsBtns.activeBtn = 1;
                updatePrices();
            }

            if (idProp === "packPrice") {
                setPackPrice.apply(newVal, [packQuotePriceElem]);
                shoppingCart.packPrice = newVal;
                updatePrices();
            }

            if (idProp === "update") {
                shoppingCart.update = newVal;
                if (!shoppingCart.haspack) {
                    [].slice.call(document.querySelectorAll(getPattern(attrs.quote, 'pack'))).map(setPackQuote.bind(newVal, 'pack'));
                    toggleDisplayElem(totals, newVal);
                }
                uiPayment.updatePackPayment(selectedPack.name, newVal);
                updatePrices();
            }

            if (idProp === "upgrade") {
                if (newVal) {
                    [].slice.call(quoteSpansList).map(setPackQuote.bind(shoppingCart.packQuote, 'packQuote'));
                }
                shoppingCart.upgrade = newVal;
                toggleDisplayElem(document.querySelector(getPattern(attrs.quote, 'pack')), newVal);
                updatePrices();
                toggleDisplayElem(totals, newVal);
            }

            if (idProp === "shops") {
                uiPayment.updateShopPayment(newVal);
                shoppingCart.shops = newVal;
                checkShopPack();
                checkUpdateCart();
                updatePrices();
               
            }

            if (idProp === "haspack") {
                shoppingCart.haspack = newVal;
                stepsBtns.activeBtn = 1;
                toggleDisplayElem(totals);
            }

            if (idProp === "name") {
                shoppingCart.selectedPack = newVal;
            }
        },

        getElems = function() {
            quoteSpansList = document.querySelectorAll(getPattern(attrs.quote, 'payQuote'));
            userLang = navigator.language || navigator.userLanguage;
            ivaElem = document.querySelector(getPattern(attrs.price, 'iva')) || false;
            subtotalElem = document.querySelector(getPattern(attrs.price, 'subtotal'));
            totalElem = document.querySelector(getPattern(attrs.price, 'total'));
            packQuotePriceElem = document.querySelector(getPattern(attrs.price, 'price'));
            enterpriseReminderPack = document.querySelector(getPattern(attrs.shop, 'enterprise'));
            totals = document.querySelector(getPattern(attrs.quote, 'totals'));
            msgList = [].slice.call(document.querySelectorAll(getPattern(attrs.message)));
            shopList.registerShop();
            setDefaultFinalShop();
            hideMessages();
        },

        init = function() {
            var receivedPack = typeof receivedParams !== "undefined" ? receivedParams : 0,
                hasStepsElems = document.querySelectorAll('[' + patt + '*="step"]').length > 0;
            if (!hasStepsElems) {
                return false;
            }
            [].slice.call(document.querySelectorAll(getPattern(attrs.login))).map(formatPrice);
            [].slice.call(document.querySelectorAll(getPattern(attrs.price))).map(formatPrice);
            [].slice.call(document.querySelectorAll('form[autocomplete="off"]')).map(stopFFFormsEvt);
            [].slice.call(document.querySelectorAll(getPattern(patt, 'form'))).map(registerForms);
            [].slice.call(document.querySelectorAll(getPattern(attrs.wallet))).map(getWalletElems);
            getElems();
            cartSteps.registerSteps();
            uiPayment.registerElems();
            clientPack.registerPack(receivedPack);
        };

    this.updateCart = updateCart;
    this.checkShopPack = checkShopPack;
    this.checkUpdateCart = checkUpdateCart;
    this.showMessages = showMessages;
    this.hideMessages = hideMessages;
    this.init = init;

}).apply(sCart);
window.addEventListener('load', sCart.init, true);