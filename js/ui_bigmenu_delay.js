var bigMenuDelay = {};
(function() {
    "use strict";
    var scope,
        doc,
        defaultItem,
        bigMenuSections,
        navDropdown,
        sectionViewed,
        principalSection,
        FixedSectionItem,
        ExpectedSectionItem,
        activePanel,
        hasSubsection,
        delay = 500,
        scopeSectionPatt = 'data-js-bigmenu-subsection',
        sectionItemPatt = 'data-js-bigmenu-section',
        itemSelectedClass = 'bigMenu-sectionItem--submenuSelected',
        bigmenuPatt = 'data-js-bigmenu',
        bigMenuSectionsPatt = '.bigMenu-sections',
        navDropdownPatt = '.nav--dropdown',
        patternMatch = '.bigMenu-sectionItem',
        itemsPatt = ".bigMenu-item",
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
        },

        checkPanelTarget = function(evt) {
            var trgt = evt.target,
                panel = evt.currentTarget,
                panelImg = panel.image,
                imgDefault = panel.imgSrcDefault,
                isTitle = Boolean(hasClass(trgt, 'bigMenu-subcategoryTitle'));
            if (trgt === panel || isTitle) {
                resetPanelImage();
            }
        },

        changePanelImage = function(evt) {
            var item = evt.currentTarget,
                panel = item.panel,
                panelImg = panel.image,
                srcImage = item.image || panel.imgSrcDefault;
            addClass(panelImg, subsectionImageSecundaryClass);
            panelImg.setAttribute('src', srcImage);
            activePanel = panel;
        },
        setMenuItemListeners = function(menuItem) { /// subcategories
            var panel = getParents(menuItem, '[data-js-bigmenu-panel]')[0],
                image = menuItem.getAttribute(menuItemImagePatt) || false,
                panelImage = panel.querySelector('.bigMenu-subsectionImage') || false;
            if (panelImage) {
                panel.image = panelImage;
                panel.imgSrcDefault = panelImage.getAttribute('src');
            }
            menuItem.image = image;
            menuItem.panel = panel;
            bindElemHandler.apply(menuItem, [changePanelImage, itemEventType]);
            bindElemHandler.apply(panel, [checkPanelTarget, itemEventType]);
            panel = image = panelImage = null;
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
        },
        resetDelay = function() {
            window.clearTimeout(window.delay);
            window.delay = null;
        },
        checkSelected = function() {
            if(ExpectedSectionItem !== FixedSectionItem){
                showSection();
            }
            resetDelay();
        },
        delayInit = function(evt) {
            if (!window.delay) {
                window.delay = window.setTimeout(checkSelected, delay);
            }
        },
        selectSection = function(evt) {
            ExpectedSectionItem = evt.target;
            delayInit();
        },
        setListeners = function(elem) {
            var idVal = elem.getAttribute(attibuteName),
                menuItemObject = bigMenuItem,
                menuItem = scope[idVal] || false;
            elem.section = scope.querySelector(getPattern(panelPattern, idVal)) || false;
            if (!menuItem) {
                scope[idVal] = elem;
                menuItem = scope[idVal];
            }
            addEventHandler(menuItem, itemEventType, selectSection);
            idVal = menuItem = null;
        },

        checkTarget = function(evt) {
            if (evt.target === bigMenuSections) {
                resetMenuProps();
            }
        },
        resetMenuProps = function() {
            if (!principalSection) {
                principalSection = scope.querySelector(principalPatt) || false;
            }
            hideSection();
            showPrincipal(true);
        },
        getBigMenuSections = function() {
            bigMenuSections = scope.querySelector(bigMenuSectionsPatt) || false;
            navDropdown = scope.querySelector(navDropdownPatt) || false;
            if (!bigMenuSections) {
                console.log('bigMenuSections fail')
                return false;
            }

            addEventHandler(bigMenuSections, itemEventType, checkTarget);
            resetMenuProps();
        },

        setDefaultSection = function() {
            if (window.delay) {
                resetDelay();
            }
            defaultItem = scope[hasSubsection];
            ExpectedSectionItem = defaultItem;
            showSection();
        },
        getElems = function() {
            principalSection = scope.querySelector(principalPatt) || false;
            getBigMenuSections();
            getMenuElems.apply(scope, [patternMatch, setMenuProps, setListeners]);
            getMenuElems.apply(scope, [itemsPatt, setMenuProps, setMenuItemListeners]);
            setDefaultSection();
        };

    this.init = function(elm, hasSub) {
        scope = elm;
        hasSubsection = hasSub;
        //getElems();
    };

}).apply(bigMenuDelay);


