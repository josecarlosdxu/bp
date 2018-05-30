var grouped = (function (window, undefined) {
    "use strict";
      var elementList,
        patternMatch = 'data-js-grouped',
        patternAccordion = 'articles',
        patternCounter = 'counter',

        setCounter = function () { ///  find articles
          var nav = document.querySelector(getPattern(patternMatch, patternAccordion));
          if(nav == null) return;
          var numberOfChildren = nav.getElementsByTagName('article').length;
          var counter = document.querySelector(getPattern(patternMatch, patternCounter));
          if(counter == null) return;
          counter.innerHTML = numberOfChildren - 3; // -3 = primero, penultimo y último mensaje
        },
        getItems = function () {
            var len;
            elementList = document.querySelectorAll(getPattern(patternMatch, patternAccordion));
            elementList = accordionsList.length;
            len =  elementList > 0 ? setCounter() : null;
        },
        init = function () {
          setCounter();
        };
    return {
        init: init
    };
})(window);
window.addEventListener("load", grouped.init, false);





