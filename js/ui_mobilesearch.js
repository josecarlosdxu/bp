var mobileSearch = {};
(function() {
    var searchField,
        searchBar,
        launchBtn,
        searchBtn,
        closeBtn,
        searchForm,
        searchSubmitBtn,
        minTextInputLen = 2,
        state = {
            'mobile': false,
            'showed': false
        },

        searchPatt = 'data-js-search',
        activeAttr = 'data-js-active',
        showedAttr = 'data-js-show',
        formPattVal = 'searchForm',
        searchBtnPattVal = 'searchBtn',

        resetValues = function() {
            searchBtn.disabled = true;
            searchField.value = "";
           // searchField.focus();
        },

        closeSearch = function(event) {
            var evt = event || document.createEvent('Event');
            evt.preventDefault();
            resetValues();
            hideResults(true);
            hideMobileSearch();

            

        },

        hideMobileSearch = function() {
            hideResults();
            if (state.mobile) {
                searchBar.removeAttribute(showedAttr);
                state.mobile = false;
                mobileLock.unlock();
            }

        },

        showMobileSearch = function(evt) {
            evt.preventDefault();
            searchBar.setAttribute(showedAttr, '');
            resetValues();
            state.mobile = true;
            mobileLock.lock(searchBar, hideMobileSearch, 200);
        },

        enableSearchBtn = function(enable) {
            searchBtn.disabled = !enable;
        },

        showResults = function() {
            searchBar.setAttribute(activeAttr, '');
            state.showed = true;
            enableSearchBtn(true);
            if (!state.mobile) {
                mobileLock.lock(searchBar, hideResults, 200);
            }
        },

        hideResults = function(arg) {
            searchBar.removeAttribute(activeAttr);
            state.showed = false;
            enableSearchBtn(false);
            if (!state.mobile && arg) {
                mobileLock.unlock();
            }
        },

        toggleResults = function(showed) {
            if (showed) {
                document.documentElement.dispatchEvent(new CustomEvent('mobilesearch'));
            }

            if (showed && !state.showed) {
                showResults();
                return false;
            }

            if (!showed && state.showed) {
                hideResults(true);
            }

        },

        evalSearchTerms = function(evt) {
            var val = evt.target.value,
                len = val.length;
            evt.preventDefault();
            toggleResults(len > minTextInputLen);
        },


        submitForm = function(evt) {
            evt.preventDefault();
            closeSearch();
            document.documentElement.dispatchEvent(new CustomEvent('mobilesearchsubmit'));
            // TODO
            // TODO pasar parámetros del formulario en el evento  

        },

       
        setListeners = function() {
            searchField.addEventListener('input', evalSearchTerms);
            launchBtn.addEventListener('click', showMobileSearch);
            closeBtn.addEventListener('click', closeSearch);            
            searchForm.addEventListener('submit', submitForm);
            searchSubmitBtn.addEventListener('click', submitForm);
           
        },

        getElems = function() {
            searchBtn = findElem(searchPatt, 'searchBtn');
              if (!searchBtn) {
                return false;
            }
            searchForm = findElem(searchPatt, formPattVal);           
            searchField = findElem(searchPatt, 'searchField');
            searchBar = findElem(searchPatt, 'searchBar');           
            launchBtn = findElem(searchPatt, 'launchBtn');  
            closeBtn = findElem(searchPatt, 'close');
            searchSubmitBtn = findElem(searchPatt, 'submit');
            resetValues();
            setListeners();

        };

    this.init = function() {
        getElems();
    };

}).apply(mobileSearch);
window.addEventListener('load', mobileSearch.init, false);

// EVENT LISTENERS EXSAMPLES
//document.documentElement.addEventListener('mobilesearch', function(e) { alert(e); }, false);
//document.documentElement.addEventListener('mobilesearchsubmit', function(e) { alert('search mobile form is submitted'); }, false);
