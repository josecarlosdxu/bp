function Slider($sliderContainer) {
    var self = this;
    var isMobile = false;
    var $win = $(window);
    var $sliderContent = $sliderContainer.find(">ul");
    var $slides = $sliderContent.find(">li");
    var $pages = $();
    var $nav = $();
    var $ajaxConf=null;
    var $ajaxResult=new Array();
    var $ajaxResultLength = 0;
    var $ajaxResultCurrentIndex = 0;
    var enableAjax=true;
    var slidesCount = $slides.length;
    var speed = 800;
    var flickTimeout = 400;
    var swipeThreshold = 10;
    var autorotateInterval = $sliderContainer.data("autorotate");
    var transitioning = false;
    var touchMoving = false;
    var $eventLoaded = null;
    var $eventLoading = null;
    var transition = Modernizr.prefixed("transition");
    var transitionend = {
        "WebkitTransition" : "webkitTransitionEnd",
        "MozTransition"    : "transitionend",
        "OTransition"      : "oTransitionEnd",
        "msTransition"     : "MSTransitionEnd",
        "transition"       : "transitionend",
        "false"            : "transitionend"
    }[transition];
    var sliderWidth, currentIndex, startX, startY, deltaX, deltaY, isFlick, swiping, transitioning, autorotateTimer;

    //if (slidesCount < 2) return;

    isMobile = $win.innerWidth() <= 481;

    function init(ajaxOpt) {
       
        if(slidesCount < $sliderContent.find(">li").length){

            $slides = $sliderContent.find(">li");
            slidesCount = $slides.length;
            //$("<div class='nav'/>").remove();
            /*
            $slides.each(function(i) {
                $("<a>" + (i+1) + "</a>").remove();
            });*/

        }

        var $pager = $("<span/>");
        $nav = $("<div class='nav'/>").append($pager);

        currentIndex = ($slides.filter(".current").index() + 1 || 1) -1;
        $sliderContent.width(100 * slidesCount + "%");
        $sliderContent.css({position: 'relative',
                            transition: 'none'});
        $slides.width(100 / slidesCount + "%");
        $slides.each(function(i) {
            $("<a>" + (i+1) + "</a>").appendTo($pager)
            .off("touchstart")
            .on("touchstart", function(e) {
                e.preventDefault();
                $(this).one("touchend", function(e) {
                    e.preventDefault();
                    if (touchMoving) return false;
                    go(i);
                });
            }).off("click").on("click", function(e) {
                e.preventDefault();
                if (touchMoving) return false;
                go(i);
            });
        });

        if($sliderContainer.attr('data-js-slider')!=='no-slider'){

        $("<a class='forth' style='display:none;'><svg role='img' class='icon icon--inline icon--md'><use xlink:href='"+baseUri+"public/img/icons/svg-defs.svg#icon-chevronNextCircle'></use></svg></a>").appendTo($nav)
        .off("touchstart")
        .on("touchstart", function(e) {
            e.preventDefault();
            $(this).one("touchend", function(e) {
                e.preventDefault();
                if (touchMoving) return false;
                forth();
            });

        }).off("click").on("click", function(e) {
            e.preventDefault();

            if (touchMoving) return false;
            forth();

        });

        $sliderContainer.parents('.productSlider').find('.productSlider-chevron.forth')
        .off("touchstart")
        .on("touchstart", function(e) {
            e.preventDefault();
            $(this).one("touchend", function(e) {
                e.preventDefault();
                if (touchMoving) return false;
                forth();
            });

        }).off("click").on("click", function(e) {
            e.preventDefault();

            if (touchMoving) return false;
            forth();

        });

        }


        if($ajaxConf==null && typeof ajaxOpt !== 'undefined'){
            $eventLoading = loading.setLoadingEvent(null, $sliderContainer[0]);
            $eventLoaded = loading.setLoadedEvent($eventLoading);
            $ajaxConf=ajaxOpt;
            $ajaxResultLength=$ajaxResult.push($sliderContent.find(".current").first().html());
            $sliderContainer.parents('.productSlider').find('.productSlider-chevron.back').hide();
        }else{
            if($sliderContainer.attr('data-js-slider')!=='no-slider'){
            $("<a class='back' style='display:none;'><svg role='img' class='icon icon--inline icon--md'><use xlink:href='"+baseUri+"public/img/icons/svg-defs.svg#icon-chevronBackCircle'></use></svg></a>").prependTo($nav)
            .off("touchstart")
            .on("touchstart", function(e) {
                e.preventDefault();
                $(this).one("touchend", function(e) {
                    e.preventDefault();
                    if (touchMoving) return false;
                    back();
                });
            }).off("click").on("click", function(e) {
                e.preventDefault();
                if (touchMoving) return false;
                back();
            });

            $sliderContainer.parents('.productSlider').find('.productSlider-chevron.back')
            .off("touchstart")
            .on("touchstart", function(e) {
                e.preventDefault();
                $(this).one("touchend", function(e) {
                    e.preventDefault();
                    if (touchMoving) return false;
                    back();
                });
            }).off("click").on("click", function(e) {
                e.preventDefault();
                if (touchMoving) return false;
                back();
            });

            }
        }

        $pages = $pager.find(">a");
        $pages.eq(currentIndex).addClass("active");
        arrange($slides.eq(currentIndex));
        moveBy(0, true);

        $sliderContainer.append($nav);
        window.setTimeout(function() {
            $sliderContainer.addClass("ready");
        }, 0);

        $win.on("resize orientationchange", function() {
            sliderWidth = $sliderContainer.width();
        }).trigger("resize");
        $sliderContent.on("touchstart", touchstart);
        if (!!autorotateInterval && !Modernizr.touch) {
            autorotateInterval = autorotateInterval * 1000;
            $sliderContainer.on("mouseenter", function() {
                autorotate(0);
            }).on("mouseleave", function() {
                autorotate(autorotateInterval);
            });
            autorotate(autorotateInterval);
        }

        $slides.show();
    }

    function isSwipe(threshold) {
        return Math.abs(deltaX) > Math.max(threshold, Math.abs(deltaY));
    }

    function touchstart(e) {
        if (transitioning) return false;
        touchMoving = true;
        //e.preventDefault(); // for testing on desktop, remove later
        deltaX = deltaY = 0;
        if (e.originalEvent.touches.length == 1) {
            startX = e.originalEvent.touches[0].pageX;
            startY = e.originalEvent.touches[0].pageY;
            $sliderContent.on("touchmove touchcancel", touchmove).one("touchend", touchend);
            isFlick = true;
            window.setTimeout(function() {
                isFlick = false;
            }, flickTimeout);
        }
    }

    function touchmove(e) {
        deltaX = startX - e.originalEvent.touches[0].pageX;
        deltaY = startY - e.originalEvent.touches[0].pageY;
        if (isSwipe(swipeThreshold)) {
            e.preventDefault();
            e.stopPropagation();
            swiping = true;
        }
        if (swiping) {
            moveBy(deltaX / sliderWidth, true)
        }
    }

    function touchend(e) {
        var threshold = isFlick ? swipeThreshold : sliderWidth / 2;
        if (isSwipe(threshold)) {
            deltaX < 0 ? back() : forth();
        } else {
            // if swipe threshold is not reached, transition back if X != 0, but don't turn transition on if we landed directly on X == 0
            moveBy(0, !deltaX);
        }
        swiping = false;
        $sliderContent.off("touchmove", touchmove).one(transitionend, function() {
            moveBy(0, true);
            touchMoving = false;
        });
    }

    function moveBy(direction, instantly) {
        var deltaX = -(direction + currentIndex) * 100;
        var s = instantly ? 0 : speed;
        if (!!transition && Modernizr.csstransforms3d) {
            $sliderContent.css({
                // left: deltaX + "%", // sloppy on android
                //transform: "translate3d(" + deltaX / slidesCount + "%,0,0)", // flickering on iOS
                 transform: "translate(" + deltaX / slidesCount + "%,0)", // best compromise - only strange on android stock browser
                transition: ["all ", s, "ms"].join("")
            });
        } else {
            $sliderContent.animate({
                left: deltaX + "%"
            }, s, function() {
                s && $sliderContent.trigger(transitionend);
            });
        }
    }

    function go(targetIndex, direction) {

        if (transitioning) return false;
        if (typeof targetIndex != "number" || targetIndex == currentIndex || transitioning) return;
        transitioning = true;

        if($ajaxConf!==null){
            if(direction==1){
                if($ajaxResultCurrentIndex<($ajaxResultLength-1))
                    $ajaxResultCurrentIndex++;
                else
                    $ajaxResultCurrentIndex=0;


                $sliderContent.find(".next").first().html($ajaxResult[$ajaxResultCurrentIndex]);

                $slides.filter(".next").find('.lazy').lazyload();
                $slides.filter(".next").find('.lazy').trigger("appear");

            }else{
                if(direction==-1){
                    if($ajaxResultCurrentIndex>0)
                        $ajaxResultCurrentIndex--;
                    else
                        $ajaxResultCurrentIndex=$ajaxResultLength-1;

                    if (slidesCount > 2){

                        $sliderContent.find(".prev").first().html($ajaxResult[$ajaxResultCurrentIndex]);


                        $slides.filter(".prev").find('.lazy').lazyload();
                        $slides.filter(".prev").find('.lazy').trigger("appear");

                    }else{

                        $sliderContent.find(".next").first().html($ajaxResult[$ajaxResultCurrentIndex]);

                        $slides.filter(".next").find('.lazy').lazyload();
                        $slides.filter(".next").find('.lazy').trigger("appear");

                    }
                }
            }

            if($ajaxResultCurrentIndex===0){
                $sliderContainer.find('.productSlider-title a.back').hide();
            }
            else
                $sliderContainer.find('.productSlider-title a.back').show();

            cart.productCardEvents();
        }


        targetIndex = targetIndex % slidesCount;
        var $currentSlide = $slides.filter(".current");
        currentIndex = $currentSlide.index();
        if (!direction) {
            $slides.eq(targetIndex).addClass("target");
        }
        direction = direction || targetIndex - currentIndex;

        moveBy(direction);


        $sliderContent.one(transitionend, function() {
            arrange($slides.eq(targetIndex));

            transitioning = false;

            if ((direction == 1 && targetIndex == 0)
                || (direction == -1 && targetIndex == slidesCount - 1)) {
                moveBy(0, true);
            }
        });

        $pages.length && $pages.removeClass("active").eq(targetIndex).addClass("active");
    }

    function forth() {


       if(enableAjax && $ajaxConf!==null && slidesCount <2 /*&& $slides.filter(".next").index() === 0*/){
            $("<a class='back' style='display:none;'><svg role='img' class='icon icon--inline icon--md'><use xlink:href='"+baseUri+"public/img/icons/svg-defs.svg#icon-chevronBackCircle'></use></svg></a>").prependTo($nav)
            .off("touchstart")
            .on("touchstart", function(e) {
                e.preventDefault();
                $(this).one("touchend", function(e) {
                    e.preventDefault();
                    if (touchMoving) return false;
                    back();
                });
            }).off("click").on("click", function(e) {
                e.preventDefault();
                if (touchMoving) return false;
                back();
            });
            $sliderContainer.parents('.productSlider').find('.productSlider-chevron.back').show()
            .off("touchstart")
            .on("touchstart", function(e) {
                e.preventDefault();
                $(this).one("touchend", function(e) {
                    e.preventDefault();
                    if (touchMoving) return false;
                    back();
                });
            }).off("click").on("click", function(e) {
                e.preventDefault();
                if (touchMoving) return false;
                back();
            });

            transitioning = true;
            ajaxSlide($sliderContent, $ajaxConf['args'], $ajaxConf['initOffset'], $ajaxConf['initLimit'], $ajaxConf['url'], 0, 1, 1, false, true);
            //ajaxSlide($sliderContent, $ajaxConf['args'], $ajaxConf['initOffset'], $ajaxConf['initLimit'], $ajaxConf['url'], 0, 1);

       }
       if(enableAjax && $ajaxConf!==null && slidesCount >= 2){
                ajaxSlide($sliderContent, $ajaxConf['args'], $ajaxConf['initOffset'], $ajaxConf['initLimit'], $ajaxConf['url'], 0, 1, 1, true);
       }

       go($slides.filter(".next").index(), 1);

    }

    function back() {
        //$slides.filter(".prev").find('.lazy').trigger("appear");

        if (slidesCount > 2)
            go($slides.filter(".prev").index(), -1);
        else
            go($slides.filter(".next").index(), -1);
    }

    function arrange($currentSlide) {
        var $prevSlide = $currentSlide.prev().length ? $currentSlide.prev() : $slides.last();
        var $nextSlide = $currentSlide.next().length ? $currentSlide.next() : $slides.first();
        currentIndex = $currentSlide.index();
        $slides.removeClass("current prev next target last-child");
        $currentSlide.addClass("current");
        if (slidesCount > 2)
            $prevSlide.addClass("prev")
            .filter(":last-child").addClass("last-child"); // for IE7 support only

        $nextSlide.addClass("next");
    }

    function autorotate(interval) {

        if (interval && !isMobile) {
            autorotateTimer = window.setInterval(forth, interval);
        } else {
            clearInterval(autorotateTimer);
        }
    }

    function ajaxSlide(container,cat, offset, limit, url, sort, stock, append, async, reExecSucces, goForth){
        var ret=false;
        enableAjax=false;
        if(typeof append === 'undefined'){
             append=1;
         }

         if(typeof goForth === 'undefined'){
             goForth=false;
         }

         if(typeof async === 'undefined'){
             async=false;
         }

         if(typeof reExecSucces === 'undefined'){
             reExecSucces=false;
         }

         if(!async)
            showLoadingAnimation(container);



        var dataPost={
                init: offset,
                limit: limit,
                args: cat,
                filters: {
                            order:[0],
                            stock:[0]
                        },
                ajax: 1,
                slider: 1
            };

        if($ajaxConf['rand']){
            dataPost['rand']=$ajaxConf['rand'];
            dataPost['filters']['order']=[6];
        }

        $.ajax({
            type:'post',
            url: url,
            datatype:'json',
            async:true,
            data:dataPost,
            success:function(result){
                var json = eval('(' + result + ')');

                ret={
                    'init':json.init,
                    'nextCallNum': json.next_call_num,
                    'show':json.show
                        };

                if(json.show){

                $ajaxResultLength=$ajaxResult.push(json.data);

                json.data='<li class="productSlider-item">'+json.data+'</li>';
                if(!async){
                    if(append)
                        container.append(json.data);
                    else
                        container.html(json.data);
                }

                //$(".lazy").lazyload();

                $ajaxConf['initOffset']=json.init;
                $ajaxConf['initLimit']=json.next_call_num;


                //init();
                /*recaculo*/
                if(!async){
                    if(slidesCount < $sliderContent.find(">li").length){

                        $slides = $sliderContent.find(">li");
                        slidesCount = $slides.length;
                    }

                    var $pager = $("<span/>");
                    $nav = $("<div class='nav'/>").append($pager);

                    currentIndex = ($slides.filter(".current").index() + 1 || 1) -1;
                    $sliderContent.width(100 * slidesCount + "%");
                    $sliderContent.css({position: 'relative',
                                        transition: 'none'});
                    $slides.width(100 / slidesCount + "%");

                    $pages = $pager.find(">a");
                    $pages.eq(currentIndex).addClass("active");
                    arrange($slides.eq(currentIndex));
                    //moveBy(0,true);

                    hideLoadingAnimation();

                    transitioning = false;



                }
                /*recaculo*/

                if(typeof json.ga_productlist != 'undefined'){
                    var ga_pl_count=0;
                    $.each(json.ga_productlist,function(){

                        ga('ec:addImpression', this);

                        if(ga_pl_count>=50){
                            ga_pl_count=0;
                            ga('send', 'pageview');
                        }else{
                            ga_pl_count++;
                        }
                    });
                    ga('send', 'pageview');
                }

                enableAjax=ret.show;

                }



                if(reExecSucces){
                    ajaxSlide(container,cat, $ajaxConf['initOffset'], $ajaxConf['initLimit'], url, sort, stock, append, async, 0,true);
                }

                if(goForth){
                    go($slides.filter(".next").index(), 1);
                }

            }
        });

        return ret;
    }

    function showLoadingAnimation(container){

        document.documentElement.dispatchEvent($eventLoading);
    }

    function hideLoadingAnimation(){
        document.documentElement.dispatchEvent($eventLoaded);
    }

    return {


        init : init,

        autorotate : autorotate





    }





}
