var searchElems = {},
    uncheck = function(elm) {
        elm.checked = false;
    },
    check = function(elm) {
        elm.checked = true;
    },
    /*setFocus= function(elem) {
        console.log(elem)
    },*/
    findNodeList = function(patt) {
        return document.querySelectorAll(patt);
    },
    setMapNodeList = function(patt, method) {
        Array.prototype.slice.call(findNodeList(patt)).map(method);
    };

(function() {
    var searchResults,
        labelShowCats,
        inputShowCats,
        selectCatNum,
        searchfield,
        searchTextVal,
        searchResultsLaunch,
        topSearchInput,
        searchForm,
        searchBtn,
        searchFieldListeners,
        elemsToFind,
        searchPatt = 'data-js-search',
        resetPatt = 'data-js-reset',
        minTextInputLen = 2,
        btnCatsText = 'Categorías',
        patt = 'data-js',
        radioMatch = 'search category radio',
        catSelAttrName = 'data-state',
        catSelAttrVal = 'selected',
        radioBtnspatt = getPattern(patt, radioMatch),

        togglePlaceholder = function(evt) {
            console.log(evt.type);

        },




        toggleResults = function(evt) {
            var openResults = searchResultsLaunch.checked && evt.type !== 'input';
            evt.preventDefault();
            searchResultsLaunch.checked = !openResults;
            inputShowCats.checked = openResults;
        },
        showResults = function(evt) {
            var type = evt.type,
                val = evt.target.value,
                len = val.length;
            evt.preventDefault();
            if (type === 'input' && len > minTextInputLen) {
                searchTextVal = val;
                toggleResults(evt);
                searchBtn.removeAttribute('disabled');
                inputShowCats.addEventListener('change', toggleResults);
                return;
            }
            searchBtn.setAttribute('disabled', 'true');
        },
        unSelectCategory = function() {
            var selectedElem = findElem(catSelAttrName, catSelAttrVal) || false;
            if (selectedElem) {
                selectedElem.removeAttribute(catSelAttrName);
            }
            labelShowCats.innerHTML = labelShowCats.defText;
        },
        selectCategory = function(evt) {
            searchfield.focus();
            selectCatNum = findNodeList(radioBtnspatt + ':checked').length;
            labelShowCats.innerHTML = selectCatNum > 0 ? '<b>' + btnCatsText + ' (' + selectCatNum + ')</b>' : labelShowCats.defText;

        },
        createSearchResultsLabel = function() {
            var labelFor = document.createElement('label');
            topSearchInput = findElems(getPattern('data-js-search_form') + ' input'),
                labelFor.setAttribute('for', 'searchResults-toggle');
            labelFor.setAttribute('class', 'searchResults-toggleLabel searchResults-toggleLabel--top');
            insertAfter(topSearchInput, labelFor);
        },
        setRadioListeners = function(elm) {
            uncheck(elm);
            elm.addEventListener('change', selectCategory);
        },

        resetSearchResults = function() {
            inputShowCats.removeEventListener('change', toggleResults);
            Array.prototype.slice.call(findElems(getPattern(resetPatt), true)).map(function(elm) {
                window[elm.getAttribute(resetPatt)](elm);
            });
            unSelectCategory();
            searchBtn.setAttribute('disabled', 'true');
            //searchTextVal = "";
            topSearchInput.value = searchfield.value;
        },
        closeSearchResults = function() {
            if (!searchResults.checked) {
                resetSearchResults();
                return false;
            }
            searchfield.focus();

        },
        setListeners = function() {
            topSearchInput.addEventListener('keypress', function(evt) {
                evt.preventDefault();
                searchResults.checked = true;
                searchfield.focus();
            });

            searchResults.addEventListener('change', closeSearchResults);
            searchForm.addEventListener('submit', function(evt) {
                closeSearchResults();
                evt.preventDefault();
            });

        },

        evalSearchTerms = function(evt) {
            var val = evt.target.value,
                len = val.length;
            evt.preventDefault();
            console.log(evt)
            //toggleResults(len > minTextInputLen);
        },

        searchFieldListeners = [
            { "event": "input", "method": evalSearchTerms },
            { "event": "focus", "method": togglePlaceholder },
            { "event": "blur", "method": togglePlaceholder }
        ],
        elemsToFind = [
            {
                "name": "searchfield",
                "patt": searchPatt,
                "val": "searchfield"
            }, {
                "name": "searchForm",
                "patt": searchPatt,
                "val": "form"
            }
        ],

        setElemListeners = function(obj) {
            this.addEventListener(obj.event, obj.method);
        },

        setParams = function() {
            labelShowCats.defText = labelShowCats.innerHTML;
            searchfield.defaultText = searchfield.placeholder;
            setMapNodeList(radioBtnspatt, setRadioListeners);
            createSearchResultsLabel();
            searchFieldListeners.map(setElemListeners.bind(searchfield));
            setListeners();
            resetSearchResults();
        },

        getElem = function(obj) {
            return this[obj.name] = findElem(obj.patt, obj.val);
        },

        getElems = function() {
            elemsToFind.map(getElem.bind(searchElems));
            searchfield = searchElems.searchfield;
            searchForm = searchElems.searchForm; 
            for (var e in searchElems) {
                if (e !== 'init') {
                    delete searchElems[e];
                }
            }
            searchFieldListeners.map(setElemListeners.bind(searchfield));

            //searchfield.style.outline="1px solid red";
            console.log(searchfield)
            console.log(searchForm)


            /*searchfield = findElem(searchPatt, 'searchfield');
            if (!searchfield) return false;
            searchForm = findElem(searchPatt, 'form');
            labelShowCats = findElem(patt, 'label showcategories');
            inputShowCats = findElem(patt, 'input showcategories');
            searchBtn = findElem(searchPatt, 'button');
            searchResultsLaunch = document.getElementById('searchResultsLaunch');
            setParams();*/
        };



    this.init = function() {
        var flag,
            sentence = 'no está el elemento cargado en el layout - probar en front/categoria-moda.html';
        searchResults = findElem(searchPatt, 'launch');
        flag = searchResults ? getElems() : console.log(sentence);

    };

}).apply(searchElems);
window.addEventListener('load', searchElems.init, false);
