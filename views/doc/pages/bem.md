---
title:          BEM
categories:     nmss
scss:           ' scss/nm/utils/_bem.scss'
---

Este proyecto utiliza nomenclatura [BEM](http://bem.info/) en las clases de la SCSS así como un conjunto de mixins para la creación y mantenimiento de los nombres de clases. Toda la especificidad de la css se ha anulado a excepción de los modificadores de bloque. 

##Usage

###Crear un bloque
Crea un bloque en el root, todo elemento debe existir dentro del contexto de un bloque.

```
@include block(blockName) {
    // properties
}
```
###Crear un elemento
Crea un elemento en el root usando el nombre del bloque al estilo bem. Esto no crea un nesting de bloque-elemento, sólamente los relaciona por nombre de clase.

```
@include element(elementName) {
    // properties
}
```


Hay una serie de reglas que hay que seguir a la hora de crear un bloque, elemento o modificador

## Variations


## SCSS
{{embed scss}}
