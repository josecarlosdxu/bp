var uiTabs = {};

(function() {
    var tabsButtonsList,
        tabsPanelsList,
        tabsLen,
        doc = document.documentElement,
        pattern = 'data-js-uitab',
        statePatt = 'data-state',
        tabActiveIndex = -1,
        stringToObject = function(str) {
            return JSON.parse(str.replace(/'/g, '"'));
        },
        dispatchTabEvt = function(eObj) {
            var evtObj = stringToObject(eObj),
                evtType = evtObj.type,
                evtStart = evtObj.start,
                event = document.createEvent('Event');
            event.initEvent(evtType, true, true);
            event.start = evtStart;
            doc.dispatchEvent(event);
        },
        togglePanel = function(view) {
            var show = view || false,
                panel = this,
                showEvt = panel.showEvt || false,
                hideEvt = panel.hideEvt || false;
            if (show && showEvt) {
                dispatchTabEvt(showEvt);
                return false;
            }
            if (hideEvt) {
                dispatchTabEvt(hideEvt);
            }
        },
        getNodeList = function(ptMatch) {
            var list = doc.querySelectorAll(getPattern(pattern, ptMatch)) || false;
            if (!list) {
                return false;
            }
            return list;
        },

        radioChanged = function(evt) {
            var label = evt.currentTarget,
                attrName = 'data-state',
                attrVal = 'selected',
                selectedLabel = findElem(attrName, attrVal, label.parentNode) || false;
            if (selectedLabel) {
                togglePanel.apply(selectedLabel.panel, [false]);
                selectedLabel.removeAttribute(attrName);
            }
            togglePanel.apply(label.panel, [true]);
            label.setAttribute(attrName, attrVal);
        },
        hasRadioProps = function() {
            var radio = this,
                panel = radio.nextElementSibling,
                label = findElem('for', this.id) || createNewElem(null, 'label', [{ 'for': this.id }]);
            panel.showEvt = panel.getAttribute('data-js-showev') || false;
            panel.hideEvt = panel.getAttribute('data-js-hideevt') || false;
            label.radio = radio;
            label.panel = panel;
            addEventHandler(label, 'click', radioChanged);
        },
        hasRadioInputs = function() {
            var elem, list = getNodeList('radio'),
                len = list.length - 1 || -1;

            while (len > -1) {
                elem = list[len];
                hasRadioProps.apply(elem);
                len--;
            }
            elem = list = len = null;
        };
    this.init = function() {       
        hasRadioInputs();
    };
}).apply(uiTabs);
if (!Event.prototype.start) {
    Event.prototype.start = false;
}

window.addEventListener('load', uiTabs.init, false);
