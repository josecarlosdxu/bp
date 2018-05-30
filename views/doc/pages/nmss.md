---
title:          Introducción
categories:     nmss
---


NMSS es un framework desarrollado internamente para el proyecto de tienda online y administrador de Bigbuy.

NMSS es un framework de componentes abstractos, su función es proveer comportamientos comunes (listas, menús, grids, breakpoints) a proyectos CSS de gran tamaño. No comtempla decisiones estéticas y está pensado para ser extendido con un patrón multiclase o con @extend de SASS.

Implementa un GRID responsive modular sin columnas ni filas, un sistema de proporciones porcentuales y un patrón de estructura modular tipo BEM.

Este framework y la metodología asociada a su uso responde a la necesidad de desligar comportamiento de estructura y visualización. En proyectos a gran escala es común mezclar las diferentes capas que conforman el front. Esto hace difícil su mantenimiento y la incorporación de nuevos requisitos.

##Soporte
NMSS soporta IE9+, Firefox y Chrome así como Chrome para Android 4.2+

##Funcionalidad por capas

NMSS se estructura en capas de menor a mayor especificidad:

* __Skinning__: theme
* __Components__: objects, blocks
* __Abstractions__: utils , modules
* __Scaffolding__: normalize, base values, variables



##Scaffolding
Es esta capa se agrupan los resets, normalizes, display modes y en general todas las convenciones base del proyecto, así como las variables de breakpoints, tamaño de fuente y márgenes por defecto de los elementos.

##Abstractions
Las abstracciones comprenden las utilidades responsive, modular grid, listas de navegación y todos aquellos "modulos" SCSS

##Components
Son los bloques propios del proyecto, ajenos al framework, pero que extiende a éste para dotarse de comportamiento si en necesario. Digamos que son los módulos de SMACSS o los Bloques de BEM.

##Skinning


Esta documentación incluye los siguientes apartados:

* __General__:  Guía de uso y convenciones
* __Partials__: Referencia de los módulos e includes
* __Nmss__:     Framework responsive


## Tecnología

Este proyecto se basa en [assemble.io](http://assemble.io) para la creación de los tests estáticos y esta misma documentación. Utiliza SCSS 3.3.0 para la gestión de la css y html5 para la estructura del contenido.

##Convenciones

Este proyecto utiliza nomenclatura [BEM](http://bem.info/) en las clases de la SCSS así como un conjunto de mixins para la creación y mantenimiento de los nombres de clases. Toda la especificidad de la css se ha anulado a excepción de los modificadores de bloque.

Para más información consultar el [módulo BEM](bem.html)