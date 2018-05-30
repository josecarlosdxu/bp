// slides [0, elem0,elem1...]
// slidesLen=0
// slidesLoaded=0
// steps  [0, elem0W,elem0W+elem1W...]
// contW=Number
// slidesW=Number
// slidesLoadedComplete= false

// load images to defined width

var uiHSlider = {};

(function() {
    var patt = 'data-jsslider',
        getSliderElems = function(cont) {
            var sliderH = new HSlider();
            sliderH.init(cont, patt);
        },
        hasSliders = function() {
            var slidersH = doc.querySelectorAll(getPattern(patt, 'cont'));
            if (slidersH.length > 0) {
                [].slice.call(slidersH).map(getSliderElems);
            }
        };
    this.init = function() {
        hasSliders();
    };
}).apply(uiHSlider);
window.addEventListener('load', uiHSlider.init, false);


function Slide(DOMElem, index) {

    var externalMethod,
        imgLen,
        imgLoadedLen = 0,
        attr = 'data-src',
        loadedClass = 'downloadBanner-item--loaded',
        sliderItemInstance = this,
        widths = [],
        setPosition = function(e) {
            var img = e.target;
            widths.push(img.width);
            imgLoadedLen++;
            if (imgLoadedLen === imgLen) {
                DOMElem.classList.add(loadedClass);
                sliderItemInstance.width = getWidth();
                externalMethod(sliderItemInstance);
            }
        },

        getWidth = function() {
            return Math.max.apply(null, widths) + 14;
        },

        loadImg = function(img) {
            img.onload = setPosition;
            img.src = img.getAttribute(attr);
            img.removeAttribute(attr);
        },

        loadElem = function(func) {
            var imgList = [].slice.call(DOMElem.querySelectorAll('[' + attr + ']'));
            externalMethod = func;
            imgList.map(loadImg);
            imgLen = imgList.length;
        };

    this.loadElem = loadElem;
    this.index = index;
    this.DOMElem = DOMElem;

};

function HSlider() {
    var patt,
        cont,
        contW,
        slidesList,

        slides,
        btns,

        slidesLen,
        slidesLoaded,
        slidesLoadedIndex,

        steps,
        actualStep,

        slidesGroupW,
        slidesGroupLimitW,

        slidesLoadedComplete,
        sliderInstance = this,

        advanceStep = function(evt) {
            var btn = evt.target,
                factor = btn.factor,
                result = actualStep + factor,
                nextStep = result < 0 ? 0 : result > slidesLen ? 0 : factor;
            actualStep += nextStep;
            slidesList.style.left = steps[actualStep];
            btn.disabled = actualStep === slidesLen || actualStep + factor < 0;
            btns[Number(!Boolean(factor + 1))].disabled = false;

            if (slidesLoaded < slidesLen) {
                slidesLoadedIndex++;
                slides[slidesLoadedIndex].loadElem(loadNextSlidesGroup);
            }

            evt.preventDefault();
        },

        getSlidesListW = function(arr) {
            var total = arr.reduce(function(previousTotal, slide) {
                return previousTotal + slide.width;
            }, 0);
            return total;
        },

        showBtns = function() {
            var slidesListW = getSlidesListW(slides.slice(0, slidesLoaded));
            btns[1].disabled = slidesListW <= contW;
        },

        adjustSteps = function() {
            var index = 0,
                slidesListW = getSlidesListW(slides);
            while (slidesListW >= contW) {
                slidesListW -= slides[index].width;
                index++;
            }
            slidesLen = index;
        },

        createSteps = function() {
            var newVal = Math.abs(parseInt(steps[slidesLoaded - 1])) + slides[slidesLoaded - 1].width;
            steps[slidesLoaded] = '-' + newVal + 'px';
        },

        loadNextSlidesGroup = function(slide) {
            slidesLoaded++;
            slidesLoadedComplete = slidesLoaded === slidesLen;
            createSteps();

            if (slidesLoadedComplete) {
                adjustSteps();
                return false;
            }

            slidesGroupW += slide.width;
            if (slidesGroupW > slidesGroupLimitW) {
                slidesGroupW = 0;
                return false;
            }

            slidesLoadedIndex++;
            slides[slidesLoadedIndex].loadElem(loadNextSlidesGroup);

        },

        loadSlidesGroup = function(slide) {
            slidesLoaded++;
            slidesLoadedComplete = slidesLoaded === slidesLen;
            createSteps();

            if (slidesLoadedComplete) {
                adjustSteps();
                return false;
            }
            slidesGroupW += slide.width;
            if (slidesGroupW > slidesGroupLimitW) {
                slidesGroupW = 0;
                slidesGroupLimitW = slides[actualStep].width;
                slidesLoadedIndex++;
                slides[slidesLoadedIndex].loadElem(loadNextSlidesGroup);
                showBtns();
                return false;
            }

            slidesLoadedIndex++;
            slides[slidesLoadedIndex].loadElem(loadSlidesGroup);
        },

        setSlideProps = function(slide, index) {
            slides[index] = new Slide(slide, index);
        },

        setBtnProps = function(btn, index) {
            btn.factor = (index + index) - 1;
            btn.disabled = true;
            btn.addEventListener('click', advanceStep);
        },

        setInitProps = function() {
            btns.map(setBtnProps);
            slides.map(setSlideProps);
            slides[0].loadElem(loadSlidesGroup);
        },

        setInitVals = function() {
            slidesLen = slides.length;
            contW = getElemWidth(cont) - 738;
            slidesGroupLimitW = contW;
            slidesLoadedComplete = false;
            steps = [0];
            actualStep = 0;
            slidesGroupW = 0;
            slidesLoaded = 0;
            slidesLoadedIndex = 0;
            setInitProps();
        },

        getInitVals = function() {
            slidesList = cont.querySelector(getPattern(patt, 'list'));
            slides = [].slice.call(slidesList.children);
            btns = [].slice.call(cont.querySelectorAll(getInitPattern(patt, 'btn')));
            setInitVals();
        },

        init = function(con, pat) {
            cont = con;
            patt = pat;
            getInitVals();
        };

    this.init = init;

};

function getInitPattern(patt, match) {
    return '[' + patt + '*="' + match + '"]';
};

function getElemWidth(elem) {
    var cloneW,
        b = document.body,
        elemClone = elem.cloneNode(true);
    elemClone.style.position = "fixed";
    elemClone.style.visibility = "hidden";
    elemClone.style.display = "block";
    b.appendChild(elemClone);
    cloneW = elemClone.offsetWidth;
    b.removeChild(elemClone);
    return cloneW;
};