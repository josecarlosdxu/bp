var clientPack = {};

selectedPack = {
        "name": "",
        "idpack": "",
        "loginQuote": 0,
        "packQuote": 0,
        "packPrice": 0,
        "haspack": false,
        "update": false,
        "upgrade": false,        
        "className": "color-blue"
    },

    packDomElems = {
        "name": "",
        "header": "",
        "pack": ""
    };

(function() {
    var nameElems,
        headerElems,
        packElems,
        radioPackList,
        receivedPack,
        domElems = [],
        radioPackMatch = 'packplan',
        headerClassprefix = 'pricePanel-header--',
        packClassprefix = 'pack--',
        patt = 'data-jscart',
        samePack = false,

        setElemPackType = function(type, elem) {
            var newClassame;

            if (type === 'header') {
                newClassame = headerClassprefix + String(this);
                elem.className = 'pricePanel-header u-mgb--half';
                elem.classList.add(newClassame);
            }

            if (type === 'pack') {
                newClassame = packClassprefix + String(this);
                elem.className = 'pack pack--big';
                elem.classList.add(newClassame);
            }

            if (type === 'name') {
                elem.innerHTML = String(this);
            }

        },

        getElemsList = function(match) {
            return [].slice.call(document.querySelectorAll(getPattern(attrs.pack, match)));
        },

        updatePack = function(idProp, oldVal, newVal) {
            var elem;
            if (idProp === "name") {
                for (var i in domElems) {
                    elem = domElems[i];
                    if(typeof elem ==='object'){
                     elem.map(setElemPackType.bind(newVal, elem.type));
                   }
                }
                if (newVal !== "enterprise") {
                    shopList.resetShops();
                }
                uiPayment.updatePackPayment(newVal, selectedPack.update);
            } //else {
            sCart.updateCart(idProp, newVal);
            // }
            return newVal;
        },

        updateFirstStep = function(elem) {
            elem.checked = elem.packPrice === String(this) && elem.pack === "enterprise";
        },

        getSelectedPackValues = function(elem) {
            selectedPack.name = elem.pack;
            selectedPack.packQuote = elem.quote;
            selectedPack.idpack = elem.idpack;


        },

        checkSelectedPack = function(evt) {            
            var elem = this;
            getSelectedPackValues(elem);
            selectedPack.packPrice = elem.packPrice;
            selectedPack.loginQuote = elem.log;
            if (selectedPack.haspack) {
                selectedPack.update = selectedPack.haspack.packQuote !== selectedPack.packQuote || selectedPack.haspack.name !== selectedPack.name;
                selectedPack.upgrade = selectedPack.haspack.name !== selectedPack.name;
            } else {
                selectedPack.update = true;
            }

            if (elem.pack === "enterprise") {
                radioPackList.map(updateFirstStep.bind(elem.packPrice));
                sCart.checkShopPack(true);

            }
        },

        setRadioProps = function(elem) {
            
            var parentRow = elem.parentNode.parentNode;           
                rowClass = parentRow.classList;
            elem.pack = elem.getAttribute(attrs.pack);
            elem.quote = elem.getAttribute(attrs.quote);
            elem.packPrice = elem.getAttribute(attrs.priceval);
            elem.log = elem.getAttribute(attrs.log);
            elem.idpack = elem.value;
            elem.addEventListener('change', checkSelectedPack.bind(elem));  

            if (elem.idpack === receivedPack) {              
                rowClass.add(selectedPack.className);
                elem.checked = true;
                selectedPack.haspack = { "name": elem.pack, "packQuote": elem.quote }

                shoppingCart.update = false;
                getSelectedPackValues(elem);
                selectedPack.packPrice = 0;
                selectedPack.loginQuote = 0; 
                return false;
                
            }             

            if (rowClass.contains(selectedPack.className) ) {  
                elem.click();                          
            }
            /**/
        },

        setDomElems = function(type) {
            var elem = getElemsList(type);
            elem.type = type;
            domElems.push(elem);

        },

        selectedPackWatch = function() {
            for (var e in selectedPack) {
                selectedPack.watch(e, updatePack);
            }
            selectedPack.unwatch('idpack');
        },

        registerPack = function(rPack) {
            receivedPack = rPack.idpack; 
            radioPackList = [].slice.call(document.querySelectorAll(getPattern(patt, radioPackMatch)));
            for (var e in packDomElems) {
                setDomElems(e);
            }
            selectedPackWatch();
            radioPackList.map(setRadioProps);
        };

    this.registerPack = registerPack;


}).apply(clientPack);