/*
///     Ejemplo de uso creando dos objetos eventLoading ← objetos de precarga.///
///
///     Definimos un destino para el objeto eventLoading ← carga
///     → var destino =  document.querySelector(pattern),
///
///     Creamos un elemento a mostrar en lugar de la animación por defecto
///     → div = document.createElement('div'),
///
///     Creamos un nuevo objeto eventLoading
///     El primer parámetro es el elemento a añadir o reemplazar. Si su valor es nulo, se muestra la capa de animación de carga por defecto.
///     El segundo parámetro es el destino donde se añadirá el objeto loading. Si su valor es nulo, se añade  por defecto al body.
///     → eventLoading = loading.setLoadingEvent(null, destino),
///
///
///     Creamos otro nuevo objeto eventLoading ← carga
///     → newEventLoading = loading.setLoadingEvent(div),
///
///     Creamos un nuevo objeto eventLoaded ← descarga
///     El primer parámetro es el eventLoading que cierra cuando se lanza (despacha).
///     → newEventLoaded = loading.setLoadedEvent(newEventLoading),
///
///
///     Creamos otro objeto eventLoaded ← descarga
///     → eventLoaded = loading.setLoadedEvent(eventLoading);
///
///     Lanzamos (despachamos) los eventos
///
///     → document.documentElement.dispatchEvent(eventLoading);    ← lanza el evento loading nº 1
///     → document.documentElement.dispatchEvent(newEventLoading); ← lanza el evento loading nº 2
///     → document.documentElement.dispatchEvent(eventLoaded);     ← lanza el evento loaded que cierra el evento loading nº 1
///
///    -------------------------------------------------------------------------------------------------------------------------*/

var loading = (function (window, undefined) {
    "use strict";
    var dc,
        body,
        doc,
        eventLoading,
        attributeName = 'data-loading',

        generateIdCont = function(){
            var idCont = Math.round(Math.random()*10000000000);
            return idCont;
        },

        resetLoadingEvt = function() {
             eventLoading = {'detail':{'destination':0,'idCont':0}};
        },

        removeLoadingCont = function(obj) {
             obj.parentNode.removeChild(obj);
             resetLoadingEvt();
        },

        loadingClose = function (e) {
            //alert(e)
            var detail = e.detail,
                idCont = detail.idCont,
                pattern = '[' + attributeName + '="' + idCont + '"]',
                containerObj = document.querySelector(pattern);
            if (containerObj) {
                removeLoadingCont(containerObj);
            }

        },

        loadingShow = function (e) {
            //alert(p)
            var detail = e.detail,
                destination = detail.destination,
                bgContainer = detail.bgContainer;
            bgContainer.removeAttribute('style');
            destination.appendChild(bgContainer);

        },

        createContainers = function (e) {
            var detail = e.detail,
                contentObj = detail.contentObj,
                destination = detail.destination,

                loadingBg = createNewElem('popup-container'),
                loadingGrid = createNewElem('modularGrid modularGrid--boxed paddingHack'),
                loadingMod = createNewElem('modularGrid-module');

            loadingMod.appendChild(contentObj);
            loadingGrid.appendChild(loadingMod);
            loadingBg.appendChild(loadingGrid);

            loadingBg.setAttribute(attributeName, e.detail.idCont);

             if (destination !== body) {
                addClass(loadingBg, 'popup-container--inside');

            }
            e.detail.elemContainer = loadingMod;
            e.detail.bgContainer = loadingBg;

        },


        replaceContent = function(e) {
             var detail =  e.detail,
                contentObj = detail.contentObj,
                bgContainer = eventLoading.detail.bgContainer,
                elemContainer = eventLoading.detail.elemContainer;
               

                bgContainer.setAttribute(attributeName, detail.idCont);
                elemContainer.innerHTML="";
                elemContainer.appendChild(contentObj);

                e.detail.elemContainer = elemContainer;
                e.detail.bgContainer = bgContainer;
                //window.scrollTo(0, 0);
                //console.log(e)
        },


       checkLoadingState = function (e) {

           var sameDestination,
               loadingDetail = eventLoading.detail,
               detail = e.detail;

           if(loadingDetail.idCont === 0) {   // si no hay loading
               eventLoading = e;
               createContainers(e);
               loadingShow(e);
               return;
           }

           sameDestination = loadingDetail.destination === detail.destination;

           if(sameDestination) {
                replaceContent(e);
           } else {
               createContainers(e);
               loadingShow(e);
           }
           eventLoading = e;
        },

        setLoadingEvent = function (elm, dest) {
            var destination = dest || body,
            elem = elm || createNewElem('loading'),
            evtLoad = new CustomEvent('loading', {
                'detail': {
                    'destination': destination,
                    'contentObj': elem,
                    'idCont':generateIdCont()
                }
            });  
            addEventHandler(doc, 'loading', checkLoadingState);
            return evtLoad;
        },

        setLoadedEvent = function (eLoad) {
            var eventLoaded = new CustomEvent('isloaded', {
                'detail': {
                    'idCont': null
                }
            }),
            evtLoad = eLoad  || setLoadingEvent();
            eventLoaded.detail.idCont = evtLoad.detail.idCont;
            addEventHandler(doc, 'isloaded', loadingClose);
            return eventLoaded;
        },
       setValues = function () {
            dc = document;
            body = dc.body;
            doc = dc.documentElement;
            resetLoadingEvt();
        },

        init = function () {
            setValues();
        };
    return {
        init: init,
        setLoadingEvent: setLoadingEvent,
        setLoadedEvent: setLoadedEvent

    };

})(window);




