function uiShop(DOMElem, index) {

    var idShop = "shop_" + index,
        selectErrorClass = 'form-select--error',
        shopSelectedClass = 'u-brd-blue',
        attrs = {
            shop: "data-jsshop",
            priceval: "data-jsshopriceval"
        },        
        findShopElem = function(match) {           
           return DOMElem.querySelector(getPattern(attrs.shop, match));
            
        };
       shopElems = {
            container: DOMElem,
            checkbox: findShopElem('checkbox'),
            themeSelector: findShopElem('theme'),
            //catalogSelector: findShopElem('catalog'),
            label: findShopElem('label'),
            discountSpan: findShopElem('discount'),
            price: findShopElem('price')
        },
       
        shopParams = {
            themeId: "",
            themeName: "",
            //catalogId: "",
            //catalogName: "",
            added: "",
            shopId: index,
            priceval: shopElems.price.getAttribute(attrs.priceval),            
            discount: false
        },


        shopAdded = function(newVal) {
            if (newVal === true) {
                shopElems.container.classList.add(shopSelectedClass);
                shopList.addShop();
                return false;
            }
            shopElems.container.classList.remove(shopSelectedClass);
            shopList.removeShop(index);
        },

        activateShop = function(evt) {
            if (!evt) {
                shopElems.checkbox.checked = true;
            }
            //console.log(shopParams.shopId)


            if (shopParams.themeId === "") {
                shopElems.themeSelector.classList.toggle(selectErrorClass);
                return false;
            }
            /*if (shopParams.catalogId === "") {
                shopElems.catalogSelector.classList.toggle(selectErrorClass);
                return false;
            }*/
            shopParams.added = shopElems.checkbox.checked;
        },

        updateShopParams = function(idProp, oldVal, newVal) {
            if (idProp === 'added') {
                shopAdded(newVal);
            }
            console.log(idProp, newVal)
            return newVal;
        },

        resetValues = function() {
            shopElems.checkbox.checked = false;
            shopElems.themeSelector.value = 0;
           // shopElems.catalogSelector.value = 0;
            shopElems.container.classList.remove(shopSelectedClass);
        },

        updateShopType = function(evt) {
            var e = evt.target,
                selectedIndex = e.options[e.selectedIndex];
            if (e === shopElems.themeSelector) {
                shopParams.themeId = selectedIndex.value;
                shopParams.themeName = selectedIndex.text;
                shopElems.themeSelector.classList.remove(selectErrorClass);
                activateShop();
                return false;
            }
            //shopParams.catalogId = selectedIndex.value;            
           // shopParams.catalogName = selectedIndex.text;
            //shopElems.catalogSelector.classList.remove(selectErrorClass);
            activateShop();
        };

    for (var e in shopParams) {
        shopParams.watch(e, updateShopParams);
    }

    shopElems.checkbox.id = idShop;
    resetValues();

    shopElems.label.setAttribute('for', idShop);
    formatPrice(shopElems.price, null, null, shopParams.priceval);


    shopElems.themeSelector.addEventListener('change', updateShopType);
    //shopElems.catalogSelector.addEventListener('change', updateShopType);

    shopElems.checkbox.addEventListener('change', activateShop);   

    this.DOMElem = shopElems.container; 

    this.applyDiscount = function() {
    	var discountPrice = Number(shopParams.priceval)/ 2;
    	shopParams.discount = true;
    	shopElems.discountSpan.removeAttribute('style');
    	formatPrice(shopElems.price, null, null, discountPrice);  

    };
    this.removeDiscount = function() {
    	var notDiscountPrice = Number(shopParams.priceval);    	
    	shopParams.discount = false;
    	shopElems.discountSpan.style.display='none';
    	formatPrice(shopElems.price, null, null, notDiscountPrice);  
    };   

    this.isMarked = function(){
    	//return shopParams.themeId !=="" || shopParams.catalogId !=="" || shopElems.checkbox.checked === true;
        return shopParams.themeId !=="" ||  shopElems.checkbox.checked === true;
    };

    this.isAdded = function(){ 	
    	//return shopParams.themeId !=="" && shopParams.catalogId !=="" && shopElems.checkbox.checked === true;
        return shopParams.themeId !=="" && shopElems.checkbox.checked === true;
    };

    this.getParams = function() {
    	return shopParams;

    };

    //console.log(shopParams.shopId)
    //// function public set half 
    //this.shopElems = shopElems;

}

//shopList.addShop();