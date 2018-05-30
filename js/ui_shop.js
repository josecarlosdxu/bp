function uiShop(DOMElm, index) {

    var DOMElem = DOMElm,
        idShop = "shop_" + index,
        selectErrorClass = 'form-select--error',
        shopSelectedClass = 'u-brd-blue',
        attrs = {
            shop: "data-jsshop",
            topic: "data-jstopic",
            priceval: "data-jsshopriceval"
        },

        findShopElem = function(patt,match) {
            return DOMElem.querySelector(getPattern(patt,match));
        },

        findShopElemList = function(match) {
            return DOMElem.querySelectorAll(getPattern(attrs.shop, match));
        },

        shopElems = {
            container: DOMElem,
            checkbox: findShopElem(attrs.shop,'checkbox'),
            themeSelector: findShopElem(attrs.shop,'theme'),
            catalogSelectorList: findShopElemList('topic'),
            label: findShopElem(attrs.shop,'label'),
            discountSpan: findShopElem(attrs.shop,'discount'),
            price: findShopElem(attrs.shop,'price'),
            catalogSelector: findShopElemList('topic')[0]
        },

        shopParams = {
            themeId: "",
            themeName: "",
            catalogId: "",
            catalogName: "",
            added: "",
            priceval: shopElems.price.getAttribute(attrs.priceval),
            discount: false
        },

        shopAdded = function() {          
            if (shopParams.added) {
                shopElems.container.classList.add(shopSelectedClass);
                shopList.addShop();                           
                return false;
            }
            shopElems.container.classList.remove(shopSelectedClass);
            shopList.removeShop(index);
        },

        checkThemeSelected = function() {
            var isSelectedTheme = Boolean(Number(shopParams.themeId));
            /*selElemClassList = shopElems.themeSelector.classList,
            method = isSelectedTheme ? 'remove':'toggle';
            selElemClassList[method](selectErrorClass);  */
            return isSelectedTheme;
        },

        /*9updateShopParams = function(idProp, oldVal, newVal) {
            if (idProp === 'added') {
                shopAdded(newVal);
            }

            return newVal;
        },*/

        activateShop = function(evt) {
            if (!evt) {
                shopElems.checkbox.checked = true;                
            }
            if (!checkThemeSelected()) {
                shopElems.themeSelector.classList.toggle(selectErrorClass);               
                return false;
            }
            shopElems.themeSelector.classList.remove(selectErrorClass);
            shopParams.added = shopElems.checkbox.checked;
            shopAdded();
        },


        toggleCatalog = function(){

            var topic = findShopElem(attrs.topic, shopParams.themeId),
            topicSelected = topic.options[topic.selectedIndex];            
            if(topic!== shopElems.catalogSelector){
                shopElems.catalogSelector.style.display = 'none';
                shopElems.catalogSelector.selectedIndex = 0;
                shopElems.catalogSelector = topic;
                 topic.removeAttribute('style'); 
            }

                           
            shopParams.catalogId = topicSelected.value;
            shopParams.catalogName = topicSelected.text;
        },

        updateShopType = function(evt) {      
            var method,                          
                e = shopElems.themeSelector,
                selectedIndex = e.options[e.selectedIndex];
                shopParams.themeId = selectedIndex.value;
                shopParams.themeName = selectedIndex.text;


           toggleCatalog();
            if (!checkThemeSelected()) {                
                return false;
            }                    
            activateShop();
           

        },

        setActiveCatalog = function(evt){
            shopElems.catalogSelector = evt.currentTarget;
            updateShopType();
        },

        resetValues = function() {
            shopElems.themeSelector.value = 0;
            shopElems.checkbox.checked = false;
            shopElems.container.classList.remove(shopSelectedClass);
            shopParams.added = "";
        },

        applyDiscount = function() {            
            var discountPrice = Number(shopParams.priceval) / 2;
            shopParams.discount = true;
            shopElems.discountSpan.removeAttribute('style');
            toggleCatalog();
            formatPrice(shopElems.price, null, null, discountPrice);

        },

        removeDiscount = function() {
            var notDiscountPrice = Number(shopParams.priceval);
            shopParams.discount = false;
            shopElems.discountSpan.style.visibility = 'hidden';
            formatPrice(shopElems.price, null, null, notDiscountPrice);
        },

        isAdded = function() {
            return shopParams.added;
        },

        isMarked = function() {
            return shopParams.themeId !== "" || shopElems.checkbox.checked === true;
        },

        getParams = function() {
            return shopParams;
        };

    shopElems.checkbox.shopParams = shopParams;
    shopElems.checkbox.id = idShop;
    shopElems.label.setAttribute('for', idShop);
    formatPrice(shopElems.price, null, null, shopParams.priceval);
    shopElems.checkbox.addEventListener('change', activateShop);
    shopElems.themeSelector.addEventListener('change', updateShopType);
    [].slice.call(shopElems.catalogSelectorList).map( function(el){el.addEventListener('change', setActiveCatalog)});

    resetValues();

    this.applyDiscount = applyDiscount;
    this.removeDiscount = removeDiscount;
    this.isAdded = isAdded;
    this.isMarked = isMarked;
    this.getParams = getParams;
    this.DOMElem = DOMElem;
    this.resetValues = resetValues;
    this.shopElems = shopElems;



    this.shopParams = shopParams;




    this.activateShop = activateShop;


    //this.updateShopType = updateShopType;


}