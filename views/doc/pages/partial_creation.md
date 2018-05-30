---
title:          Partials
categories:     general
---


Un partial es una pieza de código atómica, reutilizable y autocontenida. Puede ser un menú, un thumbnail, una ficha de producto o cualquier otro componente de un site que aparece en diversas partes y en diferentes contextos.

## Función

Un partial se crea para ser incluído en diferentes contextos dentro de un proyecto. Trabajar con partials nos permite __encapsular__ y articular el proyecto en pequeñas piezas manejables. Facilita el mantenimiento de proyectos a gran escala aunque limita las opciones de diseño disponibles.

## Composición de un partial

Un partial se compone de un HTML, un SCSS, un HBS con la documentación y opcionalmente un archivo JSON con datos de prueba y configuraciones. 


##Ejemplo de un partial
En el siguiente ejemplo se encuentran el típico código u las rutas por defecto de las diferentes partes del partial.

###HTML
__views/partials/productCard.hbs__

Este es el snippet que se incluirá en el proyecto cada vez que se haga un include de handlebars del tipo \{{ productCard \}}

```
<article class="productCard">
    <img    class="productCard-img" src="http://placehold.it/10x10" alt="">
    <div    class="productCard-title">title</div>
    <div    class="productCard-pvp">pvp</div>
    <div    class="productCard-pvp">pvp</div>
    <div    class="productCard-pvp">pvp</div>
    <button class="productCard-ctaButton">placeholder</button>
</article>
```
###SCSS
__scss/partials/_productCard.scss__

Todo partial es agnóstico. No sabe ni debe saber el contexto en el que está siendo usado. Toda variación del partial se hará desde los layouts que lo importen. Esto nos permite reutilizarlo en el máximo de contextos posibles. A la hora de realizar un partial es importante mantener esta filosofía de trabajo para no cerrar posibles usos del partial.

```
@include block(productCard) {

    display: inline-block;
    font-size: 1rem;
    width: 100%;

    @include element(img) {
        @extend %img--responsive;
    }

    @include element(title) {
        
    }

    @include element(pvp) {
        
    }

    @include element(ctaButton) {
        
    }
}
```

###HBS
__views/pages/doc/productCard.hbs__

Esta misma página que estás viendo se ha renderizado usando markdown
```
---
title:          Partials
categories:     general
---


Un partial es una pieza de código atómica, reutilizable y autocontenida. Puede ser un menú, un thumbnail, una ficha de producto o cualquier otro componente de un site que aparece en diversas partes y en diferentes contextos.

## Función

Un partial se crea para ser incluído en diferentes contextos dentro de un proyecto. Trabajar con partials nos permite __encapsular__ y articular el proyecto en pequeñas piezas manejables. Facilita el mantenimiento de proyectos a gran escala aunque limita las opciones de diseño disponibles.

## Composición de un partial

Un partial se compone de un HTML, un SCSS, un HBS con la documentación y opcionalmente un archivo JSON con datos de prueba y configuraciones.

...
```

## Uso correcto 

Todas estas partes son necesarias para que el partial pueda ser usado dentro del proyecto y se genere la documentación correspondiente.