var filters = {},

    uiFilterObj = {
        start: [0, 2500],
        connect: true,
        range: {
            'min': 0,
            'max': 10000
        }
    };

(function() {
    "use strict";
    var html5Slider,
        rangeFilterLow,
        rangeFilterHigh,
        closeLabel,
        filtersChecksList = [],
        filtersState = {
            'idFilter': null
        },
        patt = 'data-js-filter',

        getPatt = function(match) {
            return '[' + patt + '="' + match + '"]';
        },

        toggleFilter = function(elem) {
            var method = elem.id === this ? 'remove' : 'add';
            elem.filterElem.classList[method]('filter-deactivate');
        },

        closeFilters = function(evt) {
            closeLabel.setAttribute('data-active', false);
            filtersChecksList.map(toggleFilter.bind(null));
            if (filtersState.idFilter) {
                document.getElementById(filtersState.idFilter).checked = false;
                filtersState.idFilter = null;
            }
            evt.preventDefault();
        },

        activeFilter = function(evt) {
            var input = evt.currentTarget;
            if (filtersState.idFilter && filtersState.idFilter !== input.id) {
                document.getElementById(filtersState.idFilter).checked = false;
                filtersState.idFilter = null;
            }
            filtersState.idFilter = input.id;
            closeLabel.setAttribute('data-active', input.checked);
            filtersChecksList.map(toggleFilter.bind(input.id));
        },

        initHTML5Slider = function() {
            html5Slider = document.getElementById('html5range');
            rangeFilterLow = document.getElementById('rangeFilterLow');
            rangeFilterHigh = document.getElementById('rangeFilterHigh');
            noUiSlider.create(html5Slider, uiFilterObj);
            html5Slider.noUiSlider.on('update', function(values, handle) {
                var value = values[handle];
                if (handle) {
                    if (rangeFilterHigh.nodeName == "INPUT")
                        rangeFilterHigh.value = Math.round(value);
                    else
                        rangeFilterHigh.innerHTML = Math.round(value);
                } else {
                    if (rangeFilterHigh.nodeName == "INPUT")
                        rangeFilterLow.value = Math.round(value);
                    else
                        rangeFilterLow.innerHTML = Math.round(value);
                }
            });
            rangeFilterLow.addEventListener('change', function(e) {
                html5Slider.noUiSlider.set([this.value, null]);
                e.preventDefault();
                e.stopPropagation();
                return false;

            });

            rangeFilterHigh.addEventListener('change', function(e) {
                html5Slider.noUiSlider.set([null, this.value]);
                e.preventDefault();
                e.stopPropagation();
                return false;
            });

            rangeFilterLow.addEventListener('input',function(e) {
                e.preventDefault();
                e.stopPropagation();
                return false;

            });
            rangeFilterHigh.addEventListener('input', function(e) {
                e.preventDefault();
                e.stopPropagation();
                return false;

            });

        },

        getFilter = function(elem) {
            var input = elem.querySelector(getPatt('checkbox')),
                btn = elem.querySelector(getPatt('apply'));
            input.checked = false;
            input.filterElem = elem;
            input.addEventListener('click', activeFilter);
            btn.addEventListener('click', closeFilters);
            filtersChecksList.push(input);
            if (elem.children[0].id === "pricesRangeId") {
                initHTML5Slider();
            }
        },

        init = function() {
            closeLabel = document.querySelector(getPatt('label'));
            if (document.querySelector('.mobileHeader')) {
                initHTML5Slider();
            }
            if (closeLabel) {
                closeLabel.addEventListener('click', closeFilters);
                [].slice.call(document.querySelectorAll(getPatt('filter'))).map(getFilter);
            }
        };

    this.init = init;
    this.closeFilters = closeFilters;



}).apply(filters);
window.addEventListener("load", filters.init, false);

