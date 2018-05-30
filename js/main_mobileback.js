$(function() {
    mobileNav.init();
    mobileToolbar.init();
    accordion.init();
    mobileSearch.init();
    stickyTable.init();
    //sizeSnitch.init();
    loading.init();
    mobileLang.init();

    function isSubbmitedPopup() {
            if (arguments[0].getAttribute('data-js-downloads') === 'bigBtn') {
                document.location = "../bigbuy_es_demo.csv";
            }
        }
        //popupPropsObj = {isMobile:true, bodyLockClass:'body--locked'}
        //popup.setProps(popupPropsObj);
        /*function removeRow(e) {
      var target =$(this),
      row = target.parents('[data-js-cartRow="row"]');
      row.fadeOut( 300, function() {
        row.remove();
    });
      e.preventDefault();
    }
    $('[data-js-cartRow="buttonRemove"]').on('mousedown', removeRow);
    $('[data-js-btn="loginBtn"]').on('mousedown',function(e){
      e.preventDefault();
      popup.getPopup('../../views/mobile/partials/popups/popup.html', functionSubmitPopup, ['sesión iniciada']);
  });*/
    $('[data-js-mobileInput]').on('focus', function(e) {
        e.preventDefault();
        $('.mobileHeader').addClass('mobileHeader--hide');
    });
    $('[data-js-mobileInput]').on('blur', function(e) {
        e.preventDefault();
        $('.mobileHeader').removeClass('mobileHeader--hide');
    });
    $('[data-js-popuplauncher]').on('mousedown', function(e) {
        popup.getPopup($(this).attr('data-js-popuplauncher'), isSubbmitedPopup, $(this)[0]);
    });

    $('[data-js-ticket-action="searchTickets"]').on('click', function(evt){
      console.log(evt);
        evt.stopPropagation();
        evt.preventDefault();
        popup.getPopup('../../views/popups/pages/popup_searchTickets.hbs', isSubbmitedPopup);
    });

    $('[data-js-ticket-action="clearFollow"]').on('click', function(evt){
      console.log(evt);
        evt.stopPropagation();
        evt.preventDefault();
        popup.getPopup('../../views/popups/pages/popup_clearFollow.hbs', isSubbmitedPopup);
    });


    function functionSubmitPopup() {
        document.location = "../mobile/home.html";
    }
    $('[data-js-btn="loginBtn"]').on('mousedown', function(e) {
        var route = '../../static/popups/',
            path = 'popup_signout.html';
        e.preventDefault();
        popup.getPopup(route + path, functionSubmitPopup);
    });

    function toggleDownBtns(result) {
        //console.log(result)
        var btnList = document.querySelectorAll('[data-js-downloads="bigBtn"]'),
            param = 'disabled';
        Array.prototype.slice.call(btnList).forEach(function(el) {
            var applyMethod = result ? el.removeAttribute(param) : el.setAttribute(param, param);
        });
    }
    $('[data-js-downloads="btn"]').on('mousedown', function(e) {
        e.preventDefault();
        $(this).toggleClass('btnDownloads--selected');
        toggleDownBtns($('.btnDownloads--selected').length > 0);
    });


/*new Morris.Bar({
  // ID of the element in which to draw the chart.
  element: 'myfirstchart',
  // Chart data records -- each entry in this array corresponds to a point on
  // the chart.
  data: [
    { month: 'Enero',       euro: 4250 },
    { month: 'Feb.',     euro: 3150 },
    { month: 'Marzo',       euro: 2350 },
    { month: 'Abril',       euro: 4540 },
    { month: 'Mayo',        euro: 2980 },
    { month: 'Junio',       euro: 1450 },
    { month: 'Julio',       euro: 5950 },
    { month: 'Agosto',      euro: 950 },
    { month: 'Sept.',  euro: 1250 },
    { month: 'Oct.',     euro: 5150 },
    { month: 'Nov.',   euro: 2350 },
    { month: 'Dic.',   euro: 6230 }
  ],
  // The name of the data record attribute that contains x-values.
  xkey: ['month'],
  // A list of names of data record attributes that contain y-values.
  ykeys: ['euro'],
  // Labels for the ykeys -- will be displayed when you hover over the
  // chart.
  labels: ['importe en €']
});*/


if(document.querySelector('img[src*="wallet"]')){


  

 popup.getPopup('../popups/popup_success.html', isSubbmitedPopup);

  //popup.getPopup('../popups/popup_deliveryinfo.html', isSubbmitedPopup);



}




//<img src="../../img/icons/wallet.svg" class="icon u-fll u-op-20 icon--lg u-mgr--half">




});
