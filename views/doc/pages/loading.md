---
title:          loading
categories:     javascript
scss:           'scss/nm/modules/_loading.scss'
---

El módulo __loading__ se utiliza para mostrar una animación de precarga.
Crea un fondo que bloquea el acceso a los elementos del contenedor donde se muestra.

El nombre del archivo del script es __ui_loading.js__.

##Uso

###Activación del módulo loading
Una vez se haya cargado el contenido de la página, hay que activar el módulo __loading__,  para tener acceso a sus métodos públicos, ejecutando el método __loading.init()__

```
loading.init();
```
###Crear un nuevo objeto eventLoading
Creamos un nuevo objeto de evento __eventLoading__, el cual lanzaremos posteriormente.
El objeto admite dos parámetros opcionales

```
var eventLoading = loading.setLoadingEvent(param1, param2);

```


El primer parámetro es el elemento a añadir o reemplazar. Si su valor es nulo, se muestra la capa de animación de carga por defecto.
El segundo parámetro es el __destino__ donde se añadirá el objeto __loading__. Si su valor es nulo, se añade  por defecto al body.

###Crear un nuevo objeto eventLoaded
Creamos un nuevo objeto de evento __eventLoaded__, el cual lanzaremos posteriormente para cerrar el objeto  __eventLoading__.
Al crear el objeto __eventLoaded__  se le añade como parámetro el objeto __eventLoading__ que debe cerrar.

```
var eventLoaded = loading.setLoadedEvent(eventLoading);

```
###Lanzar (despachar) los eventos

```
document.documentElement.dispatchEvent(eventLoading);    ← lanza el evento loading

///---

document.documentElement.dispatchEvent(eventLoaded);     ← lanza el evento loaded que cierra el evento loading

```

## SCSS
{{embed scss}}
