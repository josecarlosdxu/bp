var tagsSlider = {};
(function() {
    "use strict";
    var Slider,
        AutoSliderEvt,
        TagElems,
        tagsNum,
        maxLimit,
        numSlides,
        arrayTags,
        sliderInterval,
        sliderPaused = false,
        doc = document.documentElement,
        pattern = "data-js-tag-slider",
        buttonList = [],
        slides = [],
        sliderActiveIndex = 0,
        delay = 5000,
        steps = [{ "size": "1024", "limit": "20" }, { "size": "768", "limit": "10" }, { "size": "480", "limit": "15" }, { "size": "100", "limit": "5" }],
        autoSlider = function(evt) {
            var nextStep, start = Boolean(Number(evt.start)) || false;
            if (!start) {
                clearInterval(sliderInterval);
                resetSlides();
                sliderInterval = null;
                return;
            }
            if (sliderPaused === true) {
                clearInterval(sliderInterval);
                return false;
            }

            AutoSliderEvt = evt;
            sliderInterval = setInterval(function() {
                nextStep = sliderActiveIndex === numSlides - 1 ? 0 : sliderActiveIndex + 1;
                resetSlides(nextStep);
            }, delay);
        },
        getLimits = function() {
            var e, factor, step, size, maxWidth = doc.offsetWidth;
            for (e in steps) {
                step = steps[e];
                size = Number(step.size);
                if (maxWidth > size) {
                    factor = step.limit;
                    break;
                }
            }
            return factor;
        },

        fillSlide = function(index) {
            var count = 0,
                slide = slides[index],
                len = arrayTags.length,
                limit = len > maxLimit ? maxLimit : len;
            while (count < limit) {
                slide.appendChild(arrayTags.splice(0, 1)[0]);
                count++;
            }
            Slider.appendChild(slide);
        },

        setArrayTags = function() {
            arrayTags = Array.prototype.slice.call(TagElems);
        },

        setMaxLimit = function(evt) {
            maxLimit = getLimits();
            numSlides = Math.ceil(tagsNum / maxLimit);
            setArrayTags();
            setSlides();
        },

        toggleSlide = function(evt) {
            var btn = evt.currentTarget;
            evt.preventDefault();
            clearInterval(sliderInterval);
            resetSlides(btn.index);
        },

        resetSlides = function(ind) {
            var index = ind || 0,
                btn = buttonList[index],
                slide = slides[index];
            btn.setAttribute('data-js-active', 'true');
            slide.setAttribute('data-js-active', 'true');
            slide.removeAttribute('style');
            if (sliderActiveIndex !== index) {
                btn = buttonList[sliderActiveIndex];
                slide = slides[sliderActiveIndex];
                btn.removeAttribute('data-js-active');
                slide.removeAttribute('data-js-active');
                slide.style.display = "none";
            }
            sliderActiveIndex = index;
        },

        setButtons = function(len) {
            var btn, count = 0,
                buttonCont = doc.querySelector(getPattern(pattern, 'buttonlist'));
            buttonCont.innerHTML = "";
            buttonList = [];
            while (count < numSlides) {
                btn = createNewElem('dots-item', 'a', [{ 'data-js-tag-slider': 'button' }]);
                btn.index = count;
                btn.addEventListener('click', toggleSlide);
                buttonList.push(btn);
                buttonCont.appendChild(btn);
                count++;
            }
            resetSlides();
            addEventHandler(doc, 'tagsSlider', autoSlider);
        },

        setSlides = function() {
            var div, slide, timeout, count = 0;
            Slider.innerHTML = "";
            slides = [];
            while (count < numSlides) {
                slide = createNewElem('cardList cardList--tags', 'section', [{ 'data-js-tag-slider': 'slide' }]);
                slide.style.display = 'none';
                Slider.appendChild(slide);
                slides.push(slide);
                fillSlide(count);
                count++;
            }
            timeout = setTimeout(function() {
                Slider.style.background = "transparent";
                clearTimeout(timeout);
                timeout = null;
            }, 500);
            addEventHandler(Slider, 'mouseover', stopAutoSlider);
            setButtons();
        },

        getTagElems = function() {
            var count = 0;
            TagElems = Slider.querySelectorAll(getPattern(pattern, 'tagItem'));
            tagsNum = TagElems.length;
            setMaxLimit();
        },
        restartAutoSlider = function(evt) {
            if (getParents(evt.target, '[data-js-tag-slider]') === null) {
                removeEventHandler(doc, 'mousemove', restartAutoSlider);
                addEventHandler(Slider, 'mouseover', stopAutoSlider);
                sliderPaused = false;
                //document.dispatchEvent(AutoSliderEvt);
            }
        },

        stopAutoSlider = function(evt) {
            sliderPaused = true;
            clearInterval(sliderInterval);
            removeEventHandler(Slider, 'mouseover', stopAutoSlider);
            addEventHandler(doc, 'mousemove', restartAutoSlider);
        },
        getTaglist = function() {
            Slider = doc.querySelector(getPattern(pattern, 'slider')) || false;
            if (!Slider) {
                return false;
            }
            window.addEventListener('resize', setMaxLimit, false);
            getTagElems();
        };
    this.init = function() {

        getTaglist();
    };

}).apply(tagsSlider);

if (!Event.prototype.start) {
    Event.prototype.start = false;
}
window.addEventListener('load', tagsSlider.init, false);

//// set props
