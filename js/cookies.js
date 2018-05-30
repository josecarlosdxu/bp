
//Para ocultar barra al hacer scroll

window.addEventListener("scroll", hideCookies);
function hideCookies(){
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
        document.getElementById("cookie-bar").classList.add('hide-cookies');
    }
}

//Para ocultar barra al hacer click en aceptar
$(document).ready(function(){
    $(".button-cookies").on("click", function(){
        document.getElementById("cookie-bar").classList.add('hide-cookies');
    });
 });