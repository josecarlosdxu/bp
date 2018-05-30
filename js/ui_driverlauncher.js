'use strict';

const DRIVER_CLOSE_TEXT = 'Cerrar';
const DRIVER_RESET_TEXT = 'No volver a preguntar';

const DRIVER_CLOSE_X = '<button class="driver-closebtn" title="' + DRIVER_CLOSE_TEXT + '">&#x1f7ac;</button>';
const DRIVER_CLOSE_BTN = '<div class="u-mgt--half"><button class="button button--condensed" title="' + DRIVER_CLOSE_TEXT + '">' + DRIVER_CLOSE_TEXT + '</button></div>';
const DRIVER_RESET_LABEL = '<label class="form-label form-label--inline u-mgv--half"><input class="form-checkbox" type="checkbox"><small>' + DRIVER_RESET_TEXT + '</small></label>';

const DRIVER_VIEWS_HIGHLIGHT_TITLE = '¿Cómo quiere ver los productos?' + DRIVER_CLOSE_X;
const DRIVER_VIEWS_HIGHLIGHT_DESCRIPTION = '<p>Puede elegir visualizarlos en mosaico o como un listado.</p>' + DRIVER_RESET_LABEL + DRIVER_CLOSE_BTN;


function getRenderedObj(scope, pattern) {
    return scope.querySelector(pattern);
}

function setDriverState(evt) {
    var propName = window.driverObj,
        isChecked = evt.currentTarget.checked ? localStorage.setItem(propName, propName) : localStorage.removeItem(propName);

}

function setDriverCloseListener(elem){
    var driverObj = this; 
     elem.addEventListener('click', function(){  driverObj.reset();  },false);
}

function getPopoverElems(driverObj) {
    var checkbox,
        btnsList,
        delay = 100,
        popoverElem = getRenderedObj(document, '#driver-popover-item'),
        popoverDescription = getRenderedObj(popoverElem, '.driver-popover-description'),
        interval = setInterval(function() {
            checkbox = getRenderedObj(popoverDescription, 'input[type="checkbox"]');
            if (checkbox) {
                clearInterval(interval);
                checkbox.addEventListener('change', setDriverState, false);
                [].slice.call(popoverElem.querySelectorAll('button')).map(setDriverCloseListener.bind(driverObj));
            }

        }, delay);
}

function hasDriverLocked(idElem, driverObjName) {
    return document.querySelector(idElem) && !localStorage.getItem(driverObjName);
}

function launchDriver(){


    const driverCategoryViews = new Driver({ padding: 5, opacity: 0.5 });
     
     if (hasDriverLocked('#id_driverviews', 'driverCategoryViews')) {
        driverCategoryViews.highlight({
            element: '#id_driverviews',
            popover: {
                title: DRIVER_VIEWS_HIGHLIGHT_TITLE,
                description: DRIVER_VIEWS_HIGHLIGHT_DESCRIPTION,
                position: 'left'
            }
        });
        if (driverCategoryViews.isActivated) {
            window.driverObj = 'driverCategoryViews';
            getPopoverElems(driverCategoryViews);
        }
    }



}


document.addEventListener("DOMContentLoaded", launchDriver, false);