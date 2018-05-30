var cartModel = {};

(function() {
    var dataObj = {
            "shops": [],
            "steps": [],
            "packs": [],
            "pack": {}
        },
        listeners = {},

        appendController = function(sender, idProp) {
            if (!listeners[idProp]) {
                listeners[idProp] = [];
            }
            listeners[idProp].push(sender);
        },

        updateListenerObservers = function(elem) {
            elem(this);
        },


        updateDataObj = function(idProp, oldVal, newVal) {
            if (listeners[idProp]) {
                listeners[idProp].map(updateListenerObservers.bind(newVal));
            }
        },

        setProp = function(prop, value) {
            dataObj[prop] = value;
        },

        getProp = function(prop) {
            return dataObj[prop];
        },

        fillData = function() {
            var e, dataProp;
            for (e in cartData) {
                dataProp = Boolean(dataObj[e]) ? dataObj[e] = cartData[e] : null;
            }
        },
        watchDataObj = function() {
            for (var e in dataObj) {
                dataObj.watch(e, updateDataObj);
            }
        };

    this.init = function() {
        fillData();
        watchDataObj(); 
    };

    this.setProp = setProp;
    this.getProp = getProp;
    this.appendController = appendController;


}).apply(cartModel);
window.addEventListener('load', cartModel.init, true);






