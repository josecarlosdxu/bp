var uSticky = {};

//top limit


//data-js-sticky="menu"
//data-js-sticky="container"

//data-js-sticky="content"




// var viewportOffset = el.getBoundingClientRect();
// // these are relative to the viewport, i.e. the window
// var top = viewportOffset.top;
// var left = viewportOffset.left;

//<a href="#section_0" class="nav-item" data-state="selected" data-js-sticky="target_0">Tienda Dropshipping sincronizada</a>




(function() {

    "use strict";
    var stickyMenu,
        stickyContainerTop,
        stickyContent,
        selectedLink,
        mHeight,
        sections,
        lockedScrollDetection = false,
        patt = 'data-js-sticky',
        linkPatt = getPattInitFrom(patt, 'target'),
        sectionPatt = getPattInitFrom(patt, 'section'),
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

            var elem,
                i = 0,
                len = sections.length,
                scrolly = window.scrollY;
            for (i; i < len; i++) {
                elem = sections[i];
                if (scrolly > elem.toplimit - 50 && scrolly < elem.toplimit + elem.height / 2 - 50) {
                    checkAnchorState(elem.link);
                }

            }


        },



        setAnchorState = function(evt) {
            var timeout,
                elem = evt.target,
                windowTop = elem.section.toplimit;
            evt.preventDefault();
            checkAnchorState(elem);
            lockedScrollDetection = true;
            window.scrollTo({ top: windowTop, left: 0, behavior: 'smooth' });
            timeout = setTimeout(function() {
                clearTimeout(timeout);
                lockedScrollDetection = false;
            }, 1000);

        },


        getElemSection = function(elem) {
            var index = elem.index,
                sectionId = 'section_' + index,
                section = stickyContent.querySelector(getPattern(patt, sectionId));
            section.toplimit = section.offsetTop + stickyContainerTop;
            section.height = section.getBoundingClientRect().height;
            section.link = elem;
            sections.push(section);
            return section;
        },

        setAnchorProps = function(elem) {
            var elemSection,
                index = arguments[1];
            elem.index = index;
            elem.section = getElemSection(elem);
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
            mHeight = stickyMenu.getBoundingClientRect().height;
            window.addEventListener("scroll", setMenuState, false);
            //setMenuState();

        },
        getContainerState = function() {
            sections = [];
            stickyContent = document.querySelector(getPattern(patt, "content"));
            stickyContainerTop = document.querySelector(getPattern(patt, "container")).offsetTop;
            getMenuState();
        },



        init = function() {
            stickyMenu = document.querySelector(getPattern(patt, "menu"));
            if (stickyMenu) {
                getContainerState();
            }

        };

    this.init = init;
}).apply(uSticky);
window.addEventListener("load", uSticky.init, false);

// function findPos(node) {
//     var curtop = 0;
//     var curtopscroll = 0;
//     if (node.offsetParent) {
//         do {
//             curtop += node.offsetTop;
//             curtopscroll += node.offsetParent ? node.offsetParent.scrollTop : 0;
//         } while (node = node.offsetParent);

//         return (curtop - curtopscroll);
//     }
// }



function