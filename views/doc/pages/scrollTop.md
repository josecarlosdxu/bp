---
title:          scrollTop
categories:     javascript

---

El módulo __scrollTop__ se utiliza para mostrar, ocultar  y manejar el botón que permite subir hasta la cabecera de la página.

El nombre del archivo del script es __ui_scrollTop.js__.


##Uso

###Activación del módulo scrollTop
Una vez se haya cargado el contenido de la página, hay que activar el módulo __scrollTop__,  ejecutando el método __scrollTop.init()__

```
scrollTop.init();

```

###Funcionamiento

Él módulo __scrollTop__ buscará  el elemento  en el __DOM__ cuyo atributo __data-js-scrolltop__ sea igual a __button.__



En caso de no encontrarlo, no realiza ninguna acción de escucha.


