var tagSlider = (function () {
 "use strict";
    var panelTag1,
        panelTag2,
    	panelPattern = 'data-js-tag-slider',
    	btnPatternText = 'button',

    clickSlide = function() {

    	$('[data-js-tag-slider="tag2"]').show();
    	$('[data-js-tag-slider="tag1"]').fadeOut();
    },

    load = function () {

    	//panelTag1.hide();
    	//panelTag2.hide();
    },
    getTagPanels = function () {
       // panelTag1 = document.querySelector(getPattern(panelPattern, 'tag1'));
       // panelTag2 = document.querySelector(getPattern(panelPattern, 'tag2'));
       // panelTag1.hide();
       //$('[data-js-tag-slider="tag1"]').hide();
       $('[data-js-tag-slider="tag2"]').hide();
       console.log($('[data-js-tag-slider="tag2"]'))
    },
    getButtons = function () {
            var buttonsList = document.querySelectorAll(getPattern(panelPattern, btnPatternText)),
                len = buttonsList.length;
            len > 0 ? iterateButtons(buttonsList, len) : null;
    },
    iterateButtons = function (buttonsList, len) {
            for (var i = 0; i < len; i++) {
                setButtonProps.apply(buttonsList[i]);
            }
    },
    setButtonProps = function () {
            bindElemHandler.apply(this, [clickSlide]);
    },
    init = function () {
    	getButtons();
    	getTagPanels();
    	load();
    };
    return {
        init: init
    };
})(window);