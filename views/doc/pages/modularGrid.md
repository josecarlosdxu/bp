---
title:          modularGrid
categories:     nmss
scss:           ' scss/nm/modules/_modularGrid.scss'
---

modularGrid es la pieza angular sobre la que se asientan el resto de partes del framework. Es un sistema de módulos inline-block estricto. Esto significa que todo elemento que se ubique en una vista determinada debe ser hijo de un modularGrid-module y estar dentro de un modularGrid.

```
<div class="modularGrid">
    <div class="modularGrid-module">
        Aquí va el contenido
    </div>
</div>
```

##Maquetación sin columnas y proporcional

A diferencia de otros grids responsive, modularGrid no utiliza rows ni columnas, sino el concepto de __field__. Un modularGrid genera un nuevo contexto de bloque en el que se asientan el resto de módulos, este contexto puede ser tanto horizontal como vertical.

Al ser inline-block, todo modularGrid-module se coloca inmediatamente después del anterior hasta que se haya llegado al total del ancho disponible. Después, el siguiente elemento se ubicará por debajo del bloque que le precede. Esto nos permite simular un comportamiento de grid al aplicar el sistema de proporciones responsive.

Por defecto el framework genera una serie de utilidades para asignar anchos a los elementos en base a los breakpoints que hayamos definido en el archivo de variables. Si quisieramos un módulo al 50% del ancho disponible haríamos

```
<div class="modularGrid">
    <div class="modularGrid-module u-xs-50">
        Aquí va el contenido
    </div>
</div>
```

##Mobile first
Las prioridades de los breakpoints van de menor a mayor tamaño, de forma que si utilizamos
```
<div class="modularGrid">
    <div class="modularGrid-module u-xs-50 u-xl-80">
       Este contenido ocupará el 50% en el breakpoint xs y el 80% en el breakpoint xl
    </div>
</div>
```

<div class="modularGrid modularGrid--reveal">
    <div class="modularGrid-module u-xs-50 u-xl-80">
        Este contenido ocupará el 50% en el breakpoint xs y el 80% en el breakpoint xl
    </div>
</div>

Primero se aplicará un ancho del 50% al breakpoint XS, __así como a los siguientes__ SM, MD, LG hasta llegar al XL donde se aplicaría el 80%.
Si no aplicáramos ninguna clase XS, por defecto el ancho sería 100% hasta llegar al breakpoint XL


##Anidando el grid
Todo grid puede ser anidado __dentro de un modularGrid-module__. Es incorrecto anidar un modularGrid dentro de otro sin pasar primero por un modularGrid-module. En código de un grid completo anidado sería el siguiente.

<div class="modularGrid modularGrid--reveal">
    <div class="modularGrid-module u-md-60">
        <p>Módulo al 60%</p>
        <div class="modularGrid">
            <div class="modularGrid-module u-md-50">
                <p>Contenido al 50%</p>
            </div>
            <div class="modularGrid-module u-md-50">
                <p>Contenido al 50%</p>
            </div>
        </div>
    </div>
    <div class="modularGrid-module u-md-40">
        <p>Módulo al 40%</p>
        <div class="modularGrid">
            <div class="modularGrid-module">
                <p>Contenido al 100%</p>
            </div>
        </div>
    </div>
</div>

## Variaciones

__Boxed__: Centra el grid y le asigna el tamaño máximo de ancho disponible dentro de un breakpoint. Esta variación se usa en grids de primer nivel para maquetar la vista general.
```
<div class="modularGrid modularGrid--boxed"></div>
```

## SCSS
{{embed scss}}

## Sublime Snippets

grid
```
<div class="modularGrid"></div>
```
mod
```
<div class="modularGrid-module"></div>
```