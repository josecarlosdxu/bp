var uSticky = {};

(function() {

    "use strict";
    var stickyMenu,
        stickyContainerTop,
        stickyContent,
        selectedLink,
        mHeight,
        sections,
        linkPatt,
        sectionPatt,

        lockedScrollDetection = false,

        delayScrollDetection = 1000,
        patt = 'data-js-sticky',

        topLimit = 162,
        linkStateAttr = 'data-state',
        linkStateSelected = 'selected',

        getPattInitFrom = function(patt, match) {
            var str = '[' + patt + '*="' + match + '"]';
            return str;

        },


        checkAnchorState = function(elem) {
            if (selectedLink !== elem) {
                selectedLink.removeAttribute(linkStateAttr);
                elem.setAttribute(linkStateAttr, linkStateSelected);
                selectedLink = elem;
            }
        },

        setSectionState = function() {
            var conditionOK, scrolly = window.scrollY;
            sections.map(function(elem) {
                conditionOK = scrolly > elem.toplimit - 50 && scrolly < elem.toplimit + elem.height / 2 - 50;
                if (conditionOK) {
                    checkAnchorState(elem.link);
                }
            });

        },

        delayedScrollDetection = function() {
            var timeout = setTimeout(function() {
                clearTimeout(timeout);
                lockedScrollDetection = false;
            }, delayScrollDetection);

            lockedScrollDetection = true;
        },

        setAnchorState = function(evt) {
            var elem = evt.target,
                windowTop = elem.section.toplimit;
            evt.preventDefault();
            checkAnchorState(elem);
            window.scrollTo({ top: windowTop, left: 0, behavior: 'smooth' });
            delayedScrollDetection();
        },

        setSectionProps = function(section) {
            section.toplimit = section.offsetTop + stickyContainerTop;
            section.height = section.getBoundingClientRect().height;            
            sections.push(section);
        },

        getElemSection = function(elem) {
            var sectionId = 'section_' + elem.getAttribute(patt).replace('target_', ''),
                section = stickyContent.querySelector(getPattern(patt, sectionId));
                section.link = elem;
            return section;
        },

        setAnchorProps = function(elem) {
            var elemSection,
                index = arguments[1];
            elem.section = getElemSection(elem);
            setSectionProps(elem.section);
            if (elem.hasAttribute(linkStateAttr)) {
                selectedLink = elem;
            }
            elem.addEventListener("click", setAnchorState, false);
        },

        setMenuState = function() {
            var viewportOffset = stickyContent.getBoundingClientRect(),
                topPos = viewportOffset.top,
                cHeight = viewportOffset.height,
                diffPos = (cHeight + topPos) - topLimit;

            if (topPos < topLimit && diffPos > mHeight) {
                stickyMenu.style.position = "fixed";
                stickyMenu.style.bottom = "auto";
                stickyMenu.style.top = topLimit + "px";
            }

            if (topPos > topLimit) {
                stickyMenu.removeAttribute('style');
            }

            if (topPos < topLimit && diffPos < mHeight) {
                stickyMenu.style.position = "absolute";
                stickyMenu.style.top = "auto";
                stickyMenu.style.bottom = "0";
            }

            if (!lockedScrollDetection) {
                setSectionState();
            }
        },

        getMenuState = function() {
            [].slice.call(stickyMenu.querySelectorAll(linkPatt)).map(setAnchorProps);
            window.addEventListener("scroll", setMenuState, false);

        },
        getContainerState = function() {
            stickyContent = document.querySelector(getPattern(patt, "content"));
            stickyContainerTop = document.querySelector(getPattern(patt, "container")).offsetTop;
            getMenuState();
        },

        setVars = function() {
            linkPatt = getPattInitFrom(patt, 'target');
            sectionPatt = getPattInitFrom(patt, 'section');
            mHeight = stickyMenu.getBoundingClientRect().height;
            sections = [];
            getContainerState();
        },

        init = function() {
            stickyMenu = document.querySelector(getPattern(patt, "menu"));
            if (stickyMenu) {
                setVars();

            }

        };

    this.init = init;
}).apply(uSticky);
window.addEventListener("load", uSticky.init, false);