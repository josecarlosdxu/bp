var mobileCats = {};

(function() {

    var patt = 'data-js',
        catPatt = 'mobileCategory',
        subCatPatt = 'mobileFamily',
        familiesListPatt = 'mobileFamilies',
        btnCatPatt = 'openMobileCategory',
        btnFamilyPatt = 'openMobileSubCategory',
        //selectedClass = 'cardElem--selected',
        eventCloseCatType = 'closeMobileCats',
        homeCatPatt = 'homeCategories',
        famListPatt = getPattern(patt, familiesListPatt),
        catPatt = getPattern(patt, catPatt),
        catBtnsPatt = getPattern(patt, btnCatPatt),
        famCatPatt = getPattern(patt, subCatPatt),
        famBtnsPatt = getPattern(patt, btnFamilyPatt),

        resetSelected = function(btn) {
            var scope = btn.scope,
                context = btn.context,
                selectedClass = btn.selectedClass,
                selectedElem = scope.querySelector('.'+selectedClass);                
                if(selectedElem && selectedElem !== context){
                     removeClass(selectedElem,selectedClass); 
                }
        },

        toggleSelected = function(evt) {
            var btn = evt.target,              
                scope = btn.scope;
                selectedClass = btn.selectedClass,
                context = btn.context;               
                resetSelected(btn);
                toggleClass(context,selectedClass); 

        },
        setListeners = function(btn) {            
            btn.patt = btn.getAttribute(patt);
            btn.selectedClass = btn.patt === btnCatPatt ? 'cardElem--selected' : 'families-item--selected';
            btn.context = btn.parentNode;
            btn.scope = btn.patt === btnCatPatt ? findElem(patt, homeCatPatt) : btn.context.parentNode;
            btn.addEventListener('click', toggleSelected,true);
        },

        getElems = function(patt, method) {
            var list = document.querySelectorAll(patt),
                len = list.length;
            try {
                if (len === 0) throw 'noExist';
            } catch (e) {
                if (e == 'noExist') //console.log('List length = 0: ' + e);
                return false;
            }
            len--;
            while (len > -1) {
                method(list[len]);
                len--;
            }
        };   

    this.init = function() {      
        getElems(catBtnsPatt, setListeners);
        getElems(famBtnsPatt, setListeners);
    };

}).apply(mobileCats);
window.addEventListener('load', mobileCats.init, false);
