var packController = {};

(function() {
    var packList,
        view,
        viewList = [],
        hasChangepProp = function(val) {
            viewList.map(function(elem) {
                elem.updateView(val.idPack);
            });
        },
        attachToModel = function() {
            cartModel.appendController(hasChangepProp, 'pack');
        },

        updatePackList = function(val, index) {
            cartModel.setProp('pack', { 'idPack': val });
        },

        attachView = function(viewData, index) {
            view = new packView();
            view.setModelData(cartModel.getProp('pack'));
            view.setControllerFunc(updatePackList);
            view.setData(viewData);
            viewList.push(view);
        },
        formatViewsPrices = function() {
            [].slice.call(document.querySelectorAll(getPattern('data-jsformat'))).map(formatPriceElem);

        },
        init = function() {
            packList = cartModel.getProp('packs');
            packList.map(attachView);
            attachToModel();
            formatViewsPrices();
        };

    this.init = init;

}).apply(packController);
window.addEventListener('load', packController.init, true);