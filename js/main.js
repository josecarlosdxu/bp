var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
  return query_string;
}();



function submitLoginPopup(){

    //console.log(arguments);
    popup.removePopup();



}



$(function() {



    //[for="list_view"]



    /*function(e) {
  e.preventDefault();

  positionBtnsDriver.highlight({
    element: '#position-btn-top',
    popover: {
      title: 'Did you know?',
      description: 'You can add HTML in title or description also!',
      position: 'top'
    }
  });
}




    



        const driver = new Driver();
driver.highlight({
  element: '[for="list_view"]',
  popover: {
    title: '<em>An italicized title</em>',
    description: 'Description may also contain <strong>HTML</strong>'
  }
});*/




    






    

    //var mainNav = mainNavOver;
    //mainNav.init();
    //mobileMenuLauncher();


    /*var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    console.log(alphabet)


    function genCharArray(charA, charZ) {
    var letter,a = "", i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {

        letter = String.fromCharCode(i).toUpperCase();
        //a+='<label for="brandlist_'+letter+'" class="nav-item" title="Marcas por '+letter+'">'+letter+'</label>';

         a+='<input type="radio" name="brandlist" id="brandlist_'+letter+'" data-js-uitab="radio" class="inputToggle">\n<div class="tabs-contentPanel" data-js-uitab="panel">\n{{> brandList brandList.brands'+i%3+' title=\''+letter+'\'}}\n</div>\n';


    }
    console.log(a)
    return a;
}
genCharArray('a', 'z'); // ["a", ..., "z"]*/

// console.log(document.querySelectorAll('[data-js-tab="button"]'))

// console.log([].slice.call(document.querySelectorAll('[data-js-tab="button"]')))

 /*$('[data-js-tab="button"]').on('click', function(e) {


    //alert('pp')

    var selClass = 'tabs-item--selected',
     contentSelectedClass ='tabs-contentPanel--selected',
        idPanel = $(this).attr('data-js-tab_idbutton');
    $('.tabs-item--selected').removeClass(selClass);
    $(this).addClass(selClass);

    $('[data-js-tab="panel"]').removeClass(contentSelectedClass);

    $('[data-js-tab_idpanel="' + idPanel + '"]').addClass(contentSelectedClass);
    e.preventDefault();
});*/

















   
    
    loading.init();
    scrollTop.init();
    //uiTooltip.init();
    //accordion.init();
    
    //removeRow();


    imgBoxCarousel.init();

    var showedMenu = false,
    showedBackwardMenu = false;
   /* if($.fn.parallax) {
        $('.P_homeBigBanner-parallax').parallax();
    }*/

     /*$('[data-js-mainnav="link"]').on('click', function(e) {
       // e.preventDefault();
        //console.log($(this));
     });*/


     $('[data-js-tableMsg]').on('click', function(e) {
        e.preventDefault();
        $(this).next().toggle();
     });
     

     $('#header-login').on('click', function(e) {
        var forgetPassBtn, interval;
        e.preventDefault();
        //popup.getPopup('../../views/partials/popups/popup_login.hbs', functionSubmitLoginPopup);
        popup.getPopup('../popups/popup_login.html', submitLoginPopup);
        interval = setInterval(function() {
            forgetPassBtn = document.querySelector('[data-js-forget_passwd]') || false;
            if (forgetPassBtn) {
                clearInterval(interval);
                interval = null;
                $(forgetPassBtn).on('click', resetPassword);
            }
        }, 200);        
    });

    if(QueryString.login === "true"){
        $('#header-login').click();

    }






    /* function toggleBackwardMenu(evt){
         var menuBack = document.querySelector('[data-js-mainnavback="menu"]');
        showedBackwardMenu =!showedBackwardMenu;
        if(showedBackwardMenu){
           menuBack.style.transform = 'scaleY(1)';
           menuBack.style.pointerEvents = 'auto';
           return false;
        }
       menuBack.removeAttribute('style');

     }



     function activateMenuListeners(isOpened){


        if(showedBackwardMenu){
             $('body').off('mouseover', isOutMenu);
        }


        if(isOpened){
             $('[data-js-directory="btn"]').off('mouseover');

             $('[data-js-directory="secundary"]').removeClass('directory-list--showed');
             $('[ data-js-directory="content"]').hide();
             return false;
        }
     }


     function isOutMenu(evt){
        if(getParents (evt.target, ".mainNav-content") === null &&  getParents (evt.target, ".directory-list") === null && true){
            showedMenu = false;
            activateMenuListeners(true);
            toggleBackwardMenu();
        }

     }

     $('[data-js-directory="btn"]').on('click', function(){
        showedBackwardMenu =!showedBackwardMenu;
        activateMenuListeners(showedBackwardMenu);
        toggleBackwardMenu();

    });

    /* $('[data-js-directory="btn"]').on('mouseover', function() {
        $('[ data-js-directory="content"]').show();
        if(!showedMenu){
           toggleBackwardMenu();
           $('body').on('mouseover', isOutMenu);
         }
    });*/

     /*$('.directory-item').on('mouseover', function() {
        showedMenu = !showedMenu;
        if (!showedMenu) {
            return;
        }
        $('[data-js-directory="secundary"]').addClass('directory-list--showed');

    });
*/


    $('[data-js-menulist="button"]').on('click', function() {

        $(this).toggleClass('menuList-button--opened');
        //console.log($this.next())
        $(this).siblings('.menuList-list').toggleClass('menuList-list--opened');


    });


    $('[data-js-menulist="button"]').addClass('menuList-button--opened');

     $('.menuList-list').addClass('menuList-list--opened');
       


    function closeToolbaroptions(e){

        if(getParents(e.target, '.toolbar-options') === null){
             unbindElemHandler.apply(document.body, [closeToolbaroptions, 'mouseover']);
             removeClass( document.querySelector('.toolbar-options--selected'),'toolbar-options--selected');
        }



    }



    $('[data-js-toolbar="options"]').on('click', function() {
        var $btn = $(this),
        $parent = $btn.parent(),
        $openedClass = 'toolbar-options--selected',
        bodyElem = document.body;
        $parent.toggleClass($openedClass);
        bindElemHandler.apply(bodyElem, [closeToolbaroptions, 'mouseover']);

    });















    var helpCenterLink,
    helpCenterLinkFor,
    selectedBtn,
    helpCenterSelectedSection,
    helpCenterLinksList = document.querySelectorAll('[data-js-helpcenter="link"]'),
    helpCenterLinksCount = helpCenterLinksList.length -1;
   while (helpCenterLinksCount > -1){
    helpCenterLink = helpCenterLinksList[helpCenterLinksCount];
    helpCenterLinkFor = helpCenterLink.getAttribute('for');
    helpCenterLink.section = document.querySelector('[data-js-helpsection="'+helpCenterLinkFor+'"]') || false;
    if(!helpCenterLink.section){

        //addClass(helpCenterLink,'menuList-link--disabled');


        helpCenterLink.section = document.querySelector('[data-js-helpsection="indexpage"]');


    }
    helpCenterLinksCount--;

   }


    helpCenterSelectedSection = document.querySelector('.helpSection--selected') || false;
    



    $('[data-js-helpcenter="link"]').on('click', function(e) { 
       var selectedSection,
            btn = $(this)[0],
            attrFor = btn.getAttribute('for') || false,
            selectedSectionClass = 'helpSection--selected';            

       if(!attrFor){
          return;

        }        
        if(helpCenterSelectedSection && helpCenterSelectedSection !== btn.section){
            removeClass(helpCenterSelectedSection,selectedSectionClass); 
            helpCenterSelectedSection = btn.section;
        }       
        addClass(btn.section,selectedSectionClass);
        $('.menuList-link--selected').removeClass('menuList-link--selected');        

    });

     $('[data-js-menulist="link"]').on('click', function(e) {
        $('.menuList-link--selected').removeClass('menuList-link--selected');
        $(this).addClass('menuList-link--selected'); 
    });


    function setFamily(e){
        var family  = $(this).attr(e.data.attr).toLowerCase(),
        numRandom = randomNum(10, 150),
        phrase = 'Mostrar otros productos de '+family,
        phrase2 =  numRandom + ' productos en '+family.toUpperCase(),
        tab = $('[data-js-cardlist="tab"]'),
        banner = $(this).attr('data-js-banner') || false,

        topBg = $('.cardList-bg');
        e.preventDefault();

        $('.cardList-title--huge').text(family);
        $('.cardList-number').text('('+numRandom+')');
        $('[data-js-numproducts]').text(phrase2);








        if(banner){

            topBg.attr('src','../../img/categories/'+banner);
        }










        if($(this).hasClass('menuList-link--selectable')){
            tab.show();
            $('.cardList-btnOpen').text(phrase);
            return false;

        }
        tab.hide();

    }





    function setSubcategory(e){

        e.preventDefault();
        console.log($(this).attr('data-js-subcategory'),' -- subcategory');




    }




















    //$('.cardList-number').css('outline','1px solid black');
   // $('[data-js-cardlist="tab"]').css('outline','1px solid red');



     $('[data-js-family]').on('click',{ attr: 'data-js-family' },setFamily);

     $('[data-js-subcategory]').on('click', { attr: 'data-js-subcategory' }, setFamily);







   

















    $('[name="pack"]').on('change', function() {


        //alert($(this).attr('checked').size());
        //if($(this)[0].checked){

        if ($(this).val() === "5_32") {
            $('[data-js-gadget-otros="pack"]').show();
            return false;

        }
        $('[data-js-gadget-otros="pack"]').hide();

        //
        //}




    });

    $('[data-js-button-next-carrier]').on('click', function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        popup.getPopup('../../views/popups/pages/popup_paypal.hbs', functionSubmitLoginPopup);


    });



    $('[data-js-ticket-action="answer"]').on('click', function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        popup.getPopup('../../views/popups/pages/popup_oracle.hbs', functionSubmitLoginPopup);


    });

    $('[data-js-ticket-action="close"]').on('click', function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        popup.getPopup('../../views/popups/pages/popup_close_ticket.hbs', functionSubmitLoginPopup);


    });

    $('[data-js-ticket-action="followMe"]').on('click', function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        popup.getPopup('../../views/front/partials/popups/popup_stockFollow.hbs', functionSubmitLoginPopup);
    });



    var flag = false;
    $(document).on({
        mouseenter: function() {
            if (!flag) return;
            $(this).removeClass('button--successText');
            $(this).addClass('button--successText_error');
            $(this).find('span').css('display', 'none');
            $('.button--successText_error span.error').show();
        },
        mouseleave: function() {
            if (!flag) return;
            $(this).addClass('button--successText');
            $(this).removeClass('button--successText_error');
            $(this).find('span').css('display', 'none');
            $('.button--successText span.success').show();
        },
        click: function() {
            flag = false;
            if ($('.button--trackText:visible').length) {
                flag = true;
                $(this).removeClass('button--trackText');
                $(this).addClass('button--successText');
                $(this).find('span').css('display', 'none');
                $('.button--successText span.success').show();
            } else {
                flag = false;
                $(this).addClass('button--trackText');
                $(this).removeClass('button--successText');
                $(this).removeClass('button--successText_error');
                $(this).find('span').css('display', 'none');
                $('.button--trackText span.track').show();
            }
        },
    }, '[data-js-ticket-action="btnAction"]');








    //return ($('input[type=radio]:checked').size() > 0);

    /*value="5_32" data-js-gadget="pack" name="pack" id="pack32" class="form-radio">
                        <label title="Sí" for="pack32" class="form-label form-label--inline">Sí</label>
                    </div>
                     <div class="modularGrid-module u-xs-60">
                    <input type="text" placeholder="http://www.mydomain.com"  style="display:none;" data-js-gadget-otros="pack"















*/
//var eventLoading = loading.setLoadingEvent(null, null);
           
               //document.documentElement.dispatchEvent(eventLoading);
           






    function reloadloadPageContents(evt) {
        var eventLoading = loading.setLoadingEvent(null, null),
            eventLoaded = loading.setLoadedEvent(eventLoading),
            timeout = setTimeout(function() {
                clearTimeout(timeout);
                timeout = null;
                document.documentElement.dispatchEvent(eventLoaded);
            }, 3000);
        document.documentElement.dispatchEvent(eventLoading);
    }

    $('[data-js-select="order"]').on('change', reloadloadPageContents);

     function functionSubmitLoginPopup() {
        $('.popup-container').addClass('popup-container--warning');



    }



    


    function resetPassword(e) {
        e.preventDefault();
       // alert(e);



    }


    var collapsablePanelParams = {
        "pattMatch": "data-js-accordionsmall",
        "pattSection": "section",
        "pattScope": ".table--accordionSmall",
        "pattBtn": "btn",
        "sectionActiveClass": "table-accordionSection--active",
        "btnActiveClass": "table-label--active"
    };











    function functionMultipleAc() {

        removeEventHandler(document.documentElement, 'replace', functionMultipleAc);
        /*accordionSmall.getElems.apply(popup.getPopupElem());*/
        collapsablePanel.setParams.apply(collapsablePanelParams);










    }

    $('[data-js-btn="viewDetail"]').on('click', function(e) {
        e.preventDefault();
        popup.getPopup('../../views/front/partials/popups/popup_multiple.hbs');
        addEventHandler(document.documentElement, 'replace', functionMultipleAc);
    });
    $('[data-js-btn="viewDetail1"]').on('click', function(e) {
        e.preventDefault();
        popup.getPopup('../../views/front/partials/popups/popup_unico.hbs');
        // addEventHandler(document.documentElement, 'replace', functionMultipleAc);
    });





    $('[data-js-button-next-order-type]').on('click', function(e) {
        popup.getPopup('../../views/front/partials/popups/popup_multienvio.hbs');
    });


















    /* var mql = window.matchMedia("screen and (max-width: 1024px)");


    mql.addListener(function(mql){
    if (mql.media == "screen and (max-width: 1024px)") {

console.log(mql)
        //alert('ptyuyutyup')
        //do something
    }
});
*/
    //mql.innerHTML ='';


    function hideDownloadCsvLangPanel(e) {

        if ($(e.target).parents('.downloadsCSV-downloadBar').length === 0) {
            $('.downloadsCSV-buttonPanel').removeClass('downloadsCSV-buttonPanel--active');

            $('.downloadsCSV-panelLang').removeClass('downloadsCSV-panelLang--active');
            $('body').off('click', $('body'), hideDownloadCsvLangPanel);

        }

    }





    function showDownloadCsvLangPanel(hasActive) {
        $('.downloadsCSV-panelLang').toggleClass('downloadsCSV-panelLang--active', hasActive);
        if (!hasActive) {
            return;
        }
        $('body').off('click').on('click', hideDownloadCsvLangPanel);
    }





    function downloadCsvBtnAddListener() {
        var elem, hasActive, activeClass = 'downloadsCSV-buttonPanel--active';
        this.off('click').on('click', function(e) {
            elem = $(this);

            $(this).toggleClass(activeClass);

            hasActive = elem.hasClass(activeClass);

            showDownloadCsvLangPanel(hasActive);

        });





    }







    function showDownloadCsvBar() {
        var btn = arguments[0][0],
            method = arguments[0][1];
        this.slideDown(100, function() {
            method.apply(btn);
        });

    }

    function hideDownloadCsvBar() {
        this.slideUp(100)

    }






    $('[data-js-downloadCsv="elem"]').on('click', function(e) {


        var len,
            objNew,


            elem = $(this),

            downBar = $('[data-js-downloadCsv="bar"]'),

            langPanel = $('[data-js-downloadCsv="panel"]'),

            btnDown = $('.downloadsCSV-buttonPanel'),
            activeElemClass = 'downloadsCSV-elem--active',
            activeBtnClass = 'downloadsCSV-buttonPanel--active',
            objShow = {
                method: showDownloadCsvBar,
                params: [btnDown, downloadCsvBtnAddListener]



            },
            objHide = {
                method: hideDownloadCsvBar,
                params: [btnDown]



            };


        elem.toggleClass(activeElemClass);

        len = $('.' + activeElemClass).length > 0;

        if (len && objNew === objShow) {
            return;
        }


        objNew = len ? objShow : objHide;



        objNew.method.apply(downBar, [objNew.params])



    });



















    /*$('.helpCenterNav-itemButton').on('click', function(evt){
        evt.preventDefault();
        evt.stopPropagation();
        popup.getPopup('../../views/front/partials/popups/popup_login.hbs', functionSubmitLoginPopup);


   });
*/









    $('.helpCenterNav-radio').prop('checked', false);







    // $('[data-js-helpbutton]').on('click', function(e) {
    //     var namePage = $(this).attr('data-js-helpbutton'),
    //         page = $('[data-js-helpsection="' + namePage + '"]'),
    //         selectedPageClass = 'helpSection--selected',
    //         accordionItemSelectedClass = 'helpSection-accordionLink--selected',
    //         accordionItemSelected = $('.' + accordionItemSelectedClass),
    //         selectedPage = $('.' + selectedPageClass);

    //     accordionItemSelected.removeClass(accordionItemSelectedClass);

    //     $('.helpSection-accordionPanel').removeAttr('style');
    //     selectedPage.removeClass(selectedPageClass);

    //     if (page.length > 0) {
    //         page.addClass(selectedPageClass);
    //     }
    //     if ($(this)[0].tagName !== 'LABEL') {
    //         $('.helpCenterNav-radio').prop('checked', false);
    //         e.preventDefault();
    //     }
    //     //  accordion.init();





    // });


    // $('[ data-js-helpcenter="helpcenter"]').on('click', function(e) {
    //     $('[ data-js-helpcenter="contents"]').slideToggle(200, function() {
    //         $("html, body").animate({ scrollTop: $(document).height() - $(window).height() }, 200);
    //     });
    //     classToggle($('.helpCenter-icon')[0], 'flipX');
    //     e.preventDefault();
    // });






    var testo = '<aside data-js-popup="popup" class="popup u-lg-50 animated fadeInDown u-pdt cmsContent"><header class="popup-header"><div data-js-popup="close" style="display:none"></div></header><div class="popup-content u-pdt"><div class="modularGrid"><div class="modularGrid-module u-md-30 u-pdr u-tac"><img src="http://localhost/bigbuy_e/public/img/bigbuy_happy.svg" class="popup-img u-mgt u-mgl--half"></div><div class="modularGrid-module u-md-60 u-pdb u-pdl u-brdl u-mgb u-mgl"><h2 class="popup-extra u-mgb u-mgl">Listado de errores</h2> <p>El producto Axe Click Gel de Ducha Hombre 250 ml no está disponible. Por favor, retirelo de su carrito para poder continuar con el proceso de compra</p><p>El producto Axe Click Gel de Ducha Hombre 250 ml no está disponible. Por favor, retirelo de su carrito para poder continuar con el proceso de compra</p>  <button data-js-popup="submitAction" class="button button--primary button--big u-mgl" data-js-popup-error="close">Salir</button></div></div></div></aside>';


    //var div = document.createElement('div');

    //div.innerHTML = testo;//*/


     //popup.setPopup(testo)



    
    //$('#cookie-bar').hide();

    $('[data-js-steps="button1"]').on('click', function(e) {
        $('[data-js-steps="step1"]').removeClass('steps-item--selected').children(0).addClass('steps-number--completed');
        $('[data-js-steps="step2"]').addClass('steps-item--selected');
        $('#stepspanel1').removeClass('tabs-contentPanel--selected');
        $('#stepspanel2').addClass('tabs-contentPanel--selected');
        e.preventDefault();

    });


    $('[data-js-steps="button2"]').on('click', function(e) {
        $('[data-js-steps="step2"]').removeClass('steps-item--selected').children(0).addClass('steps-number--completed');
        $('[data-js-steps="step3"]').addClass('steps-item--selected');
        $('#stepspanel2').removeClass('tabs-contentPanel--selected');
        $('#stepspanel3').addClass('tabs-contentPanel--selected');
        e.preventDefault();

    });



    //Carrito express calcular costes de envío
     $('[data-js-expresscart="estimate"]').on('click', function(e) {
         $('[data-js-expresscart="form"]').hide();
         $('[data-js-expresscart="results"]').show();
     });
     $('[data-js-expresscart="recalculate"]').on('click', function(e) {
         $('[data-js-expresscart="form"]').show();
         $('[data-js-expresscart="results"]').hide();
     });


    //data-js-tab="panel" data-js-tab_idpanel="3">
    //data-js-tab_idbutton="1" data-js-tab="button"





















    //function toggleMainNav() {
    /*mainNav = mainNavClick;

    mainNav.init();
    mainNav.destroy();*/






    //function trazaPopup(e) {

    //console.log(e)



    //}



    //addEventHandler(document.documentElement, 'replace', trazaPopup);






    //}




    //toggleMainNav();



    /* var jsonString = document.querySelector('[data-js-validate]').getAttribute('data-js-validate');

     if(jsonString) {

       var jsonObj = JSON.parse(jsonString.replace(/'/g, '"'));

       console.log(jsonObj);

     }*/






    $('#logoutBtn').on('click', function(e) {
        e.preventDefault();
        $('#login').show();
        $('#logout').hide();

    });




    var functionSubmitPopup = function() {

        $('#login').hide();
        $('#logout').show();

    }








    $('[data-js-register="button"]').on('click', function(e) {
        e.preventDefault();
        popup.getPopup('../../views/front/partials/popup_register.html');
    });



    $('[data-js-activar-pack="button"]').on('click', function(e) {
        e.preventDefault();
        popup.getPopup('../../static/popups/popup_activar_pack.html');
    });





    /*function toggleSticky(add) {
        var method = add ? 'addClass' : 'removeClass';
        nav[method]('mainNav--sticky');
        header[method]('header--sticky');
        content[method]('content--sticky');
        toolbar[method]('toolbar--sticky');
        expresscart[method]('expresscart--sticky');
    }


    var win = $(window),
        nav = $('.mainNav'),
        header = $('.header'),
        content = $('.content'),
        expresscart = $('.expresscart'),
        toolbar = $('.toolbar'),
        pos = header.offset().top + 70,
        sticky = function() {
            toggleSticky(win.scrollTop() > pos);

        }

    win.scroll(sticky);*/



    function toggleStickyFilters(add) {
        var method = add ? 'addClass' : 'removeClass',
            minHeight = add ? filtersBarContainerHeight : 0,
            bgcolor = add ? 'tomato' : 'cyan',
            topBarNum = (win.scrollTop() - asidePos),
            topBar = add ? topBarNum + 'px' : 'auto',
            bottomBar = (topBarNum + minHeight + 50) > content.height() ? 0 : 'auto',
            containerPosition = add ? 'absolute' : 'relative';
        if (bottomBar === 0) {
            topBar = 'auto';
        }
        filtersBarContainer.css({ 'transition': 'bottom 0.5s', 'min-height': minHeight + 'px', 'position': containerPosition, 'top': topBar, 'bottom': bottomBar });
        filtersBar[method]('productListFilters--sticky');
    }






    var win = $(window);









    var isTop, asidePos, asideBarHeight, filtersBarContainerHeight, filtersBarHeight,
        filtersBar = $('.productListFilters'),
        asideBar = $('.asideCart'),
        filtersBarContainer = filtersBar.parent(),

        hasFilters = filtersBar.length > 0,
        /*bodyRect = document.body.getBoundingClientRect(),
        asideBarRect = asideBar[0].getBoundingClientRect(),
        offset   = asideBarRect.top - bodyRect.top,*/

        stickyFilters = function() {


            asideBarHeight = asideBar.height();
            filtersBarHeight = filtersBar.height();
            asidePos = filtersBarHeight + asideBarHeight + 120;
            isTop = win.scrollTop() > asidePos;
            filtersBarContainerHeight = asidePos + filtersBarHeight - 50;
            toggleStickyFilters(isTop);


        }

    if (hasFilters) {
        win.scroll(stickyFilters);
    }








    //console.log($('.asideCart').length)


    //console.log($('.productListFilters').length)

    /**var arrlst =['Batidoras',
    'Amasadoras',
    'Licuadoras',
    'Picadoras',
    'Exprimidores',
    'Freidoras',
    'Tostadoras',
    'Cafeteras',
    'Microondas y hornos',
    'Procesadores de alimentos',
    'Robots de cocina',
    'Hervidores',
    'Sandwicheras',
    'Placas de cocción',
    'Planchas y grills',
    'Fondues',
    'Arroceras',
    'Fondues',
    'Balanzas',
    'Otros electrodomésticos de cocina'];


    var arrreturn ='';
    var arrmu =0;


    for(var k=0;k<arrlst.length;k++){




        var arrNum = randomNum(1, 30) ;
        arrreturn+= '{ "name" : "'+arrlst[k]+'", "number": "'+arrNum+'"},';

        arrmu+=arrNum;





    }

    console.log(arrreturn)

    console.log(arrmu)*/




if(document.querySelector('[data-shoppingcart-step="3"]')){


    popup.getPopup('../popups/popup_deliveryinfo.html', submitLoginPopup);




}

if(document.URL.includes('home2')){
     popup.getPopup('../popups/popup_protectiondata.html', submitLoginPopup);

}


var reviewBtn = document.querySelector('[data-js-add_review]');
if(reviewBtn){
    reviewBtn.addEventListener('click', function(e){
        e.preventDefault();
         document.querySelector('[data-js-comments_head]').classList.add('hide');
         document.querySelector('[data-js_fieldset_comment]').classList.remove('hide');
    })
}














});
