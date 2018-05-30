var vTabs = {};
(function() {

    var userAgent,
        vTabsCont,
        heightsList,
        btnsList,
        interval,
        btnsListLen,
        delay = 2000,
        selectedIndex = 0,
        chromeTrumpHeight,
        vTabsContHeight = 0,
        tabPatt = 'data-js-tab',
        selectBtnClass = 'tabs-item--selected',
        panelSelClass = 'tabs-contentPanel--selected',
        vTabsContPatt = getPattern(tabPatt, 'vertical'),
        vPanelPatt = getPattern(tabPatt, 'panel'),

        selectSection = function(e) {
            var btn = e.target,
                panel = btn.panel,
                selectedbtn = vTabsCont.querySelector('.' + selectBtnClass) || false,
                panelSelected = vTabsCont.querySelector('.' + panelSelClass) || false;

            if (selectedbtn) {
                selectedbtn.classList.remove(selectBtnClass);
            }
            if (panelSelected) {
                panelSelected.classList.remove(panelSelClass);
            }
            btn.classList.add(selectBtnClass);
            panel.classList.add(panelSelClass);
            selectedIndex = btn.index;
            e.preventDefault();
        },

        setvTabsContMaxHeight = function(elem) {
            var elemHeight = Math.round(elem.offsetHeight);
            if (elemHeight > vTabsContHeight) {
                vTabsCont.style.minHeight = elemHeight + 10 + 'px';
                vTabsContHeight = elemHeight;
            }
            elem.style.height = vTabsContHeight + 10 + 'px';
        },

        setBtnProps = function(btn, index) {
            var idBtn = btn.getAttribute(tabPatt + '_idbutton');
            btn.index = index;
            btn.panel = vTabsCont.querySelector(getPattern(tabPatt + '_idpanel', idBtn));
            setvTabsContMaxHeight(btn.panel);
            btn.addEventListener('mouseover', selectSection, true);
            btn.addEventListener('click', selectSection, true);
        },

        autoEnable = function() {
            var selIndex = selectedIndex === btnsListLen ? 0 : selectedIndex += 1;
            btnsList[selIndex].click();
            selectedIndex = selIndex;
        },


        init = function() {
            vTabsCont = document.querySelector(vTabsContPatt) || false;
            if (!vTabsCont) {
                return false;
            }
            btnsList = [].slice.call(vTabsCont.querySelectorAll(getPattern(tabPatt, 'button')));
            btnsListLen = btnsList.length - 1;
            btnsList.map(setBtnProps);
            userAgent = navigator.userAgent;
            chromeTrumpHeight = userAgent.includes('Chrome') && userAgent.indexOf('Edge') < 0 ? 1 : 0;

            vTabsCont.addEventListener('mouseover', function() {
                var el = document.querySelector('[data-js-tab="button"]:focus') || false;
                clearInterval(interval);
                if (el) {
                    el.blur();
                }
            });


            vTabsCont.addEventListener('mouseout', function() {
                interval = setInterval(autoEnable, delay);
            });

            interval = setInterval(autoEnable, delay);

        };
    this.init = init;
}).apply(vTabs);
window.addEventListener("load", vTabs.init, false);