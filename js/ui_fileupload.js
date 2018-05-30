var uploadImg = {},




    uploadFile = (function(window, undefined) {
        "use strict";
        var btn,
            file,
            text,

            btnPattern,
            textPattern,
            filePattern,

            buttonEnabledClass = 'button--primary',
            patternMatch = 'data-form-input',
            btnPatternText = 'fileButton',
            textPatternText = 'fileText',
            filePatternText = 'fileField',

            bindElemHandler = function(methodName, evtType) {
                var eventType = evtType || 'click';
                addEventHandler(this, eventType, methodName);
            },

            setPattern = function(param, match) {
                var mtch = match || patternMatch,
                    patt = '[' + mtch + '="' + param + '" ]';
                return patt;
            },

            disabledBtn = function() {
                removeClass(btn, buttonEnabledClass);
                btn.setAttribute('disabled', 'disabled');
            },

            enabledBtn = function() {
                addClass(btn, buttonEnabledClass);
                btn.removeAttribute('disabled');
            },

            onfileChange = function() {
                text.value = file.value;
                enabledBtn();
            },

            setHandlers = function() {
                bindElemHandler.apply(file, [onfileChange, 'change']);
                file.value = '';
                text.value = '';
                disabledBtn();
            },
            getElems = function() {
                btn = document.querySelector(btnPattern);
                file = document.querySelector(filePattern);
                text = document.querySelector(textPattern);
                if (!file) {
                    return;
                }
                setHandlers();
            },


            getPatterns = function() {
                btnPattern = setPattern(btnPatternText);
                textPattern = setPattern(textPatternText);
                filePattern = setPattern(filePatternText);
                getElems();
            },

            init = function() {
                getPatterns();
            };
        return {
            init: init
        };

    })(window);


    (function() {
        "use strict";
        var patt = 'data-fileimg',

        readURL = function(evt) {

            var input = evt.currentTarget,
            dest = input.dest;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    dest.src = e.target.result;
                };
                reader.readAsDataURL(input.files[0]);
            }

        },
        setinputProps = function(el) {
            el.dest = el.parentNode.querySelector(getPattern(patt, 'img'));
            if (!el.dest) {
                return false;
            }
            el.addEventListener('change', readURL, false);

        },
        init = function() {
            [].slice.call(document.querySelectorAll(getPattern(patt, 'input'))).map(setinputProps);
        };
        this.init = init;

    }).apply(uploadImg);

    window.addEventListener("load", uploadImg.init, false);

