



















$(function() {






  uiBack.init();
  loading.init();

  //mainNavBack.init();

  selectGroup.init();

  checkActions.init();

  //downloadBanners.init();

  menuPanel.init();
  //uiTooltip.init();

  uploadFile.init();
  accordion.init();
  


   //$('[data-js-button-next-order-type]').on('click', function(e) {
        //popup.getPopup('../../views/front/partials/popups/popup_exencion.hbs');
   // });









  function testFunction(){
    var paramObj = arguments[0];
    alert('Test\nobject {\n  tipo: '+paramObj.tipo+',\n  cantidad: '+paramObj.cantidad+'\n}');
  }


  //uiWallet.minPrice(300);
  uiWallet.externalMethod(testFunction);


   $('[data-js-gadget="sector-otros"]').on('click', function(e) {

      var display = $('[data-js-gadget-otros="sector-otros-input"]').css("display");
      if(display == "none")
        $('[data-js-gadget-otros="sector-otros-input"]').show();
      else
        $('[data-js-gadget-otros="sector-otros-input"]').hide();

   });
   $('[data-js-gadget="venta-otros"]').on('click', function(e) {

      var display = $('[data-js-gadget-otros="venta-otros-input"]').css("display");
      if(display == "none")
        $('[data-js-gadget-otros="venta-otros-input"]').show();
      else
        $('[data-js-gadget-otros="venta-otros-input"]').hide();

   });





  function toggleAdress(e){
    e.preventDefault();

  $('#formToggle2').toggle();
  $('#formToggle1').toggle();
  $('#btnToggleForm').toggle();



  }



$('#btnToggleForm').on('click', toggleAdress);


$('#btnToggleForm2').on('click', toggleAdress);



function hideNewAdress(e){
    e.preventDefault();

 $('#newBillingAdress').hide();
$('[data-js-panel-name="panel01"]').show();


}


  $('[data-js-orderrepeat="button"]').on('click',function(e){
    e.preventDefault();
    popup.getPopup('../../views/back/partials/popup_repeatOrder.html');
  });


  $('[data-js-ticket-action="clearFollowback"]').on('click', function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        popup.getPopup('../../views/back/partials/popups/popup_clearFollowback.hbs', functionSubmitLoginPopup);
  });

   function functionSubmitLoginPopup() {
        $('.popup-container').addClass('popup-container--warning');

        // $('#login').hide();
        //$('#logout').show();

    }


var stockRow = 0;















function showNewAdress(e){
    e.preventDefault();



 $('#newBillingAdress').show();

$('[data-js-panel-name="panel01"]').hide();

$('[data-js-show="toggletabBillingAdress"]').css('z-index',1).on('click',hideNewAdress);



  }


$('[data-js-showPanel="newBillingAdress" ]').on('click',showNewAdress);


$('[data-js-blockstocks="search" ]').on('click',function(e) {

  $('[data-js-blockstocks="productlist" ]').slideDown(100);

   e.preventDefault();



});





$('.productCard-ctaButton').on('click', function(e){

        var newHref,
        tableResultsNewRow,
        btn = $(this),
        primaryBtn = $('[data-js-blockstocks="primaryButton"]'),

        tableRow =$('[data-js-idcartproduct="3541"]'),
        tableResults =  $('[data-js-blockstocks="table"]'),
        tableResultsTbody =  $('[data-js-blockstocks="tbody"]'),
        tableResultsRow = tableResultsTbody.children(),
        btnElem = btn[0],
        btnSvgUseElem = btn.children()[0].childNodes[0],
        btnSvgUseHref = btnSvgUseElem.getAttribute('xlink:href');

        if(tableResultsRow){
              tableResultsNewRow = tableResultsRow.clone();
         }

        // console.log(stockRow)




     if(stockRow >0 ){
       // console.log(tableResultsNewRow)
          tableResultsTbody.append(tableResultsNewRow);
           stockRow++ ;

      }else{
          tableResults.slideDown(100);
          stockRow=1 ;
           primaryBtn.fadeIn(100);

      }






    $('[data-js-delete-product]').on('click',function(e){

      var len = tableResultsTbody.children().length,
      lastChild =  tableResultsTbody.children().last();
      if(len > 1){
             lastChild.remove();
      }   else{
           tableResults.slideUp(100);
            primaryBtn.fadeOut(100);

       //
           stockRow=0 ;
         }
               e.preventDefault();
               showTable();

        });



        primaryBtn.on('click',function(e){
          $('[data-paneltabbtn="tab2"]').click();

          e.preventDefault();

        });




          e.preventDefault();

});













  $('[data-panelTabBtn]').on('click', function(){

    var elemSelected,
    tabSelected,
    attrVal,
    elem = $(this),

    className = 'panel-tabs-item--active';

    if(!elem.hasClass(className)){
       elemSelected = $('.panel-tabs-item--active');
    }else{
     return;
    }

     elemSelected.removeClass(className);
     elem.addClass(className);

     attrVal = elemSelected.attr('data-panelTabBtn');
     $('#'+attrVal).hide();
     attrVal = elem.attr('data-panelTabBtn');
     $('#'+attrVal).show();




});




  $('.productCard-action').on('click',function(e){
    e.preventDefault();
    popup.getPopup('../../views/back/partials/popup_OptionsBlock.html');
  });



  $('[data-js-mainsubmenu]').on('click',function(){

      $(this).next('.mainNavMenu--submenu').slideToggle(100);

    //$(this).next('.mainNav-submenu').slideToggle(100);




  })







  if($('#myfirstchart').length === 0) {

  	//console.log('escape falsy / no se encuentra el chart "myfirstchart" ➜ traza desde main_back.js');

  	return false;
  }




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
});

/*Morris.Donut({
  element: 'myfirstchart2',
  data: [
    {label: "PayPal", value: 8500},
    {label: "Transferencia", value: 6500},
    {label: "Credit Card", value: 2150}
  ],
  formatter: function (y, data) { return y + '€' }
});*/




});


document.addEventListener("DOMContentLoaded", function(e) {



  function functionSubmitLoginPopup() {

    console.log(document.querySelector('.popup-container'));
        //$('.popup-container').addClass('popup-container--warning');

        // $('#login').hide();
        //$('#logout').show();

    }

  


  if(document.getElementById('panelwallet')){

     popup.getPopup('../popups/popup_success.html', functionSubmitLoginPopup);



}
   
  });




/*document.addEventListener('load', function(){




}) ;*/
