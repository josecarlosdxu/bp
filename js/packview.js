var packView = function() {
    var packType,
        packQuote,
        packIndex,
        modelPackData,
        viewName,
        DOMcontentSection,
        vData,
        controllerFunc,
        radioList,
        packNamePatt = 'data-jsname',
        packPatt = 'data-jspack',
        anchorPatt = 'data-jsanchor',
        view = this,

        completeAnchorSection = function(DOMelem, match, val) {
            DOMelem.querySelector(getPattern(anchorPatt, match)).innerHTML = val;
        },

        sendViewVal = function(evt) {
            var elem = evt.currentTarget;
            controllerFunc(elem.value, packIndex);
        },


        setRadioListener = function(radio) {
            radio.checked = Number(radio.value) === Number(modelPackData.idpack);
            radio.addEventListener('change', sendViewVal);
        },

        fillDOMContentSection = function(elem) {
            var viewObj = view['idObj' + elem.value],
                trDom = document.createElement('tr'),
                tdFirstDom = document.createElement('td'),
                labelDom = document.createElement('label'),
                inputDom = document.createElement('input'),
                titleDom = document.createElement('strong');
            subTitleDom = elem.subtitle !== "" ? document.createElement('em') : false,
                titleTxt = document.createTextNode(elem.title),
                subTitleTxt = document.createTextNode(elem.subtitle);

            trDom.classList.add('pricePanel-radiogroup');
            tdFirstDom.classList.add('table-item', 'u-pdl--half');
            labelDom.classList.add('form-label', 'form-label--checkgroup');
            inputDom.classList.add('form-radio');
            titleDom.classList.add('u-mgl--3');

            if (Number(elem.value) === Number(modelPackData.idpack)) {
                trDom.classList.add('color-blue');
            }
            if (elem.disabled) {
                trDom.classList.add('u-op-40', 'u-pen');
            }
            inputDom.setAttribute('value', elem.value);
            inputDom.setAttribute('name', viewName);
            inputDom.setAttribute('type', 'radio');

            titleDom.appendChild(titleTxt);
            labelDom.appendChild(inputDom);
            labelDom.appendChild(titleDom);
            if (subTitleDom) {
                subTitleDom.appendChild(subTitleTxt);
                subTitleDom.classList.add('u-mgl--3');
                labelDom.appendChild(subTitleDom);
            }
            tdFirstDom.appendChild(labelDom);
            trDom.appendChild(tdFirstDom);
            trDom.innerHTML += '<td class="table-item table-item--number"><strong data-jsformat>' + elem.price + '</strong></td>';
            DOMcontentSection.appendChild(trDom);
            elem.index = packIndex;
            viewObj = elem;
        },

        fillDOM = function(elem) {
            var quoteStr = packQuote.text + ' <span data-jsformat="">' + packQuote.price + '</span>',
                quoteElem = packQuote.active ? quoteStr : '<strike>' + quoteStr + '</strike>';
            elem.classList.add('pricePanel--' + packType);
            completeAnchorSection(elem, 'name', '<small class="u-op-50">PACK</small><br>' + packType);
            completeAnchorSection(elem, 'loginquote', quoteElem);
            DOMcontentSection = elem.querySelector(getPattern(anchorPatt, 'content'));
            vData.options.map(fillDOMContentSection);
            elem.classList.remove('u-op-0');
            radioList = [].slice.call(elem.querySelectorAll(getPattern('type', 'radio')));
            radioList.map(setRadioListener);

        },

        setControllerFunc = function(func) {
            controllerFunc = func;
        },

        setValues = function() {
            packType = vData.type;
            packQuote = vData.quote;
            packIndex = vData.index;
            viewName = vData.name;
            fillDOM(document.querySelector(getPattern(packNamePatt, viewName)));
        },

        setModelData = function(data) {
            modelPackData = data;
        },
        updateView = function(val) {
            radioList.map(function(elem) {
                elem.checked = elem.value === val;
            });
        },

        setData = function(data) {
            vData = data;
            //setValues();
        };


    this.setModelData = setModelData;
    this.setData = setData;
    this.setControllerFunc = setControllerFunc;
    this.updateView = updateView;


}