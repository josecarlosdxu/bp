  var accordionSmall = (function(window, undefined) {
      "use strict";
      var pattern = 'data-js-accordionSmall',
          btnPatt = 'btn',
          sectionPatt = 'section',
          selectedBtn = false,
          selectedSection = false,
          sectionClass = false,
          btnClass = false,

          toggleSelected = function() {
              if (!selectedSection && !selectedBtn) {
                  return false;
              }
              if (selectedSection === arguments[0] && selectedBtn === this) {
                  return false;
              }
              removeClass(selectedSection, sectionClass);
              removeClass(selectedBtn, btnClass);
          },
          setState = function(evt) {
              var btn = evt.target,
                  section = btn.section;
              toggleSelected.apply(btn,[section]);
              classToggle(section, sectionClass);
              classToggle(btn, btnClass);
              selectedBtn = btn;
              selectedSection = section;
          },
          setActiveClasses = function(sectionElem) {
              if (sectionClass && btnClass) {
                  return false;
              }
              sectionClass = sectionElem.getAttribute('data-js-activeclass');
              btnClass = this.getAttribute('data-js-activeclass');
          },

          setBtnProps = function() {
              var sectionTarget = this.parentNode.parentNode.nextElementSibling,
                  sectionElem = findElem(pattern, sectionPatt, sectionTarget);
              setActiveClasses.apply(this, [sectionElem]);
              this.section = sectionElem;
              bindElemHandler.apply(this, [setState]);
          },
          getElems = function() {
             var target = this || arguments[0],
                  count = 0,
                  btnMatch = getPattern(pattern, btnPatt),
                  btnList = target.querySelectorAll(btnMatch),
                  len = btnList.length;
              while (count < len) {
                  setBtnProps.apply(btnList[count]);
                  count++;
              }
              target = count = btnMatch = btnList = len = null;

          };
      return {
          getElems: getElems
              /*   TODO  → PREPARAR PARA QUE PUEDA NO SER EXCLUYENTE*/
      };

  })(window);
