var selectpack = {};
(function() {
    var packType,
        packImage,
        packName,
        packPatt = 'data-js-pack',
        deafultImageClass = 'pricePanel pricePanel--huge',
        setPackType = function() {
            var selectedPackEvt,
                dropdown = this,
                value = parseInt(dropdown.options[dropdown.selectedIndex].value);
            packType = 'Business';

            if (value > 1342) {
                packType = 'Premium';
            }

            if (value > 1344) {
                packType = 'Pro';

            }
            selectedPackEvt = document.createEvent('Event');
            selectedPackEvt.initEvent('selectpack', true, true);
            document.documentElement.dispatchEvent(selectedPackEvt);
        },
        
        changePackType = function(e) {
            setPackType.apply(e.target);
        },

         changePackName = function() {
            var text = packName.innerText || packName.textContent,
            text=text.replace(/Pro|Business|Premium/g,"")+packType;  
            packName.innerHTML =text;           
        },

        changePackImg = function() {
            packImage.setAttribute('class',deafultImageClass);
            addClass(packImage,'pricePanel--'+packType.toLowerCase());           
        },

        getElems = function() {
            var select = document.querySelector(getPattern(packPatt, 'select'));
            packImage = document.querySelector(getPattern(packPatt, 'image'));
            packName = document.querySelector(getPattern(packPatt, 'name'));
            select.addEventListener('change', changePackType, false);
            setPackType.apply(select);
        },

        checkElems = function() {
            var packElemsList = document.querySelectorAll(getPattern(packPatt)),
                hasPackElems = packElemsList.length > 0 ? getElems() : null;

        };

    this.init = function() {
        checkElems();
    };
    this.eventCaptured = function() {
        changePackImg();
        changePackName();
    };

}).apply(selectpack);
window.addEventListener('load', selectpack.init, false);
document.documentElement.addEventListener('selectpack', selectpack.eventCaptured, false);
