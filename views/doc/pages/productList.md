---
title:          productList
categories:     partials
scss:           'scss/front/_productList.scss'
partial:        'views/front/partials/productList.hbs'
---


El bloque __'productList'__ es la manera de presentar listas de __'productCard'__, o ficha de producto.

## Variaciones

* __fullpage__
* __related__
* __asideCart__
* __menu__
* __slides__
* __slidesHalf__


## Ejemplos de uso


### Lista de productos ➜ class="productList"

<div class="modularGrid">
<div class="modularGrid-module u-lg-15 u-mgb">
<div class="productList">
{{> productListContents }}
</div>
</div>
</div>

### Lista de productos modo fullpage ➜ class="productList productList--fullpage"


<div class="modularGrid">
<div class="modularGrid-module u-mgb">
<div class="productList productList--fullpage">
{{> productListContents }}
</div>
</div>
</div>

### Lista de productos modo related ➜ class="productList productList--related"

<div class="modularGrid">
<div class="modularGrid-module u-mgb">
<div class="productList productList--related">
{{> productListContents }}
</div>
</div>
</div>

### Lista de productos modo asideCart ➜ class="productList productList--viewedProducts"

<div class="modularGrid">
<div class="modularGrid-module u-lg-15 u-mgb">
<div class="productList productList--viewedProducts">
{{> productListContents }}
</div>
</div>
</div>

### Lista de productos modo menu ➜ class="productList productList--menu"

<div class="modularGrid">
<div class="modularGrid-module u-lg-60 u-mgb">
<div class="productList productList--menu">
{{> productListContents }}
</div>
</div>
</div>

### Lista de productos modo slides ➜ class="productList--starProducts"

<div class="modularGrid">
<div class="modularGrid-module  u-lg-15 u-mgb">
<div class="productList productList--starProducts">
{{> productListContents }}
</div>
</div>
</div>

### Lista de productos modo slidesHalf ➜ class="productList productList--slidesHalf"

<div class="modularGrid">
<div class="modularGrid-module  u-lg-70 u-mgb">
<div class="productList productList--slidesHalf">
{{> productListContents }}
</div>
</div>
</div>


## HTML
{{embed partial}}

## SCSS
{{embed scss}}
