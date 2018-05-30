---
title:          popup
categories:     javascript
scss:           'scss/front/_popup.scss'
---

El módulo __popup__ se utiliza para mostrar una ventana emergente.
Utiliza el fondo  creado por __loading__, o crea uno nuevo para bloquear los elementos de la página donde se muestra.

El nombre del archivo del script es __ui_popup.js__.



##Uso



###Mostrar un nuevo popup
Disponemos de 2 métodos públicos para mostrar un __popup__.

* __getPopup__: Si el elemento es el resultado de una petición __AJAX__
* __setPopup__: Si disponemos de un objeto __DOM__ a mostrar



```
/// --- petición AJAX

popup.getPopup(url);

/// --- objeto DOM

popup.setPopup(object);

```

## SCSS
{{embed scss}}
