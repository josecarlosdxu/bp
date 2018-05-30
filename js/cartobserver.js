function Event(sender) {

    var _sender = sender,
        _listeners = [],
        attach = function(listener) {
            _listeners.push(listener);
        },

        notify = function(args) {
            var index = 0;
            for (index; index < _listeners.length; index++) {
                _listeners[index](_sender, args);
            }
        };

    this.attach = attach;
    this.notify = notify;

}

//console.log('cartObserver 🡪 loaded');

function formatPriceElem(elem){

    formatPrice(elem,null,null,parseInt(elem.innerHTML));
}