var bigMenu = {},
    opts = {
        timeout: 10,
        interval: 350
    },
    bigMenuItem = function() {},
    setMenuProps = function(list, len, func) {
        var elem;
        while (len > -1) {
            elem = list[len];
            func.apply(null, [elem]);
            len--;
        }
        elem = null;
    },
    getMenuElems = function() {
        var patt = arguments[0],
            func = arguments[1],
            itemFunc = arguments[2],
            list = this.querySelectorAll(patt),
            len = list.length;
        if (len === 0) {
            list = len = null;
            return false;
        }
        len -= 1;
        func.apply(null, [list, len, itemFunc]);
        list = len = func = null;
    };

(function() {
    "use strict";
    var scope,
        doc,
        bigMenuSections,
        sectionViewed,
        principalSection,
        FixedSectionItem,
        ExpectedSectionItem,
        activePanel,
        hasSubsection,
        subsectionElem,
        sectionsNav,
        bigmenuPatt = 'data-js-bigmenu',
        bigMenuSectionsPatt = '.bigMenu-sections',
        patternMatch = '.bigMenu-sectionItem',
        itemsPatt = ".bigMenu-item",
        itemActiveClass = 'bigMenu-item--active',
        attibuteName = bigmenuPatt + '-section',
        panelPattern = bigmenuPatt + '-panel',
        sectionItemSelectedClass = 'bigMenu-sectionItem--submenuSelected',
        panelShowClass = 'bigMenu-subSections--show',
        principalShowClass = 'bigMenu-categorySection--show',
        principalSectionPatt = 'principal',
        principalPatt = getPattern(bigmenuPatt, principalSectionPatt),
        menuItemImagePatt = 'data-js-image',
        bigMenuHasSubSectionAttr = bigmenuPatt + '-subsection',
        subsectionImageSecundaryClass = 'bigMenu-subsectionImage--secundary',
        itemEventType = 'mouseover',
        itemEventTypeOut = 'mouseout',
        showPrincipal = function(show) {
            var method = show ? addClass : removeClass,
                elem = principalSection,
                cls = principalShowClass;
            method.apply(null, [elem, cls]);
            method = elem = cls = null;
        },
        resetPanelImage = function() {
            var panelImg,
                imgDefault;
            if (activePanel) {
                panelImg = activePanel.image;
                imgDefault = activePanel.imgSrcDefault;
                removeClass(panelImg, subsectionImageSecundaryClass);
                panelImg.setAttribute('src', imgDefault);
            }
            if (scope.selectItem) {
                removeClass(scope.selectItem, itemActiveClass);
            }
        },
        checkPanelTarget = function(evt) {
            var timeout,
                target = evt.target,
                relatedTarget = evt.relatedTarget,
                isTitle = Boolean(hasClass(relatedTarget, 'bigMenu-subcategoryTitle')),
                isPanel = Boolean(hasClass(relatedTarget, 'bigMenu-subSections--show'));
            preventEvent(evt);
            timeout = setTimeout(function() {
                checkTarget(evt);
                clearTimeout(timeout);
            }, 200);
            if (isPanel || isTitle) {
                resetPanelImage();
            }
        },
        changePanelImage = function(evt) {
            var item = evt.target,
                panel = item.panel,
                panelImg = panel.image,
                srcImage = item.image || panel.imgSrcDefault;
            preventEvent(evt);
            addClass(item, itemActiveClass);
            addClass(panelImg, subsectionImageSecundaryClass);
            panelImg.setAttribute('src', srcImage);
            activePanel = panel;
            if (scope.selectItem) {
                removeClass(scope.selectItem, itemActiveClass);
            }
            scope.selectItem = item;
        },
        setMenuItemListeners = function(menuItem) { /// subcategories
            var panel = getParents(menuItem, '[data-js-bigmenu-panel]')[0],
                image = menuItem.getAttribute(menuItemImagePatt) || false,
                panelImage = panel.querySelector('.bigMenu-subsectionImage') || false,
                panelNav = menuItem.parentNode;
            if (panelImage) {
                panel.image = panelImage;
                panel.imgSrcDefault = panelImage.getAttribute('src');
            }
            if (!panelNav.eventNotAdded) {
                panelNav.eventNotAdded = true;
                $(panelNav).hoverIntent(checkPanelTarget);


                //hoverintent(panelNav, function(evt) {}, checkPanelTarget);
            }
            menuItem.image = image;
            menuItem.panel = panel;
            //hoverintent(menuItem, changePanelImage, checkPanelTarget);

            $(menuItem).hoverIntent(changePanelImage, checkPanelTarget);



            // hoverintent(menuItem, changePanelImage, checkPanelTarget);
        },
        hideSection = function() {
            if (FixedSectionItem) {
                removeClass(FixedSectionItem, sectionItemSelectedClass);
                removeClass(sectionViewed, panelShowClass);
                FixedSectionItem = null;
            }
            resetPanelImage();
        },
        showSection = function() {
            hideSection();
            showPrincipal(false);
            FixedSectionItem = ExpectedSectionItem;
            addClass(FixedSectionItem, sectionItemSelectedClass);
            sectionViewed = FixedSectionItem.section;
            addClass(sectionViewed, panelShowClass);
            //$('.bigMenu-subSections--show .lazy').lazyload().trigger('appear');
        },
        selectSection = function(evt) {
            ExpectedSectionItem = evt.target;
            showSection();
        },
        setListeners = function(elem) {
            var idVal = elem.getAttribute(attibuteName),
                menuItem = scope[idVal] || false;
            elem.section = scope.querySelector(getPattern(panelPattern, idVal)) || false;
            if (!menuItem) {
                scope[idVal] = new bigMenuItem();
                menuItem = scope[idVal];
            }
            //hoverintent(elem, function() {
            //elem.dispatchEvent(eventBuilder('changeSectionEvent'));
            //}, function() {}).options(opts);

            $(elem).hoverIntent(function() {
                elem.dispatchEvent(eventBuilder('changeSectionEvent'));
            });
            //}, function() {}).options(opts);





            idVal = menuItem = null;
        },

        checkTarget = function(evt) {
            preventEvent(evt);
            if (evt.relatedTarget === bigMenuSections) {
                resetMenuProps();
            }
        },
        resetMenuProps = function() {
            if (!principalSection) {
                principalSection = scope.querySelector(principalPatt) || false;
            }
            hideSection();
            showPrincipal(true);
            if (hasSubsection) {
                subsectionElem.dispatchEvent(eventBuilder('changeSectionEvent'));
            }
        },

        getBigMenuSections = function() { //// Section categories list
            bigMenuSections = scope.querySelector(bigMenuSectionsPatt) || false;
            if (!bigMenuSections) {
                console.log('bigMenuSections fail')
                return false;
            }
            sectionsNav = bigMenuSections.querySelector('.nav.nav--dropdown');
            addEventHandler(scope, 'changeSectionEvent', selectSection);

        },
        getElems = function() {
            principalSection = scope.querySelector(principalPatt) || false;
            getBigMenuSections();
            getMenuElems.apply(scope, [patternMatch, setMenuProps, setListeners]);
            getMenuElems.apply(scope, [itemsPatt, setMenuProps, setMenuItemListeners]);
            resetMenuProps();
        };

    this.init = function(elm) {
       /* scope = elm;
        hasSubsection = elm.getAttribute(bigMenuHasSubSectionAttr) || false;
        if (hasSubsection) {
            subsectionElem = scope.querySelector('[' + attibuteName + '="' + hasSubsection + '"]');
        }
        getElems();*/
    };

}).apply(bigMenu);
bigMenuItem.prototype = new EventDispatcher();
