  var collapsablePanel = {};

  (function() {
      "use strict";
      var pattMatch = 'data-js-accordion',
          pattScope = 'accordion',
          pattLink = 'link',         
          pattBtnSel = 'data-js-accordion_selected_class',
          getElems = function() {
              var count = 0,
                  func = arguments[0],
                  ptMatch = arguments[1],
                  ptElem = arguments[2],
                  pattAlt = arguments[3] || false,
                  funcArg = arguments[4] || '',                 
                  patt = pattAlt ? pattAlt : getPattern(pattMatch, ptElem),
                  list = this.querySelectorAll(patt),
                  len = list.length;
              if (len === 0) {
                  return false;
              }
              while (count < len) {
                  func.apply(list[count], [funcArg]);
                  count++;
              }
          },
          setBtnProps = function(btn){                 
              var scope = getParents(btn, getPattern(pattMatch, pattScope))[0],
                  btnSelClass = scope.getAttribute(pattBtnSel),                  
                  btnClass = btn.getAttribute('class'),
                  previouSelElem = scope.querySelector('.'+btnSelClass ) || false,
                  hasPreviousSel = previouSelElem ? previouSelElem.classList.remove(btnSelClass): false, 
                  hasBtnSel = btnClass.indexOf(btnSelClass) > -1 ? removeClass(btn, btnSelClass) : addClass(btn, btnSelClass);                 
                  return scope; 
          },
          setTabState = function(e) {
              var btn = e.currentTarget,
                  panel = btn.nextElementSibling,
                  scope = setBtnProps(btn),                  
                  panelSelClass = scope.getAttribute('data-js-accordiontype'),                 
                  panelClass = panel.getAttribute('class'),                 
                  hasPanelSel = panelClass.indexOf(panelSelClass) > -1 ? removeClass(panel, panelSelClass) : addClass(panel, panelSelClass);
          },
          setTrState = function(e) {
            var scope = setBtnProps(e.currentTarget); 
            //console.log(scope);             

          },
          setAccordionModel = function() {
              var hasMobileTabs = this.getAttribute('data-js-accordiontype') || false;
              if (hasMobileTabs) {
                  getElems.apply(this, [bindElemHandler, pattMatch, pattLink, null, setTabState]);
              } else {
                  getElems.apply(this, [bindElemHandler, pattMatch, pattLink, null, setTrState]);
              }
          },
          getAccordionsList = function() {
              getElems.apply(document, [setAccordionModel, pattMatch, pattScope]);
          };

      this.init = function() {
          getAccordionsList();
      };
      this.setParams = function() {
          //console.log('setParams'); //// to prevent old synntax call
      };

  }).apply(collapsablePanel);
  window.addEventListener('load', collapsablePanel.init, false);
