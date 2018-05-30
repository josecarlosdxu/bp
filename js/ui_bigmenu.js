var bigMenu = {},
    opts = {       
        timeout: 0,
        interval: 100
    };
 

(function() {
    "use strict";
    var scope,
        activeCat,
        hideCategory = function(evt) {           
            var elm = evt.target;           
            if (elm.getAttribute('data-depth') === "1" && activeCat) {
                activeCat.classList.remove('active');
                activeCat = null;                
            }
        },

        showCategory = function(evt) {
            var elm = evt.currentTarget;
            evt.preventDefault();

            if (elm === activeCat) {
                return false;
            }
            if (activeCat) {
                activeCat.classList.remove('active');
            }
            elm.classList.add('active');
            activeCat = elm;
        },

        chargeImg = function(ev) {
            var el = ev.currentTarget;
            el.image.src = el.image.getAttribute('data-src');
            el.removeEventListener('mouseover', chargeImg);            
        },


        addCatHoverIntent = function(elem) {
            var hoverTo = hoverintent(elem, function(e) {
                if (this === activeCat) {
                return false;
            }
            if (activeCat) {
                activeCat.classList.remove('active');
            }
            this.classList.add('active');
            activeCat = this;
                e.preventDefault();
            }, function(e) {                
            }).options(opts);
        },

        resetCatHoverIntent = function(elem) {
            var hoverTo = hoverintent(elem, function(e) {             
            }, function(e) {
                if(!activeCat){
                   return false;
                }
                activeCat.classList.remove('active');
                activeCat = null;        
            }).options(opts);
        },

        setCategoryProps = function(el) {           
            el.image = el.querySelector('.bigMenu-imgcont[data-depth="1"] img');
            el.addEventListener('mouseover', chargeImg, false);
            addCatHoverIntent(el);  
        },

        setSubCategoryProps = function(el) {         
            el.image = el.nextElementSibling.children[0];
            el.addEventListener('mouseover', chargeImg, false);
        },

        setVals = function() {
            [].slice.call(document.querySelectorAll('.bigMenu-category')).map(setCategoryProps);
            [].slice.call(document.querySelectorAll('.bigMenu-item.nav-item[data-depth="2"]')).map(setSubCategoryProps);
            [].slice.call(document.querySelectorAll('.bigMenu-sections[data-depth="1"]')).map(resetCatHoverIntent);
        },

        init = function(elm) {
            scope = elm;
        };
    this.init = init;
    this.setVals = setVals;

}).apply(bigMenu);
window.addEventListener("load", bigMenu.setVals, false);
