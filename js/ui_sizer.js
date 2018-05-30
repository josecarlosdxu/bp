var sizeSnitch = {};

(function() {
    "use strict";
    var sizeSnitchElem,
        sizerP,
        sizerChechbox,
        sizerLabel,
        sizerHider,
        sizeGridElem,
        gridControls,
        gridControlsHeader,
        gridObj = {},
        gridObjDefault = { "posx": "0", "posy": "0", "spacingx": "15", "spacingy": "15", "opacity": "0.2", "basev": "#ff6600", "baseh": "#00ffff" },
        input = '',

        hasStorage = false,
        initiated = false,
        keyStr = '666671827368',
        gridUpdate = function(evt) {
            var elem = evt.target,
                prop = '--' + elem.id,
                val = elem.id === "opacity" ? (parseInt(elem.value) * 0.01).toFixed(2) : elem.value;

            if (elem.type == "range" && elem.id !== "opacity") {
                elem.nextElementSibling.value = val;
            }
            if (elem.type == "text") {
                prop = '--' + elem.previousElementSibling.id;
                elem.previousElementSibling.value = val;
            }
            if (elem.type !== "color" && elem.id !== "opacity") {
                val = elem.value + 'px';
            }
            gridObj[prop.slice(2)] = val.replace('px', '');
            localStorage.setItem('bbgrid', JSON.stringify(gridObj));
            document.body.style.setProperty(prop, val);
        },

        updateSizer = function() {
            sizerP.innerHTML = window.innerWidth + ' x ' + window.innerHeight;
        },

        hideSizer = function(e) {
            e.preventDefault();
            localStorage.removeItem('bbgrid');
            localStorage.setItem('bbgrid', ''); //chrome bug              
            document.body.removeChild(sizerChechbox);
            document.body.removeChild(sizeGridElem);
            document.body.removeChild(sizeSnitchElem);
            document.body.removeAttribute('style');
            sizerHider.removeEventListener("click", hideSizer);
            window.removeEventListener("resize", updateSizer);
            localStorage.setItem('bbgrid', ''); //chrome bug
            input = "";
            hasStorage = false;
            document.addEventListener("keydown", checkCode);

        },

        setListeners = function() {
            sizerHider.addEventListener("mousedown", hideSizer);
            window.addEventListener("resize", updateSizer);
            updateSizer();
        },

        appendSnitch = function() {
            document.body.appendChild(sizerChechbox);
            document.body.appendChild(sizeGridElem);
            document.body.appendChild(sizeSnitchElem);
            setListeners();

        },
        activateRange = function(e) {
            var elem = e.target,
                method = e.type === "mousedown" ? "addEventListener" : "removeEventListener";
            elem[method]("mousemove", gridUpdate);
        },

        setRangeProps = function(elem) {
            elem.addEventListener("change", gridUpdate);
            if (elem.type === "range") {
                elem.addEventListener("mousedown", activateRange);
                elem.addEventListener("mouseup", activateRange);
            }
            if (elem.type === "text") {
                elem.addEventListener("keyup", function(e) {
                    if (e.keyCode === 13);
                    gridUpdate(e);
                });
            }
        },
        setProps = function() {
            sizeSnitchElem.classList.add('sizer');
            sizerChechbox.type = "checkbox";
            sizerLabel.classList.add('sizer-labeltools');
            sizerChechbox.classList.add('sizer-launcher');
            sizerChechbox.type = 'checkbox';
            sizerChechbox.id = 'seetools';
            sizerLabel.setAttribute('for', sizerChechbox.id);
            sizerLabel.title = 'Expandir y contraer';
            sizeGridElem.classList.add('sizer-grid');
            appendSnitch();
        },
        setControlsprops = function() {
            [].slice.call(gridControls.querySelectorAll('input')).map(setRangeProps);
            gridControls.classList.add('sizer-controls');
            setProps();
        },

        createGridControls = function() {
            var inner;
            gridControls = document.createElement('div');
            gridControlsHeader = document.createElement('section');
            gridControlsHeader.classList.add('sizer-headerControls');
            gridControlsHeader.innerHTML = '<h3 class="subtitle3">Rejilla</h3>';
            sizerHider.classList.add('sizer-hideBtn');
            sizerHider.title = 'No mostrar';
            gridControls.appendChild(gridControlsHeader);
            inner = '<label class="sizer-label">Left: <input type="range" id="posx" min="-30" max="100" value="' + gridObj.posx + '">';
            inner += '<input type="text" class="sizer-results" value="' + gridObj.posx + '"></label>';
            inner += '<label class="sizer-label">Top: <input type="range" id="posy" min="-30" max="100" value="' + gridObj.posy + '">';
            inner += '<input type="text" class="sizer-results" value="' + gridObj.posy + '"></label>';
            inner += '<label class="sizer-label">Ancho: <input type="range" id="spacingx" min="5" max="150" value="' + gridObj.spacingx + '">';
            inner += '<input type="text" class="sizer-results" value="' + gridObj.spacingx + '"></label>';
            inner += '<label class="sizer-label">Alto: <input type="range" id="spacingy" min="5" max="150" value="' + gridObj.spacingy + '">';
            inner += '<input type="text" class="sizer-results" value="' + gridObj.spacingy + '"></label>';
            inner += '<label class="sizer-label">Opacidad: <input type="range" id="opacity" min="0" max="100" value="' + Number(gridObj.opacity) * 100 + '" step="1"></label>';
            inner += '<div class="sizer-label">Color v: <input type="color" id="basev" value="' + gridObj.basev + '" class="u-mgr--half">';
            inner += 'Color h: <input type="color" id="baseh" value="' + gridObj.baseh + '"></div>';
            gridControls.innerHTML += inner;
            sizeSnitchElem.appendChild(gridControls);
            gridControlsHeader = gridControls.querySelector('.sizer-headerControls');
            gridControlsHeader.appendChild(sizerHider);
            setControlsprops();
        },

        setGridObj = function() {
            var eFirstLetter, prop, val;
            if (hasStorage) {
                gridObj = JSON.parse(hasStorage);
                for (var e in gridObj) {
                    prop = '--' + e;
                    eFirstLetter = e.slice(0, 1);
                    val = eFirstLetter === 'p' || eFirstLetter === 's' ? gridObj[e] + 'px' : gridObj[e];
                    document.body.style.setProperty(prop, val);
                }
            } else {
                gridObj = gridObjDefault;
            }
            localStorage.setItem('bbgrid', JSON.stringify(gridObj));
            createGridControls();
        },

        createSnitch = function(s) {
            //console.log(s);
            sizerLabel = document.createElement('label');
            sizeSnitchElem = document.createElement('div');
            sizerP = document.createElement('p');
            sizerHider = document.createElement('button');
            sizerChechbox = document.createElement('input');
            sizeGridElem = document.createElement('div');
            //sizerHider.innerHTML='Quitar';
            //sizerHider.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 7c2.8 0 5 2.2 5 5 0 .6-.1 1.3-.4 1.8l2.9 2.9c1.5-1.3 2.7-2.9 3.4-4.8-1.7-4.4-6-7.5-11-7.5-1.4 0-2.7.3-4 .7l2.2 2.2c.6-.2 1.3-.3 1.9-.3zm-10-2.7l2.3 2.3.4.4c-1.7 1.3-3 3-3.7 5 1.7 4.4 6 7.5 11 7.5 1.6 0 3-.3 4.4-.8l.4.4 2.9 2.9 1.3-1.3-17.7-17.7-1.3 1.3zm5.5 5.5l1.5 1.6v.6c0 1.7 1.3 3 3 3 .2 0 .4 0 .6-.1l1.6 1.5c-.7.4-1.4.6-2.2.6-2.8 0-5-2.2-5-5 0-.8.2-1.5.5-2.2zm4.3-.8l3.1 3.1v-.2c0-1.7-1.3-3-3-3l-.1.1z"/></svg>';
            sizerHider.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M14.3 4.8l-1.1-1.1-4.2 4.2-4.2-4.1-1 1 4.1 4.2-4.2 4.2 1.1 1.1 4.2-4.2 4.2 4.2 1.1-1.1-4.2-4.2 4.2-4.2z"/></svg>';
            sizeSnitchElem.appendChild(sizerP);
            sizeSnitchElem.appendChild(sizerLabel);
            setGridObj();
        },

        checkCode = function(e) {
            var k = String(e.keyCode);
            if (!k.indexOf(keyStr)) {
                initiated = false;
                return false;
            }
            if (k === keyStr.substr(0, 2)) {
                initiated = true;
            }
            if (!initiated) {
                return false;
            }
            if (input.length >= keyStr.length && input !== keyStr) {
                input = '';
                return false;
            }
            input += k;
            if (input === keyStr) {
                document.removeEventListener('keydown', checkCode);
                input = '';
                createSnitch();
            }

        },

        init = function() {
            
            hasStorage = localStorage.getItem('bbgrid');
            if (hasStorage) {
                document.removeEventListener('keydown', checkCode);
                createSnitch();
                return false;
            }
            document.addEventListener('keydown', checkCode);
        };
    this.init = init;

}).apply(sizeSnitch);
window.addEventListener("load", sizeSnitch.init, false);