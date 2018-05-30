var newMenu,
    delayedMenu = {},   
    sliders = [],
    slidersLen;
$(".js_slider").each(function() {
    var slider = new Slider($(this));
    sliders.push(slider);
    slider.init();

});



(function() {
    var newMenu ,
        activeClass = 'mainNav-content--active',
        ishoverIntentActive = false,        
        opts = {
            sensitivity: 6,
            timeout: 0,
            interval: 100
        },

        removehoverIntent = function(elem) {
            var hoverTo = hoverintent(elem, function() {

            }, function() {

            });
            hoverTo.remove();
        },


        addhoverIntent = function(elem) {
            var hoverTo = hoverintent(elem, function(e) {
                this.classList.add(activeClass);
                bodyBlur(true);
            }, function(e) {
                this.classList.remove(activeClass);
                 bodyBlur(false);
            }).options(opts);
        };
    this.init = function() {
         newMenu = document.querySelector(getPattern('data-js', 'mainNav-menuNew'))|| false;       
         if(newMenu){
            newMenu = document.querySelector(getPattern('data-js', 'mainNav-menuNew')).parentElement;
            addhoverIntent(newMenu);
            ishoverIntentActive = true;
         }      

    };


}).apply(delayedMenu);

window.addEventListener("load", delayedMenu.init, false);