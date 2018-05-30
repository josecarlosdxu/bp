var circularCharts = {};
(function() {
    "use strict";
    var chromeTrumpHeight,
        circularChartsContainer,
        circularChartsList,

        delay =60/2000,



        maxChartPercentValue = 306,

        jsAnchorPatt = 'data-js',

        activateAttrName = jsAnchorPatt + '-active',


        chartMatch = jsAnchorPatt + '-chart',
        chartMatchParam = 'circular',
        chartsContMatchParam = 'circular_charts_container',

        /*vTabsContPatt = '[' + tabPatt + '="vertical"]',
        vPanelPatt = '[' + tabPatt + '="panel"]',*/

        checkIsVisible = function() {
            var isVisible = isScrolledIntoView(circularChartsContainer) ? setScrollListener(false) : null;

        },

        setScrollListener = function(booleanvalue) {
            var bool = booleanvalue || false;

            console.log(bool)


        },


////  create steps for animation 


        //$({value: 0}).animate({value: amount}, {
        //             duration: speed ,
        //             // easing:'swing',
        //             step: function() {
        //                 $(element.siblings('.number')).text(commaSeparateNumber(Math.round(this.value)));
        //             }
        //         });

        //         






        //removeScrollListener


        /*getElemHeight = function(elem) {
            return elem.offsetHeight + chromeTrumpHeight;
        },
        /*setVPanelHeight = function(elem) {
          heightsList.push(getElemHeight(elem));  
        };*/




        getDashOffset = function(chart) {
            var percent = parseInt(chart.getAttribute('data-js-percent'));
            return maxChartPercentValue-(Math.round(maxChartPercentValue * percent / 100));
        },


        updateChartNumber = function(chart) {  
            /*var request,
                actualValue = 0,               
                limit = parseInt(chart.limit),
                increment = Math.floor(limit *delay),                
                numberField = chart.number,
                requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
               cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame,
            redraw = function() {  
                if(actualValue < limit){
                    actualValue+= increment;                    
                    numberField.innerHTML = commaSeparateNumber(actualValue); 
                    request = requestAnimationFrame(redraw);
               }  else{               
                numberField.innerHTML = commaSeparateNumber(limit);   
                window.cancelAnimationFrame(request);
               }  
            }; 
            request = requestAnimationFrame(redraw);*/
            

        },

        activateChart = function(chart) {          
          chart.setAttribute(activateAttrName, ''); 
          chart.circle.style.strokeDashoffset = chart.dashoffset;
          updateChartNumber(chart)

            

        },



        setChartProps = function(chart) {
            chart.index = arguments[1];
            chart.limit = chart.getAttribute('data-js-limit');
            chart.dashoffset = getDashOffset(chart);
            chart.circle = chart.querySelector(getPattern(chartMatch, 'circle'));
            chart.number = chart.querySelector(getPattern(chartMatch, 'number'));









            //requestAnimationFrame(setChartNumber)






            // document.querySelector(getPattern(chartMatch, chartsContMatchParam));

            /*set attribute data-js-active

            chart.limit =  data-js-limit

             chart.percent   data-js-percent


             chart.circle  data-js-chart="circle"


              style stroke-dashoffset   stroke-dashoffset: 0 * percent;

              306 153 0*/

















        },



        getElems = function(circularCharts) {
            circularChartsContainer = document.querySelector(getPattern(chartMatch, chartsContMatchParam));
            circularChartsList = [].slice.call(circularCharts);
            circularChartsList.map(setChartProps);



            circularChartsList.map(activateChart);


            //activateChart(circularChartsList[0])


            /*isVisible = isScrolledIntoView(circularChartsContainer)

            if (isScrolledIntoView(circularChartsContainer)) {
                setScrollListener(true);
            };*/

            // creae scroll event listener
            //get scroll posY container
            //get window height
            //---if show container at bottom of page
            // activate charts animation
            // delete scroll event listener

            //set charts props

            //window.addEventListener("scroll", function() { console.log(isScrolledIntoView(circularChartsContainer)) }, false);


            //console.log(window.scrollY)



        };
    this.init = function() {
        var circularCharts = document.querySelectorAll(getPattern(chartMatch, chartMatchParam)) || [],
            hasCircularCharts = circularCharts.length > 0 ? getElems(circularCharts) : null;


        /* var userAgent,
           vTabsCont = document.querySelector(vTabsContPatt) || false;

         if (!vTabsCont) {
             return false;
         }
         userAgent = navigator.userAgent;        
         chromeTrumpHeight = userAgent.includes('Chrome') && userAgent.indexOf('Edge')< 0 ? 7 : 0;
         heightsList=[getElemHeight(vTabsCont)];
         [].slice.call(vTabsCont.querySelectorAll(vPanelPatt)).map(setVPanelHeight);
         vTabsCont.style.height = Math.max.apply(null, heightsList) +'px';*/
    };
}).apply(circularCharts);
window.addEventListener("load", circularCharts.init, false);


function isScrolledIntoView(el) {
    var elemTop = el.getBoundingClientRect().top;
    var elemBottom = el.getBoundingClientRect().bottom;

    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    return isVisible;
}

function commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    }
    return val;
}









/*

function add20() {
  TweenMax.to(game, 2, {score:"+=500", roundProps:"score", onUpdate:updateHandler, ease:Ease.easeOut});
}
function commaSeparateNumber(val){
            while (/(\d+)(\d{3})/.test(val.toString())){
              val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
          }
          return val;
 }
        
function updateHandler() {
  scoreDisplay.innerHTML = commaSeparateNumber(game.score);
}

*/














// data-js-chart

//data-js-chart="circular_charts"



// <div class="charts-item" data-js-chart="circular" data-js-limit="1150" data-js-percent="100">
// <svg class="charts-svg">
// <circle class="charts-circle" cx="50%" cy="100%" r="54%" fill="none"/>
// <circle class="charts-circle charts-circle--top" cx="50%" cy="100%" r="54%" fill="none" data-js-chart="path"/>
// </svg> 
// <p class="charts-number" data-js-chart="number">0</p>
// <h4 class="charts-title">Marcas</h4>
// </div>




// $({value: 0}).animate({value: amount}, {
//             duration: speed ,
//             // easing:'swing',
//             step: function() {
//                 $(element.siblings('.number')).text(commaSeparateNumber(Math.round(this.value)));
//             }
//         });

//         function commaSeparateNumber(val){
//             while (/(\d+)(\d{3})/.test(val.toString())){
//               val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
//           }
//           return val;
//       }
