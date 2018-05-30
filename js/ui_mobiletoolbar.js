var mobileToolbar = (function(window, undefined) {
    "use strict";
    var pageItem,
        toolbarItem,
        toolbarItemClass,

        toolbarItemClassName = 'data-js-selClass',
        toolbarItemMatch = 'data-js-btn',
        pageItemMatch = 'data-js-selectedItem',
        navGroupSelMatch = 'data-js-navgroupSel',
        navGroupsMatch = 'data-js-navgroup',
        navGroupsHideClass ='mobileToolbar-navgroup--hide',

        notElemFound = function() {
            //console.log(this);
        },

        toggleDisplayNavgroups = function(){
            var navGroupElem,
            navGroupList = document.querySelectorAll(getPattern(navGroupsMatch,'default')),
            navGroupFiltersElem = findElem(navGroupsMatch,'filters'),
            len = navGroupList.length,
            i = 0;
            for ( i; i<len; i++) {
                navGroupElem = navGroupList[i];
                addClass(navGroupElem, navGroupsHideClass);
            }
            removeClass(navGroupFiltersElem, navGroupsHideClass);
            navGroupElem = navGroupList = navGroupFiltersElem = len = i = null;
        },
        toolbarItemSetClass = function() {
            toolbarItemClass = toolbarItem.getAttribute(toolbarItemClassName);
            addClass(toolbarItem, toolbarItemClass);
        },
        checkToolbarItem = function() {
            var hasToolbarItem,
                toolbarItemName = pageItem.getAttribute(pageItemMatch);
            toolbarItem = findElem(toolbarItemMatch, toolbarItemName) || null;
            hasToolbarItem = toolbarItem ? toolbarItemSetClass() : notElemFound.apply('Toolbar Elem not Found');
        },
        checkPageItem = function() {
            var hasPageItem;
            pageItem = findElem(pageItemMatch) || null;
            hasPageItem = pageItem ? checkToolbarItem() : notElemFound.apply('page Not Select Toolbar Elem');
        },
        checkDisplayNavgroups = function() {
             var hasNavGroupAction = findElem(navGroupSelMatch) ? toggleDisplayNavgroups() : notElemFound.apply('page Not hasNavGroupAction');
        },
        init = function() {
            checkPageItem();
            //checkDisplayNavgroups();
        };
    return {
        init: init
    };
})(window);

