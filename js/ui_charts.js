var circularCharts = {};
(function() {
    "use strict";
    var chromeTrumpHeight,
        circularChartsContainer,
        circularChartsList,
        drawTimeSeconds = 2,
        maxChartPercentValue = 255,
        jsAnchorPatt = 'data-js',
        activateAttrName = jsAnchorPatt + '-active',
        chartMatch = jsAnchorPatt + '-chart',
        chartMatchParam = 'circular',
        chartsContMatchParam = 'circular_charts_container',

        getDashOffset = function(chart) {
            var percent = parseInt(chart.getAttribute('data-js-percent'));
            return maxChartPercentValue - (Math.round(maxChartPercentValue * percent / 100));
        },

        updateChartNumber = function(tween, chart) {
            chart.number.innerHTML = commaSeparateNumber(tween.target.digits);
        },

        activateChart = function(chart) {
            var tweenObj = { digits: 0 };
            chart.setAttribute(activateAttrName, '');
            chart.circle.style.strokeDashoffset = chart.dashoffset;
            TweenMax.to(tweenObj, drawTimeSeconds, { digits: chart.limit, roundProps: "digits", onUpdate: updateChartNumber, onUpdateParams: ["{self}", chart], ease: Ease.easeOut });
        },

        setChartProps = function(chart) {
            chart.index = arguments[1];
            chart.limit = chart.getAttribute('data-js-limit');
            chart.dashoffset = getDashOffset(chart);
            chart.circle = chart.querySelector(getPattern(chartMatch, 'circle'));
            chart.number = chart.querySelector(getPattern(chartMatch, 'number'));
        },

        launchCharts = function() {
           
            if (isScrolledIntoView(circularChartsContainer)) {
                window.removeEventListener("scroll", launchCharts);
                circularChartsList.map(activateChart);
            }
        },

        getElems = function(circularCharts) {
            circularChartsContainer = document.querySelector(getPattern(chartMatch, chartsContMatchParam));
            circularChartsList = [].slice.call(circularCharts);
            circularChartsList.map(setChartProps);
            launchCharts();
            window.addEventListener("scroll", launchCharts, false);
        };

    this.init = function() {
        var circularCharts = document.querySelectorAll(getPattern(chartMatch, chartMatchParam)) || [],
            hasCircularCharts = circularCharts.length > 0 ? getElems(circularCharts) : null;
    };
}).apply(circularCharts);
window.addEventListener("load", circularCharts.init, false);

function isScrolledIntoView(el) {

    var body= document.body,
    bodyStyle = window.getComputedStyle(body),
    bodyPaddingTop = parseInt(bodyStyle.getPropertyValue('padding-top'))*2,
    rect = el.getBoundingClientRect(),
    elemTop = rect.top,
    elemBottom = rect.bottom,
    isVisible = (elemTop + bodyPaddingTop >= 0) && (elemBottom - bodyPaddingTop <= window.innerHeight + bodyPaddingTop);    
    return isVisible;
}

function commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    }
    return val;
}

