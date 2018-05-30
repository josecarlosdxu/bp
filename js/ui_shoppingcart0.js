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
        "log": "data-jslog"

    },

   

    shoppingCart = {

        "packPrice": 0,
        "loginQuote": 0,
        "packQuote": 0,
        "selectedPack": "",
        "shops": 0

    };



(function() {

    var packQuotePriceElem,
        userLang,
        panelBtns,
        totalElem,
        subtotalElem,
        ivaElem,
        enterpriseReminderPack,
        radioPackList,
        patt = 'data-jscart',
        hasPackAttr = 'data-jspack',
        //radioPackMatch = 'packplan',
        panelPatt = 'data-jscart',
        panelActiveClass = 'shoppingCartStep--active',
        panelEditableClass = 'shoppingCartStep--editable',
        shopSelectedClass = 'u-brd-blue',
        selectErrorClass = 'form-select--error',

        setPackPrice = function(elem) {
            formatPrice(elem, null, null, String(this));            
        },
        setPackQuote = function(type, elem) {
            if (type === 'container' && elem.hasAttribute('style')) {
                elem.removeAttribute('style');
            }
            if (type === 'payQuote') {
                elem.innerHTML = String(this);

            }
        },
        // setPackType = function(type, elem) {
        //     var newClassame,
        //         headerClassprefix = 'pricePanel-header--',
        //         packClassprefix = 'pack--';

        //     if (type === 'header') {
        //         newClassame = headerClassprefix + String(this);
        //         elem.className = 'pricePanel-header u-mgb--half';
        //         elem.classList.add(newClassame);
        //     }
        //     if (type === 'pack') {
        //         newClassame = packClassprefix + String(this);
        //         elem.className = 'pack pack--big';
        //         elem.classList.add(newClassame);

        //     }
        //     if (type === 'text') {
        //         elem.innerHTML = String(this);
        //     }


        // },

        /*updateSteps = function(step) {
            var step4ElemDisplay = step === 4 ? 'inherit' : 'none';
            document.querySelector(getPattern(attrs.step, '4')).style.display = step4ElemDisplay;
        },
*/

       


       

        shoppingCartWatch = function() {
           /* for (var e in shoppingCart) {
                shoppingCart.watch(e, updateCart);
            }*/
        },

       




        stopFFFormsEvt = function(elem) {
            elem.addEventListener('submit', function(evt) {
                evt.preventDefault();
            })
        },

        setDefaultShop = function() {
            var defaultShop = document.querySelector(getPattern(attrs.shop, 'shop')),
                defaultFinalShop = document.querySelector(getPattern(attrs.finalshop, 'shop')),
                hasOldShops = document.querySelectorAll(getPattern(attrs.shop, 'oldshop')).length;
            shopList.oldShops(hasOldShops);
            shopList.registerShop(defaultShop);
            finalShopList.registerShop(defaultFinalShop);
        },

        getCartBtnElems = function(elem, index) {
            var step = Number(elem.getAttribute(patt).replace('btn-', '')) + 1;
            elem.step = step;
            elem.disabled = index === 0;
            elem.addEventListener('click', activatePanel);
        },

        getElems = function() {
            userLang = navigator.language || navigator.userLanguage;


            ivaElem = document.querySelector(getPattern(attrs.price, 'iva')) || false;
            subtotalElem = document.querySelector(getPattern(attrs.price, 'subtotal'));
            totalElem = document.querySelector(getPattern(attrs.price, 'total'));
            packQuotePriceElem = document.querySelector(getPattern(attrs.price, 'price'));
            enterpriseReminderPack = document.querySelector(getPattern(attrs.shop, 'enterprise'));
            //radioPackList =  [].slice.call(document.querySelectorAll(getPattern(patt, radioPackMatch)));
            //radioPackList.map(setRadioProps); 
            uiPayment.registerElems();
            setDefaultShop();

        },


        updatePrices = function(shps) {


           /* for (var e in selectedPack) {

               if(!pricesObj[e]){

                pricesObj[e] = selectedPack[e]
               
               }
                //shoppingCart.watch(e, updateCart);
            }*/



          
           var total,
                iva = 0,
                shops = Number(shps) || shoppingCart.shops,
                subtotal = Number(shoppingCart.packPrice) + Number(shoppingCart.loginQuote) + shops;

            if (ivaElem) {
                iva = subtotal * 0.21;
                formatPrice(ivaElem, null, null, iva);
            }
           // if (shops === 0) {
                //panelBtns[1].disabled = false;

            //}

            total = subtotal + iva;
            formatPrice(subtotalElem, null, null, subtotal);
            formatPrice(totalElem, null, null, total);
        };
         this.updateCart = function(idProp,  newVal) {
            /*if (idProp === "name") {
                [].slice.call(document.querySelectorAll(getPattern(attrs.pack, 'name'))).map(setPackType.bind(newVal, 'text'));
                [].slice.call(document.querySelectorAll(getPattern(attrs.pack, 'header'))).map(setPackType.bind(newVal, 'header'));
                [].slice.call(document.querySelectorAll(getPattern(attrs.pack, 'pack'))).map(setPackType.bind(newVal, 'pack'));
                if (newVal === 'enterprise') {
                    enterpriseReminderPack.style.display = 'none';
                    panelBtns[1].disabled = false;
                    updatePrices();
                    uiPayment.updatePackPayment(1);
                    return newVal;
                }

                uiPayment.updatePackPayment(newVal);
            }*/
            /*if (idProp === "payQuote") {
                [].slice.call(document.querySelectorAll(getPattern(attrs.quote, 'container'))).map(setPackQuote.bind(newVal, 'container'));
                [].slice.call(document.querySelectorAll(getPattern(attrs.quote, 'payQuote'))).map(setPackQuote.bind(newVal, 'payQuote'));

            }*/

             if (idProp === "loginQuote") { 
                 setPackPrice.apply(newVal, [document.querySelector(getPattern(attrs.price, 'login'))]); 
                 shoppingCart.loginQuote = newVal;
                 updatePrices();                               
                
  
             }

            if (idProp === "packQuote") {
                [].slice.call(document.querySelectorAll(getPattern(attrs.quote, 'container'))).map(setPackQuote.bind(newVal, 'container'));
                [].slice.call(document.querySelectorAll(getPattern(attrs.quote, 'payQuote'))).map(setPackQuote.bind(newVal, 'payQuote'));
                updatePrices();

            }
            if (idProp === "packPrice") {
                setPackPrice.apply(newVal, [packQuotePriceElem]);
                shoppingCart.packPrice = newVal;
                updatePrices();
                

            }

            if (idProp === "shops") {
                uiPayment.updateShopPayment(newVal);
                //updatePrices(newVal);
                

            }
            /*if (idProp === "step") {
                updateSteps(newVal);
            }*/
            return newVal;

        },



    this.checkShopPack = function() {
        var isEnterprisePack = selectedPack.name === 'enterprise',
            styleDisplay = isEnterprisePack ? 'none' : 'block';
        panelBtns[1].disabled = !isEnterprisePack;
        enterpriseReminderPack.style.display = styleDisplay;

    };


    this.init = function() {
        if (document.querySelectorAll(getPattern(patt)).length < 1) {
            return false;
        }
        [].slice.call(document.querySelectorAll(getPattern(attrs.login))).map(formatPrice);
        [].slice.call(document.querySelectorAll(getPattern(attrs.price))).map(formatPrice);
        [].slice.call(document.querySelectorAll('form[autocomplete="off"]')).map(stopFFFormsEvt);













        //[].slice.call(document.querySelectorAll(getPattern(attrs.edit))).map(editListeners);



        //data-js-step



        cartSteps.registerSteps();
        uiPayment.registerElems();
        clientPack.registerPack();
        getElems();
        //shoppingCartWatch();


    };
}).apply(sCart);





window.addEventListener('load', sCart.init, false);