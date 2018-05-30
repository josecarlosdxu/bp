var mainMenu = {};
(function() {
    "use strict";
    var activeLink,
        activeMenu,
        body,
        homeItem,
        hamburguerItem,
        defaultPanel,
        defaultLink,
        doc = document.documentElement,
        pattern = 'data-js-mainnav',
        selLinkClass = 'mainNav-link--selected',
        selMenuClass = 'bigMenu--active',
        bodyState = 'focus',
        getItems = function(patt, method, target) {
            var elem,
                count = 0,
                trg = target || doc,
                list = trg.querySelectorAll(patt),
                len = list.length;
            try {
                if (len === 0) throw 'noExist';
            } catch (e) {
                if (e == 'noExist') console.log('List length = 0: ' + e);
                return false;
            }
            while (count < len) {
                elem = list[count];
                method(elem);
                count++;
            }
        },
        toggleBodyBlur = function(defocus) {
            var blur = defocus || false,
                classToAdd = blur ? 'blur' : 'focus',
                classToRemove = blur ? 'focus' : 'blur';
            if (classToAdd !== bodyState) {
                addClass(body, classToAdd);
                removeClass(body, classToRemove);
                bodyState = classToAdd;
            }
        },
        closeActivePanel = function() {
            toggleMenuPanel(defaultPanel);
            removeClass(activeLink, selLinkClass);
            removeEventHandler(doc, 'mouseover', hidePanel);
            toggleBodyBlur();
            resetElems();
        },
        hidePanel = function(e) {
            var evt = e || document.createEvent('Event'),
                trgt = evt.target || body,
                notMainnav = !getParents(trgt, '[data-js-mainnav="menu"]');
            if (trgt === body || notMainnav === true) {
                closeActivePanel();
            }
        },
        toggleMenuPanel = function(panel) {
            removeClass(activeMenu, selMenuClass);
            addClass(panel, selMenuClass);
            activeMenu = panel;
        },
        toggleLink = function(evt) {

            //console.log(evt)
            var elem = evt.target,
                panel = elem.panel,
                hasDefaultPanel = panel === defaultPanel,
                isActiveLink = activeLink === elem;
            if (isActiveLink) {
                return false;
            }
            preventEvent(evt);
            removeClass(activeLink, selLinkClass);
            activeLink = elem;
            toggleMenuPanel(panel);
            if (!hasDefaultPanel) {
                addClass(elem, selLinkClass);
                addEventHandler(doc, 'mouseover', hidePanel);
                toggleBodyBlur(true);
                bigMenu.init(panel);
                return false;
            }
            hidePanel(); //*/

        },
        setLinkProps = function(elem) {
            var nextElem = elem.nextElementSibling || false,
                findPanelElem = nextElem && hasClass(elem.nextElementSibling, "bigMenu") && true;
            elem.panel = findPanelElem ? nextElem : defaultPanel;
            $(elem).hoverIntent(toggleLink);
            // hoverintent(elem, toggleLink, function() {});
            //addEventHandler(elem, 'mouseover', toggleLink);
        },
        resetElems = function() {
            activeLink = defaultLink;
            activeMenu = defaultPanel;
        },
        resetProps = function(topMenu) {
            resetElems();
            getItems(getPattern(pattern, 'link'), setLinkProps, topMenu);
        },
        setDefaultValues = function() {
            defaultPanel = createNewElem(selMenuClass);
            defaultLink = createNewElem(selLinkClass);
            body = document.body;
            homeItem = document.querySelectorAll('[data-js-mainnav="item"]')[0];
            hamburguerItem = document.querySelector('[data-js-directory]') || createNewElem();
            setLinkProps(homeItem);
            setLinkProps(hamburguerItem);
        },
        getTopMenus = function() {
            setDefaultValues();
            getItems(getPattern(pattern, 'menu'), resetProps, doc);

        };
    this.init = function() {
        if (document.querySelectorAll(getPattern(pattern)).length > 0) {
            getTopMenus();
        }
    };

}).apply(mainMenu);
window.addEventListener('load', mainMenu.init, false);