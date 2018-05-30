var planCard = {};
(function() {
    "use strict";
    var planCardElemPatt = 'data-js-planCardElem',
        planCardImgPatt = 'data-js-planCardImg',
        showClass = 'toShow',
        hideDelayClass = 'toHideDelay',
        hideClass = 'toHide',
        delay = 3000,
        imgCarousel = function(elem) {
            var toShow, toHide,
                imgClass = elem.imgClass,
                list = elem.imgList,
                index = elem.index,
                len = list.length - 1;
            if (index === 0) {
                index++;
                elem.index = index;
                return false;
            }
            if (index > len) {
                index = 0;
                toHide = list[len];
                toHide.setAttribute('class', imgClass + ' ' + hideClass);
            } else {
                toHide = list[index - 1];
                toHide.setAttribute('class', imgClass + ' ' + hideDelayClass);
            }
            toShow = list[index];
            toShow.setAttribute('class', imgClass + ' ' + showClass);
            index++;
            elem.index = index;
        },

        setPlanCardProps = function() {            
            var interval,
                elem = this,
                list = elem.querySelectorAll(getPattern(planCardImgPatt)),
                len = list.length;
            elem.imgClass = list[0].className;
            elem.imgList = list;
            elem.index = 0;          
           interval = setInterval(function() {
                imgCarousel(elem);
            }, delay);  
        },

        setProps = function(list, func) {
            var len = list.length - 1;
            while (len > -1) {
                func.apply(list[len]);
                len--;
            }
            len = null;
        },
        getPlanCards = function() {
            var list = document.querySelectorAll(getPattern(planCardElemPatt)),
                len = list.length > 0 ? setProps(list, setPlanCardProps) : null;
        };
    this.init = function() {
        getPlanCards();
    };

}).apply(planCard);
window.addEventListener('load', planCard.init, false);
