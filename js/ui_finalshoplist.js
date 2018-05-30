var finalShopList = {};

(function() {

    var domAnchorElem,
        finalShopElem,
        finalShopList = [],

        domParams = {
            "theme": "",
            "catalog": "",
            "price": "",
            "name": ""
        },

        setShopParams = function(elem, params, index) {
            var price = params.discount ? Number(params.priceval) / 2 : Number(params.priceval);           
            elem.theme.innerHTML = params.themeName;
            elem.catalog.innerHTML = params.catalogName;
            elem.name.innerHTML = (index + 1) + '. ' + elem.name.innerHTML;
            formatPrice(elem.price, null, null, price);
        },

        getShopParams = function(elem) {
            for (var e in domParams) {
                elem[e] = elem.querySelector(getPattern(attrs.finalshop, e));
            }
        },

        addFinalShop = function() {
            var nfshop = finalShopElem.cloneNode(true);
            getShopParams(nfshop);
            nfshop.removeAttribute('style');
            return nfshop;
        },
        
        resetFinalShopList = function(elem) {
            elem.parentNode.removeChild(elem);
        },

        setShopVars = function(shop, index, array) {
            var params = shop.getParams(),
                nfshop = addFinalShop();
            setShopParams(nfshop, params, index);
            finalShopList.push(nfshop);
            insertBefore(domAnchorElem, nfshop);           
        },

        manageShops = function(shoplist) {
            finalShopList.map(resetFinalShopList);
            finalShopList = [];
            shoplist.map(setShopVars);
        },
        
        registerShop = function(finalElem) {          
            domAnchorElem = document.createElement('div');
            insertBefore(finalElem, domAnchorElem);
            finalShopElem = finalElem.cloneNode(true);
            finalElem.parentNode.removeChild(finalElem);            
        };

    this.manageShops = manageShops;
    this.registerShop = registerShop;

}).apply(finalShopList);