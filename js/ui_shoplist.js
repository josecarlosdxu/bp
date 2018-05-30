var shopList = {},
    shopPrices = 0;

(function() {

    var defaultDOMShop,
        domAnchorElem,
        shopHeaderSpan,
        hasOldShops = false,
        listShops = [],
        activeShops = [],
        spanList = [],
        getIndex = function() {
            return listShops.length - 1;
        },
        getLastChild = function() {
            return listShops[listShops.length - 1];
        },

        getAddedShops = function() {
            var e,
                len,
                elem,
                isAddedElem,
                addedShops = [];
            for (e in listShops) {
                elem = listShops[e];               
                isAddedElem =elem['isAdded'] || function(){return false;};
                if (isAddedElem()) {
                    addedShops.push(elem);
                }

            }
            activeShops = addedShops;
            len = activeShops.length;
            if (len > 0 && !hasOldShops) {
                activeShops[0].removeDiscount();
            }
            if (len > 0 && hasOldShops) {
                activeShops[0].applyDiscount();
            }
            if (len > 1) {
                activeShops[1].applyDiscount();
            }
            sCart.checkShopPack();
            finalShopList.manageShops(activeShops);
        },

        resetSpanList = function(elem) {
            elem.parentNode.removeChild(elem);
            shoppingCart.shoplist = [];
        },

        getSpanParams = function(spShop) {
            spShop.catalogName = spShop.querySelector(getPattern('data-jscatalog', 'catalog'));
            spShop.themeName = spShop.querySelector(getPattern('data-jstheme', 'theme'));
            spShop.numeral = spShop.querySelector(getPattern('data-jsindex'));
        },

        addSpanShop = function() {
            var spShop = shopHeaderSpan.cloneNode(true);
            getSpanParams(spShop);
            return spShop;
        },

        setSpanVars = function(elem, index) {
            var params = elem.getParams(),
                spShop = addSpanShop();
            spShop.catalogName.innerHTML = params.catalogName;
            spShop.themeName.innerHTML = params.themeName;
            spShop.numeral.innerHTML = index + 1 + ".";
            spanList.push(spShop);
            insertBefore(domAnchorElem, spShop);
            //console.log(params);
            //{themeId: "1", themeName: "Valencia", catalogId: "3", catalogName: "Electrónica", added: true, …}  
            shoppingCart.shoplist.push({ id: params.themeId, topic: params.catalogId });

        },

        manageSpanHeaderShops = function() {
            spanList.map(resetSpanList);
            spanList = [];
            shoppingCart.shoplist = [];
            activeShops.map(setSpanVars);
        },

        getPrices = function() {
            var e,
                prices = 0;                
                getAddedShops();

            if (activeShops.length === 0) {
                shopPrices = prices;
                manageSpanHeaderShops();

                return prices;
            }
            for (e in activeShops) {

               

                var elem = activeShops[e],

                    isGetParams = elem['getParams'] || function(){  return {'discount':0, 'priceval':0}}

                    params =  isGetParams(),
                    priceval = params.discount ? Number(params.priceval) / 2 : Number(params.priceval);
                    
                prices += priceval;
               
            }
            shopPrices = prices;
            manageSpanHeaderShops();
            return prices;
        },

        registerHeaderSpan = function() {
            var elem = document.querySelector(getPattern(attrs.step, '2'));
            domAnchorElem = document.createElement('div');
            insertBefore(elem, domAnchorElem);
            shopHeaderSpan = elem.cloneNode(true);
            shopHeaderSpan.removeAttribute('style');
            elem.parentNode.removeChild(elem);

        },

        removeShop = function(index) {
            var lastShop = listShops.pop(),
                elem = lastShop.DOMElem;
            if (!lastShop.isMarked() && elem) {
                elem.parentNode.removeChild(elem);
                sCart.updateCart('shops', getPrices());
                return false;
            }
            listShops.push(lastShop);
            sCart.updateCart('shops', getPrices());
        },

        addShop = function() {

            var DOMElem,
                newShop,
                index = getIndex(),
                shopIndex = index + 1,
                lastChild = listShops[index],
                /*isMarked = lastChild.isMarked(),*/
                isAdded = lastChild.isAdded();


         if (isAdded) {
                DOMElem = defaultDOMShop.cloneNode(true);
                insertAfter(lastChild.DOMElem, DOMElem);
                newShop = new uiShop(DOMElem, shopIndex);
                listShops.push(newShop);
                newShop.applyDiscount(); 

            }  

            sCart.updateCart('shops', getPrices());
        },


        addPreselectedShops = function(elem, index) {
            if (listShops[index]) {

                var shop = listShops[index],

                    shopParams = shop.shopParams,
                    shopElems = shop.shopElems;

                shopParams.themeId = elem.idtheme;
                shopParams.isAdded = true;
                shopParams.catalogId = elem.idcatalog;              


                shopElems.checkbox.checked = true;
                shopElems.themeSelector.value = elem.idtheme;
                shopElems.catalogSelector = elem.idcatalog;//shop.updateShopType();

            }
            /*var newShop = new uiShop(defaultDOMShop, listShops.length);


             newShop.shopParams.themeId = elem.idtheme;

            newShop.shopParams.isAdded=true;

            newShop.shopParams.catalogId =elem.idcatalog;


            newShop.activateShop();
            //listShops.push(newShop);*/



        },


        registerShop = function() {
            /////-----------------------
            var newShop,
                DOMElem = document.querySelector(getPattern(attrs.shop, 'shop')),                
                preselectShops = receivedParams.preselectedshops || [],
                hasPreselectShops = preselectShops.length > 0;
                hasOldShops = document.querySelectorAll(getPattern(attrs.shop, 'oldshop')).length > 0;

            newShop = new uiShop(DOMElem, 0);
            listShops.push(newShop);
            defaultDOMShop = DOMElem;
            registerHeaderSpan();
           
            if (hasOldShops) {               
                newShop.applyDiscount();               
               
            }
            if (hasPreselectShops) {
                //preselectShops.map(addPreselectedShops);
            }
            

           

        },

        deleteShop = function(item) {
            var elem = item.DOMElem;
            elem.parentNode.removeChild(elem);

        }

    resetShops = function() {
        var defShopObj, elem, item,
            len = activeShops.length;
        if (len === 0) {
            return;
        }
        defShopObj = activeShops.shift();
        activeShops.map(deleteShop);
        defShopObj.resetValues();
        removeShop(0);
        listShops = [defShopObj];
        activeShops = [];
        sCart.updateCart('shops', getPrices());

    };

    this.addShop = addShop;
    this.registerShop = registerShop;
    this.removeShop = removeShop;
    this.resetShops = resetShops;

}).apply(shopList);