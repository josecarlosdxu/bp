---
title:          expressCart
categories:     javascript
scss:           'scss/shared/_expressCart.scss'
---

El módulo __expresscart__ se utiliza para mostrar y ocultar el __carrito express__.

El nombre del archivo del script es __ui_expresscart.js__.



##Uso

###Activación del módulo expressCart
Una vez se haya cargado el contenido de la página, hay que activar el módulo __expressCart__,  ejecutando el método __expressCart.init()__

```
expressCart.init();

```
###Funcionamiento

Él módulo __expressCart__ buscará  __2 elementos__ en el __DOM__ con el atributo __data-js-expresscart.__

Estos serán:

* __boton de apertura__: Elemento con el valor del atributo __data-js-expresscart__ igual a  __toolbar-expresscart-btn__

* __carrito express__: Elemento con el valor del atributo __data-js-expresscart__  igual a  __expresscart__

En caso de no encontrarlos, no realiza ninguna acción de escucha.


## SCSS
{{embed scss}}
