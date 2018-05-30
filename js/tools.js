function createObj(obj, target, addOn) {
    "use strict";
    var key,
        newObj,
        contents,
        attrs,
        assignEvt,
        processValues = {
            type: function(val) {
                newObj = document.createElement(val);
            },
            html: function(val) {
                newObj.innerHTML = val;
            },
            contents: function(val) {
                contents = val;
            },
            attr: function(val) {
                attrs = val;
            },
            assignEvt: function(val) {
                assignEvt = val;
            }
        };
    for (key in obj) {
        if (typeof processValues[key] === 'function' && processValues.hasOwnProperty(key)) {
            processValues[key](obj[key]);
        }
    }
    if (addOn !== false) {
        target.appendChild(newObj);
    }
    if (assignEvt) {
        appendEvent(newObj, assignEvt);
    }
    if (attrs && attrs.length > 0) {
        var a = 0,
            len;
        for (len = attrs.length; a < len; a++) {
            newObj.setAttribute(attrs[a].name, attrs[a].value);
        }
        a = len = null;
    }
    if (typeof(contents) === 'object') {
        var i = 0,
            lng;
        for (lng = contents.length; i < lng; i++) {
            createObj(contents[i], newObj);
        }
        i = lng = null;
    }
    return newObj;
}

function iterateObj(obj, trg, addOn) {
    "use strict"; //js lint validate ok
    var target = trg || document.body,
        elem,
        key,
        elm,
        elmChild,
        newObj,
        elmLength;
    for (elem in obj) {
        if (obj.hasOwnProperty(elem)) {
            elm = obj[elem];
            if (typeof(elm) !== 'object') {
                newObj = createObj(obj, target, addOn);
                break;
            }
            elmLength = Object.keys(elm).length;
            if (elmLength > 0) {
                for (key in elm) {
                    if (elm.hasOwnProperty(key)) {
                        elmChild = elm[key];
                        if (typeof(elmChild) === 'object') {
                            iterateObj(elmChild, target, addOn);
                        }
                    } else {
                        iterateObj(elm, target);
                    }
                }
            }
        }
    }
    return newObj;
}

function getFirstChild(el) {
    var firstChild = el.firstChild;
    while (firstChild != null && firstChild.nodeType == 3) { // skip TextNodes
        firstChild = firstChild.nextSibling;
    }
    return firstChild;
}

function mainfunc(object, func, args) {
    this[func].apply(object, args);
}

function appendEvent(elem, objEvt) {
    var evt = objEvt.evt,
        method = objEvt.method,
        args = objEvt.params;
    elem.addEventListener(evt, function() {
        cancelDefaultAction(evt);
        mainfunc(evt, method, args);
    }, false);
}

function eventBuilder(evtType, opts) {
    var evt, evtOpts = opts || {};
    evt = document.createEvent("Event");
    evt.initEvent(evtType, true, true);
    return evt;
}

function checkFieldRequired(field, isMail) {
    var fieldIsOk = field.value !== '';
    if (isMail === true) {
        fieldIsOk = validateEmail(field.value);
    }
    if (fieldIsOk === false) {
        field.setAttribute('placeholder', locale.required_field_error);
        addClass(field, 'error');
    }
    return fieldIsOk;
}


function addEventHandler(elem, eventType, handler) {
    if (elem.addEventListener)
        elem.addEventListener(eventType, handler, false);
    else if (elem.attachEvent)
        elem.attachEvent('on' + eventType, handler);
}

function addEvent(elem, handler, eventType) {
    var evtType = eventType || 'click';
    if (elem.addEventListener)
        elem.addEventListener(evtType, handler, false);
    else if (elem.attachEvent)
        elem.attachEvent('on' + evtType, handler);
}


function removeEventHandler(elem, eventType, handler) {
    if (elem.addEventListener)
        elem.removeEventListener(eventType, handler, false);
    else if (elem.attachEvent)
        elem.detachEvent('on' + eventType, handler);
}

function showLoading(evt, elem) {
    if (window[elem].hide) {
        window[elem].hide(true);
    }
    var evento = eventBuilder('loading');
    document.documentElement.dispatchEvent(evento);
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function preventEvent(evt) {
    evt.preventDefault();
    evt.stopPropagation();
}



function cancelDefaultAction(e) {
    var evt = e ? e : window.event;
    if (evt.preventDefault) {
        evt.preventDefault();
    }
    if (evt.stopPropagation) evt.stopPropagation();
    evt.returnValue = false;
    return false;
}

function hasClass(ele, cls) {
    var nameClass, reg;
    reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    nameClass = ele.getAttribute('class') || ele.className;
    return nameClass.match(reg);
}

function addClass(ele, cls) {
    if (!this.hasClass(ele, cls)) {
        var nameClass = ele.getAttribute('class'),
            nmClass = nameClass ? nameClass + ' ' + cls : cls;
        ele.setAttribute('class', nmClass);
    }
}

function removeClass(ele, cls) {
    if (ele && hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)'),
            nameClass = ele.getAttribute('class');
        ele.setAttribute('class', nameClass.replace(reg, ' '));
    }
}

function classToggle(element, tclass) {
    var classes = element.className || element.getAttribute('class');
    classes = hasClass(element, tclass) ? removeClass(element, tclass) : addClass(element, tclass);
}



function toggleClass(element, tclass) {
    var classes;
    if (!element) {
        return false;
    }
    classes = element.className || element.getAttribute('class');
    classes = hasClass(element, tclass) ? removeClass(element, tclass) : addClass(element, tclass);
}




function removeNode(elem) {
    if (elem.parentNode) {
        elem.parentNode.removeChild(elem);
    }
}



function mergeObjects(obj1, obj2) {
    "use strict";
    var obj3 = {};
    for (var attrname in obj1) {
        if (obj1.hasOwnProperty(attrname)) {
            obj3[attrname] = obj1[attrname];
        }
    }
    for (var attr in obj2) {
        if (obj2.hasOwnProperty(attr)) {
            obj3[attr] = obj2[attr];
        }
    }
    return obj3;
}

function arrayUnique(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
}

function delayedCall(time, callback) {
    var delay = time || 1000,
        timeout = setTimeout(function() {
                clearTimeout(timeout);
                timeout = null;
                callback();
            },
            delay);
}

function getToday(elem, dat) {
    var today,
        date = dat || new Date(),
        day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();
    if (day < 10) day = "0" + day;
    if (month < 10) month = "0" + month;
    today = year + "-" + month + "-" + day;
    if (elem) {
        elem.val(today);
        return false;
    } else {
        return today;
    }
}

function setHour(elem) {
    var val,
        dt = new Date();
    hour = dt.getHoursTwoDigits() + ":" + dt.getMinutesTwoDigits();
    if (elem.jquery) {
        elem.val(hour);
        return;
    }
    val = elem.value;
    if (typeof val === 'undefined' || val === '') {
        elem.value = hour;
    }
}

function getElementsByClass(searchClass, node, tag) {
    var classElements = [];
    if (node == null)
        node = document;
    if (tag == null)
        tag = '*';
    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
    for (i = 0, j = 0; i < elsLen; i++) {
        if (pattern.test(els[i].className)) {
            classElements[j] = els[i];
            j++;
        }
    }
    return classElements;
}

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function elemExists(id) {
    return document.getElementById(id);
}

function setObjects(id) {
    var name = id.split('_'),
        len = name.length,
        objName,
        obj = document.getElementById(id);
    if (len > 1) {
        for (var n = 1; n < len; n++) {
            name[n] = capitaliseFirstLetter(name[n]);
        }
    }
    objName = name.join('');
    window[objName] = obj;
}



function JSONParser(jsonString) {
    var tempString = jsonString.replace(/\'/g, '"'),
        newJSON = $.parseJSON(tempString);
    return newJSON;
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

function checkTextareaWidth(formActive) {
    if (!formActive.formObj.image.attr('src')) {
        formActive.formObj.image.parent().removeClass('show');
        $('.js_form_container').removeClass('with_img');
    } else {
        $('.js_form_container').addClass('with_img');

    }

}

Date.prototype.getHoursTwoDigits = function() {
    var retval = this.getHours();
    if (retval < 10) {
        return ("0" + retval.toString());
    } else {
        return retval.toString();
    }
};
Date.prototype.getMinutesTwoDigits = function() {
    var retval = this.getMinutes();
    if (retval < 10) {
        return ("0" + retval.toString());
    } else {
        return retval.toString();
    }
};



function htmlEncode(value) {
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
}

function htmlDecode(value) {
    return $('<div/>').html(value).text();
}

function urlify(text) {
    var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
        title = 'ir al enlace';
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '" target="_blank" title="' + title + '" >' + url + '</a>';
    });
}

function randomNum(lower, upper) {
    var range = upper - lower,
        result = Math.random() * range;
    result = Math.floor(result);
    return parseInt(lower) + result;
}

function windowScrollAdapter() {
    var argsObj = arguments[0],
        scrollTop,
        windowHeight,
        windowHalfHeight,
        elemHeight,
        elemHalfHeight,
        marginTop,
        topPos,
        elem = argsObj.elem,
        delay = argsObj.delay || 300,
        customElem = argsObj.customElem || null,
        customElemId,
        customElemExists,
        checkIsChanged = function() {
            $(document).mousedown();
            $('.hasDatepicker').blur();
            window.onscroll = window.onresize = null;
            intervalScroll = setTimeout(setElemPos, 500);
        },
        setElemPos = function() {
            clearTimeout(intervalScroll);
            intervalScroll = null;
            scrollTop = window.pageYOffset;
            windowHeight = window.innerHeight;
            windowHalfHeight = Math.round(windowHeight / 2);
            elemHeight = elem.scrollHeight;
            if (customElem) {
                customElemId = customElem.getAttribute('id');
                customElemExists = document.getElementById(customElemId);
            }
            customElem = customElemExists;
            if (customElemExists) {
                elemHeight = customElem.scrollHeight;
            }
            elemHalfHeight = Math.round(elemHeight / 2);
            marginTop = (0 - elemHalfHeight) + 'px';
            topPos = (windowHalfHeight + scrollTop) + 'px';
            window.onscroll = window.onresize = null;
            if (elemHeight > windowHeight) {
                marginTop = '20px';
                topPos = 0;
                popupCont.style.minHeight = (elemHeight + 150) + 'px';
                popupCont.style.height = '100%';
            }
            elem.style.marginTop = marginTop;
            elem.style.top = topPos;
            if (elemHeight < windowHeight) {
                popupCont.removeAttribute('style');
                window.onscroll = checkIsChanged;
            }
            window.onresize = checkIsChanged;
            $('.hasDatepicker').blur();
            $(document).mousedown();
            document.documentElement.dispatchEvent(eventResume);
        },
        intervalScroll = setTimeout(setElemPos, delay);
}

function isNumber(event) {
    if (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode !== 9 && charCode !== 8 && charCode !== 46 && (charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105) && (charCode < 37 || charCode > 38) && (charCode !== 86 || charCode !== 118)) {
            return false;
        }
    }
    return true;
}

function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}

function cloneEventObj(eventObj, overrideObj) {

    if (!overrideObj) {
        overrideObj = {};
    }

    function EventCloneFactory(overProps) {
        for (var x in overProps) {
            this[x] = overProps[x];
        }
    }

    EventCloneFactory.prototype = eventObj;

    return new EventCloneFactory(overrideObj);

}


function getElemStyle(elem, prop) {
    return window.getComputedStyle(elem).getPropertyValue(prop);
}


function fadeDown(elem, elmDisplay) {
    var time = arguments[1] || 200,
        action = arguments[2] || null,
        elmDisp = elmDisplay || 'block',
        percent = Math.round(time / 10),
        opacitytyElem = getElemStyle(elem, 'opacity'),
        displayElem = getElemStyle(elem, 'display'),
        counter = Number(opacitytyElem),
        interval = null,
        fadeDownMethod = function() {
            elem.style.opacity = counter;
            counter -= 0.1;
            if (counter <= 0) {
                elem.style.opacity = 0;
                elem.style.display = 'none';
                elem.style.visibility = 'hidden';
                clearInterval(interval);
                interval = null;
                if (action) {
                    action();
                }
            }

        };
    if (displayElem === 'none') {
        return false;
    }
    elem.style.opacity = counter;
    elem.style.display = elmDisp;
    elem.style.visibility = 'visible';
    interval = setInterval(fadeDownMethod, percent);
};

function fadeUp(elem, elmDisplay) {
    var time = arguments[1] || 200,
        elmDisp = elmDisplay || 'block',
        percent = Math.round(time / 10),
        displayElem = getElemStyle(elem, 'display'),
        visibilityElem = getElemStyle(elem, 'visibility'),
        opacitytyElem = getElemStyle(elem, 'opacity'),
        isElemVisible = false,
        interval = null,
        counter = Number(opacitytyElem),
        fadeUpMethod = function() {
            elem.style.opacity = counter;
            counter += 0.1;
            if (counter >= 1) {
                elem.style.opacity = 1;
                clearInterval(interval);
                interval = null;
            }

        };

    isElemVisible = displayElem !== 'none' && opacitytyElem === '1' && visibilityElem === 'visible';
    if (isElemVisible) {
        return false;
    }
    elem.style.opacity = counter;
    elem.style.display = elmDisp;
    elem.style.visibility = 'visible';
    interval = setInterval(fadeUpMethod, percent);
};

function setProps(args, obj) {
    var elem,
        len = args.length,
        i = 0;
    for (i; i < len; i++) {
        elem = args[i];
        for (var u in elem) {
            obj.setAttribute(u, elem[u]);
        }
    }
}



function createNewElem(nameClass, typeElm, args) {
    var type = typeElm || 'div',
        elm = document.createElement(type);
    if (nameClass) {
        addClass(elm, nameClass);
    }
    if (args) {
        setProps(args, elm);
    }
    return elm;
};


function insertBefore(oldElem, newElem) {

    oldElem.parentNode.insertBefore(newElem, oldElem);

};


function booleanToRange(bool) {
    return 2 * Number(bool) - 1;

};

function slideToggleTo($btn, $elem, delay, callback) {
    var timeout,
        delay = delay || 200;
    $btn.on('click', function(e) {
        e.preventDefault();
        $elem.slideToggle(delay);
        if (callback) {
            timeout = setTimeout(function() {
                clearTimeout(timeout);
                timeout = null;
                callback();
            }, delay + 100);
        }
    });
}

function bindElemHandler(methodName, evtType) {
    var eventType = evtType || 'click';
    addEventHandler(this, eventType, methodName);
}

function unbindElemHandler(methodName, evtType) {
    var eventType = evtType || 'click';
    removeEventHandler(this, eventType, methodName);
}

function getPattern(match, param) {
    var parameter = param || null,
        patt = parameter !== null ? '[' + match + '="' + parameter + '"]' : '[' + match + ']';
    return patt;
}


function findElem(ptMatch, ptElem, target) {
    var trg = target || document,
        elem = ptElem || null,
        pattMatch = getPattern(ptMatch, ptElem);
    return trg.querySelector(pattMatch);
}

function findElems(patt, list, target) {
    var hasList = list || false,
        elem = target || document;
    if (hasList) {
        return elem.querySelectorAll(patt);
    }
    return elem.querySelector(patt);
}

function getElemsList(ptMatch, ptElem, target) {
    var trg = target || document,
        elem = ptElem || null,
        pattMatch = getPattern(ptMatch, ptElem);
    return trg.querySelectorAll(pattMatch);
};


function removeStyleProp(elm, prop) {

    if (elm.style.removeProperty) {
        elm.style.removeProperty(prop);
    } else {
        elm.style.removeAttribute(prop);
    }
}


function GetNextValidSibling(el) {

    var nextNode = el.nextSibling;

    while (nextNode && nextNode.nodeType != 1) {

        nextNode = nextNode.nextSibling;

    }



    return nextNode;

}



function getParents(elem, selector) {

    var firstChar,
        parents = [],
        selectorAttr = false,
        selectorVal = false;
    if (selector) {
        firstChar = selector.charAt(0);

    }
    if (selector && selector.indexOf("=") > -1) {
        var equalIndexOf = selector.indexOf("=");
        selectorAttr = selector.slice(1, equalIndexOf);
        selectorVal = selector.slice(equalIndexOf + 2, -2);
    }

    // Get matches
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (selector) {

            // If selector is a class
            if (firstChar === '.') {
                //if ( elem.classList.contains( selector.substr(1) ) ) {
                if (elem.className.match(selector.substr(1))) {
                    parents.push(elem);
                }
            }

            // If selector is an ID
            if (firstChar === '#') {
                if (elem.id === selector.substr(1)) {
                    parents.push(elem);
                }
            }

            // If selector is a data attribute
            if (firstChar === '[' && !selectorAttr && !selectorVal) {
                if (elem.hasAttribute(selector.substr(1, selector.length - 2))) {
                    parents.push(elem);
                }
            }

            // If selector is a data attribute with value
            if (selectorAttr && selectorVal) {

                if (elem.getAttribute(selectorAttr) === selectorVal) {
                    parents.push(elem);
                }
            }




            // If selector is a tag
            if (elem.tagName.toLowerCase() === selector) {
                parents.push(elem);
            }

        } else {
            parents.push(elem);
        }

    }

    // Return parents if any exist
    if (parents.length === 0) {
        return null;
    } else {
        return parents;
    }

}

function findParent(elem,selector){
    var parentElem = null;
    for (; elem && elem !== document; elem = elem.parentNode) {
        if(elem.querySelector(selector)){
            parentElem = elem.querySelector(selector);
        }
    }
    return parentElem;
}

function checkParent(elem,parentElem){
    var hasParentElem = false;
    for (; elem && elem !== document; elem = elem.parentNode) {
        if(elem === parentElem){
            hasParentElem = elem;
        }
    }
    return hasParentElem;
}


function mouseTarget(e) {
    var targ;
    if (!e) var e = window.event;
    if (e.target) targ = e.target;
    else if (e.srcElement) targ = e.srcElement;
    if (targ.nodeType == 3) // defeat Safari bug
        targ = targ.parentNode;
    return targ;
}

function formatPrice(elem, index, array, nprice) {
    var newprice = nprice || elem.innerHTML;
    elem.innerHTML = new Intl.NumberFormat(document.documentElement.lang, { style: "currency", currency: "EUR", maximumSignificantDigits: 10 }).format(newprice);
};





function bodyBlur(blur) {
    var body = document.body,
        classToAdd = blur ? 'blur' : 'focus',
        classToRemove = blur ? 'focus' : 'blur';
    removeClass(body, classToRemove);
    addClass(body, classToAdd);
}


if (!String.prototype.contains) {
    String.prototype.contains = function() {
        return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
}



window.mobileAndTabletcheck = function() {
    var check = false;
    (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};










//polyfill CustomEvent ie9  ie10
(function() {
    function CustomEvent(event, params) {
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    };

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
})();


function EventDispatcher() {}
EventDispatcher.prototype.events = {};
EventDispatcher.prototype.addEventListener = function(key, func) {
    if (!this.events.hasOwnProperty(key)) {
        this.events[key] = [];
    }
    this.events[key].push(func);
};
EventDispatcher.prototype.removeEventListener = function(key, func) {
    if (this.events.hasOwnProperty(key)) {
        for (var i in this.events[key]) {
            if (this.events[key][i] === func) {
                this.events[key].splice(i, 1);
            }
        }
    }
};
EventDispatcher.prototype.dispatchEvent = function(key, dataObj) {
    if (this.events.hasOwnProperty(key)) {
        dataObj = dataObj || {};
        dataObj.currentTarget = this;
        for (var i in this.events[key]) {
            this.events[key][i](dataObj);
        }
    }
};

(function($) {
    $.fn.serializeFormJSON = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);


/*var newShop = new uiShop();

newShop.shopParams.theme = "nuevooooo";*/



//alert(newShop.init())

/*
 * object.watch polyfill
 *
 * 2012-04-03
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

// object.watch
if (!Object.prototype.watch) {
    Object.defineProperty(Object.prototype, "watch", {
        enumerable: false,
        configurable: true,
        writable: false,
        value: function(prop, handler) {
            var
                oldval = this[prop],
                newval = oldval,
                getter = function() {
                    return newval;
                },
                setter = function(val) {
                    oldval = newval;
                    return newval = handler.call(this, prop, oldval, val);
                };

            if (delete this[prop]) { // can't watch constants
                Object.defineProperty(this, prop, {
                    get: getter,
                    set: setter,
                    enumerable: true,
                    configurable: true
                });
            }
        }
    });
}

// object.unwatch
if (!Object.prototype.unwatch) {
    Object.defineProperty(Object.prototype, "unwatch", {
        enumerable: false,
        configurable: true,
        writable: false,
        value: function(prop) {
            var val = this[prop];
            delete this[prop]; // remove accessors
            this[prop] = val;
        }
    });
}

(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('nextElementSibling')) {
      return;
    }
    Object.defineProperty(item, 'nextElementSibling', {
      configurable: true,
      enumerable: true,
      get: function () {
        var el = this;
        while (el = el.nextSibling) {
          if (el.nodeType === 1) {
              return el;
          }
        }
        return null;
      },
      set: undefined
    });
  });
})([Element.prototype, CharacterData.prototype]);

if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}


