var mainNavBack = (function (window, undefined) {
    var patternMatch = 'data-js-mainnavback',
        selectedClassName = 'mainNavMenu-link--selected',
        siblingClassName = 'mainNavMenu--submenu',

        setSelected = function (elem) {
           var nextSibling = elem.nextElementSibling || document.createElement('div');
           elem.classList.add(selectedClassName);
            //addClass(elem, selectedClassName);
          if(nextSibling && hasClass(nextSibling, siblingClassName)) {
             nextSibling.style.display ='block';
           }
        },
         setProperties = function (el) {
          //var linkDirection = el.getAttribute('data-js-mainnavback')+".html"; 
          var linkDirection = el.getAttribute('data-js-mainnavback'); 
           if(window.location.pathname.search(linkDirection) > 0) {
              setSelected(el);
           }
        }, 
        init = function () {
           [].slice.call(document.querySelectorAll('[' + patternMatch + ']')).map(setProperties);          
        };
    return {
        init: init
    };

})(window);
window.addEventListener("load", mainNavBack.init, false);


