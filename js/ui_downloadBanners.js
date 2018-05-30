var downloadBanners = {};

(function() {
    "use strict";
    "use strict";
    var imageSelected,
        downloadButton,
        buttonsNumSelected = 0,

        imgPattern = 'data-js-downloadBanner',
        imgSelectedClass = 'downloadBanner-img--active',
        downloadButtonPattern = '[ data-js-popup="submitAction"]',
        downloadButtonClass = 'button--primary',
        downloadButtonMsgs = ['Seleccione un idioma', 'Descargar'],


        downloadButtonState = function(numSel) {
            var num = Math.min(numSel, 1);
            downloadButton.innerHTML = downloadButtonMsgs[num];
            if (num === 0) {
                downloadButton.setAttribute('disabled', 'disabled');
                removeClass(downloadButton, downloadButtonClass);
                return false;
            }
            downloadButton.removeAttribute('disabled');
            addClass(downloadButton, downloadButtonClass);
        },

        assignImage = function(elm) {
            var pat = elm.getAttribute('for').substr(-2),
                imageAssoc = document.querySelector(getPattern(imgPattern, 'img-' + pat)) || false;
            if (imageAssoc && hasClass(imageAssoc, imgSelectedClass)) {
                imageSelected = imageAssoc;
            }
            return imageAssoc;

        },

        changeImg = function(e) {
            var target = e.currentTarget || e.srcElement;
            if (imageSelected !== target.image) {
                addClass(target.image, imgSelectedClass);
                removeClass(imageSelected, imgSelectedClass);
                imageSelected = target.image;
            }
        },

        checkElem = function(e) {
            var elem = e.currentTarget,
            checked = !elem.checked ;
            e.preventDefault(); 
            elem.checked = checked;
            elem.querySelector(getPattern('data-js-downloadbanner','checkbox')).checked = checked;  
        },

        setBtnLangProps = function(elem, index, array) {            
            var label = elem.querySelector(getPattern(imgPattern, 'label')),
            image = assignImage(label);
            elem.label = elem.querySelector(getPattern(imgPattern, 'label'));
            if (image) {
                elem.image = image;
                bindElemHandler.apply(elem, [changeImg, 'mouseover']);
            }
            elem.checked = false;
            elem.addEventListener('click', checkElem, false);
            
        },


        getPopupElems = function() {
            var buttonLangList = Array.prototype.slice.call(document.querySelectorAll(getPattern(imgPattern, 'lang')));            
            buttonLangList.map(setBtnLangProps);
            downloadButton = document.querySelector(downloadButtonPattern);
           
        },

        // Bigbuy actually code in use
        ///////////////////////////////////////////////////////////////////////
        // checkBanner = function () { 
        //     var id_banner = $(this).data('jsDownloadbannerId');
        //     popup.getPopup(baseUriBack+'download/popupDownloadBanner/'+id_banner);
        //     timer = setInterval(popupExist, 200);
        // },
         ///////////////////////////////////////////////////////////////////////

        checkBanner = function(evt) {
            var dest =evt.currentTarget.getAttribute('data-js-downloadbanner-id');            
            popup.getPopup('../../views/front/partials/popup_'+dest+'.html');
        },
        bindElemHandler = function(methodName, evtType) {
            var eventType = evtType || 'click';
            addEventHandler(this, eventType, methodName);
        },

        getElems = function() {
            var elemList = Array.prototype.slice.call(document.querySelectorAll(getPattern(imgPattern))),
                len = elemList.length > 0;
            if (!len) {
                return false;
            }
            elemList.map(function(elm) { bindElemHandler.call(elm, checkBanner) });
            addEventHandler(document.documentElement, 'replace', getPopupElems);
        };
    this.init = function() {
        getElems();
    };

}).apply(downloadBanners);
window.addEventListener('load', downloadBanners.init, false);
