$(function() {



  var ua = navigator.userAgent;

  var isSafari = false;
  var isChrome = false;

  if (/chrome|crios|crmo/i.test(ua)) {
    isChrome = true;
  }
  else if (/safari|applewebkit/i.test(ua)) {
    isSafari = true;
  }

  if(isSafari) {
    document.documentElement.setAttribute("data-browser", "Safari");
  }


//$('.mainNav-header').bind('touchstart touchmove', false);
//$('.mainNav-menu').bind('touchstart touchmove', true);



  mobileNav.init();
  mobileToolbar.init();
  //accordion.init();

   uiTooltip.init();


  imgBoxMobile.init();


  planCard.init();

  stickyTable.init();
  //sizeSnitch.init();
  loading.init();
  mobileLang.init();

  var logged = false;

 //$('[data-js-helpsection="indexpage"]').show();

 //$('body').addClass('body--locked');


 $('[data-js-menulist="button"]').on('click', function(e){
    var parent = $(this).parents('[data-js-menulist="section"]')[0];
    $(parent).toggleClass('opened');
    
 });



 $('[data-js-helpcenter="link"]').on('mousedown',function(e){
   e.preventDefault();

    popup.getPopup('../../static/popups/popup_helpcenter.html',isSubbmitedPopup);

});





  $('.helpSection--selected').removeClass('helpSection--selected');

/*$('[data-js-menulist="button"]').on('click', function() {
        $(this).toggleClass('menuList-button--opened');
        $(this).siblings('.menuList-list').toggleClass('menuList-list--opened');
});*/



var  collapsablePanelParams = {
   'pattMatch' : 'data-js-accordion',
   'pattSection' :'panel',
   'pattScope' : '[data-js-accordion="accordion"]',
   'pattBtn': 'link',
   'sectionActiveClass': 'mobileTabs-itemContent--selected',
   'btnActiveClass':'mobileTabs-itemHeader--selected'
};

collapsablePanel.setParams.apply(collapsablePanelParams);

//$('[data-js="openMobileCategory"]').css('pointer-events','none');

//var eventLoading = loading.setLoadingEvent(null, null);
           
               //document.documentElement.dispatchEvent(eventLoading);



/*$('[data-js="openMobileCategory"]').on('click', function(e){

  var parentTab = $(this).parents('.cardElem--category'),
  selectedClass ='cardElem--selected'; 
  e.preventDefault();

  console.log($('.cardList--categories '+selectedClass))
  $('.cardList--categories '+selectedClass).removeClass(selectedClass);  
  parentTab.toggleClass(selectedClass);




});*/
//cardElem--category







/*var equalIndexOf = collapsablePanelParams.pattScope.indexOf("=");


  console.log(collapsablePanelParams.pattScope.slice(1,equalIndexOf));


  console.log(collapsablePanelParams.pattScope.slice(equalIndexOf+2,-2));*/







//collapsablePanel.setParams.apply(collapsablePanelParams);




  // var eventLoading = loading.setLoadingEvent(null);

  // document.documentElement.dispatchEvent(eventLoading);


  //$('#cookie-bar .button').on('click', function(evt){
   // evt.preventDefault();

     //$('#cookie-bar').hide();


  //})



function isSubbmitedPopup() {

//console.log('eee')
popup.removePopup();

}

function isLoadedPopup() {

//console.log(arguments[0].currentTarget)

//console.log(document.querySelector('[data-js-popup="popup"]'));

}



  function removeRow(e) {
    var target =$(this),
    row = target.parents('[data-js-cartRow="row"]');
    row.fadeOut( 300, function() {
      row.remove();

  });
    e.preventDefault();
  }

  $('[data-js-cartRow="buttonRemove"]').on('mousedown', removeRow);



  $('.focus_input_mobile').focus( function() {
    $('html,body').animate({scrollTop: $('.top_label_mobile').offset().top}, 200);
  });




  function functionSubmitPopup() {

    if((' ' + document.body.className + ' ').indexOf('ioslocked') > -1){


      popup.removePopup();
      document.body.classList.remove('ioslocked');
      return false;

    }
     



     var userRoute, userBtn = $('[data-js-btn="userBtn"]');

     $('[data-js-btn="loginBtn"]').toggleClass('buttonLogin--logout');
     userBtn.toggleClass('buttonUser--business').toggleClass('buttonUser--newuser');
     userRoute = logged === true ? 'forms.html' : '../mobileback/home.html';
     userBtn.attr('href', userRoute);
     logged = !logged;
 }



$('[data-js-btn="multienvioBtn"]').on('mousedown',function(e){
    var route ='../../static/popups/',
      path = 'popup_multi_mobile.html';
      e.preventDefault();     
      popup.getPopup(route+path);

  });






  $('[data-js-btn="loginBtn"]').on('mousedown',function(e){
    var route ='../../static/popups/',
      path = logged === true? 'popup_signout.html': 'popup.html';
       document.body.classList.add('ioslocked');
      e.preventDefault();
      popup.getPopup(route+path, functionSubmitPopup);

  });


$('[data-js-popuplauncher]').on('mousedown',function(e){
    popup.getPopup($(this).attr('data-js-popuplauncher'),isSubbmitedPopup);

});


    $('[data-js-ticket-action="followMe"]').on('click', function(evt){
        evt.preventDefault();
        evt.stopPropagation();
         popup.getPopup('../../views/popups/pages/popup_stockFollow.hbs', isSubbmitedPopup);
         //popup.getPopup('../../views/popups/pages/popup_searchTickets.hbs', isSubbmitedPopup);
    });


    $('[data-js-ticket-action="searchTickets"]').on('click', function(evt){
        evt.preventDefault();
        evt.stopPropagation();
        popup.getPopup('../../views/popups/pages/popup_searchTickets.hbs', isSubbmitedPopup);
    });

     $(document).on({
        click: function () {
            if($('.button--trackText:visible').length) {
                 $(this).removeClass('button--trackText');
                 $(this).addClass('button--successText');
                 $(this).find('span').css('display','none');
                 $('.button--successText span.success').show();
            } else {
                $(this).addClass('button--trackText');
                $(this).removeClass('button--successText');
                $(this).removeClass('button--successText_error');
                $(this).find('span').css('display','none');
                $('.button--trackText span.track').show();
            }
        },
    }, '[data-js-ticket-action="btnAction"]');




addEventHandler(document.documentElement, 'replace', isLoadedPopup);










$('[data-js-mainNav="btnMore"]').on('mousedown',function(e){
  e.preventDefault();
  $('[data-js-mainNav="menu"]').removeClass('mainNav--enter');
  $('[data-js-mainNav="submenu"]').removeClass('mainNav--enter');
  $('[data-js-mainNav="menu"]').addClass('mainNav--leave');
  $('[data-js-mainnav="header"]').addClass('mainNav-header--hide');
  $('[data-js-mainnav="headerAlt"]').removeClass('mainNav-header--hide');


});

$('[data-js-mainnav="headerAlt"]').on('mousedown',function(e){
  e.preventDefault();

  $('[data-js-mainNav="menu"]').removeClass('mainNav--leave');
  $('[data-js-mainNav="submenu"]').removeClass('mainNav--enter');
  $('[data-js-mainNav="menu"]').addClass('mainNav--enter');
  $('[data-js-mainnav="header"]').removeClass('mainNav-header--hide');
  $('[data-js-mainnav="headerAlt"]').addClass('mainNav-header--hide');

});


$('[data-js-results-action="filter"]').on('click',function(evt){
    evt.preventDefault();
    evt.stopPropagation();
    popup.getPopup('../../views/popups/pages/popup_filterProducts.hbs', isSubbmitedPopup);

});









if(document.querySelector('.shoppingCart')){

  popup.getPopup('../popups/popup_deliveryinfo.html', isSubbmitedPopup);




}

if(document.URL.includes('home2')){

     popup.getPopup('../popups/popup_protectiondata.html', isSubbmitedPopup);

}








});