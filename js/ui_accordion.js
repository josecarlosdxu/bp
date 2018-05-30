var accordion = (function (window, undefined) {
    "use strict";
      var accordionsList,
        accordionsListLen,
        panelSelectedClass,
        isOpened,



        openedAttrPattern ='data-js-accordion-open',

        accordionTypeAttr = 'data-js-accordionType',


        elemSelectedAttr = 'data-js-accordion_selected_class',
        patternMatch = 'data-js-accordion',
        patternAccordion = 'accordion',
        patternChevron = 'chevron',
        patternLink = 'link',
        patternPanel = 'panel',
        slideDelay = 250,
        chevronFlipClass = 'flipX',

        //data-js-accordion="chevron"

        closePanel = function(elem){
            var panel = this.panel;
            this.active = false;


            if(!this.context.accordionType) {
                $(panel).slideUp(slideDelay);
            }else{
              removeClass(this.panel,this.context.accordionType);
            }






            removeClass(this.chevron, chevronFlipClass);
            removeClass(this,this.context.elemSelectedClass);
           if(!elem) {
                this.context.selectedElem = null;
                return;
            }
           elem.active? openPanel.apply(elem): this.context.selectedElem = null;
         },

       openPanel = function(){
            var panel = this.panel,
            heightTop = $(".mobileHeader").height();

           /* $(panel).css('max-height',0).show();


             addClass(panel,'animated slideShow');*/

            if(!this.context.accordionType) {
               $(panel).slideDown(slideDelay);
            }else{
              addClass(this.panel,this.context.accordionType);
            }


           this.context.selectedElem = this;
              addClass(this.chevron, chevronFlipClass);
              addClass(this,this.context.elemSelectedClass);
         },

        selectElem = function(e){
           var isActive,elem = e.currentTarget || e.srcElement,
           selectedElem = elem.context.selectedElem;
           elem.active = !elem.active;
          if(selectedElem) {
              closePanel.apply(selectedElem,[elem]);
              return;
          }
          isActive = elem.active ? openPanel.apply(elem): closePanel.apply(elem);

        },

         setLinkElemProps = function (context,index) {
            var pattern = getPattern(patternMatch, patternPanel),
            panel = this.querySelector(pattern) || this.parentNode.querySelectorAll(pattern)[index] || this.parentNode.querySelector(pattern),
            chevron = this.querySelector(getPattern(patternMatch,patternChevron)) || document.createElement('div');

            this.chevron = chevron;
            this.context = context;
            this.panel = panel;
            this.active = false;
            bindElemHandler.apply(this, [selectElem, 'mousedown']);
         },
        getAccordionLinks = function () {

            var  linksList = this.querySelectorAll(getPattern(patternMatch, patternLink)),
            len = linksList.length, i = 0;
            for(i;i<len;i++) {
                   setLinkElemProps.apply( linksList[i],[this,i]);
            }
            this.elemSelectedClass = this.getAttribute(elemSelectedAttr);
            this.accordionType = this.getAttribute(accordionTypeAttr);

            if(this.getAttribute(openedAttrPattern)){

              linksList[0].click();

            }


        },
         setAccordionProps = function () {
            for (var i = 0; i < accordionsListLen; i++) {
                getAccordionLinks.apply(accordionsList[i]);
            }
        },
        getAccordions = function () { ///  find accordions
            var len;
            accordionsList = document.querySelectorAll(getPattern(patternMatch, patternAccordion));
            accordionsListLen = accordionsList.length;
            len =  accordionsListLen > 0 ? setAccordionProps() : null;
        },
        init = function () {
          getAccordions();
        };
    return {
        init: init
    };
})(window);