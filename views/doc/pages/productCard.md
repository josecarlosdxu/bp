---
title:          productCard
categories:     partials
scss:           'scss/front/_productCard.scss'
partial:        'views/front/partials/productCard.hbs'

---

El bloque __'productCard'__ es el contenedor mínimo para mostrar los productos.

## Variaciones

* __Landscape:__  Se muestra de forma horizontal
* __Shoppable:__  Muestra controles de compra

## Ejemplos de uso

### Fichas de productos ➜ class="productCard"
<div class="modularGrid">
<div class="modularGrid-module u-lg-95 u-mgb">
<div class="productList productList--fullpage">
{{> productListContents }}
</div>
</div>
</div>


### Ficha de producto horizontal ➜ class="productCard productCard--landscape"

<div class="modularGrid">
	<div class="modularGrid-module u-md-30 u-mgb">
		<div class="productList-item">
			<article class="productCard  productCard--shoppable  productCard--landscape">
				<figure class="productCard-content">
					<a href="#" class="productCard-link">
						<img alt="" src="http://londonred.dropshippershop.com/16532-large_default/cortador-de-verduras-twista-chopper.jpg" class="productCard-img">
					</a>
					<figcaption class="productCard-properties">
						<div class="productCard-title">
							<a href="#" class="productCard-link">Cortador de Verduras Twista Chopper</a>
						</div>
						<div class="productCard-prices">
							<div class="productCard-pvp productCard-pvp--before">
								<div class="productCard-pvp-name">PVR</div>
								<div class="productCard-pvp-amount">74,00€</div>
							</div>
							<div class="productCard-pvp productCard-pvp--now">
								<div class="productCard-pvp-name productCard-pvp--relevant">PVD</div>
								<div class="productCard-pvp-amount productCard-pvp--relevant">62,69€</div>
							</div>
							<div class="productCard-pvp productCard-pvp--discount">-50%</div>
						</div>
					</figcaption>
				</figure>
				<div class="productCard-ribbon">Novedad</div>
				<div class="productCard-buy">
					<div class="productCard-caption">
						<div class="unitControl">
							<input type="text" value="5" class="form-input form-input--postfix unitControl-input">
							<div class="form-postfix unitControl-groupBtns">
								<button class="button button--icon unitControl-button unitControl-button--plus"></button>
								<button class="button button--icon unitControl-button unitControl-button--minus"></button>
							</div>
						</div>
						<button title="Añadir al carrito" class="button button--primary  productCard-ctaButton">
							<i class="icon fa fa-shopping-cart"></i>
						</button>
					</div>
				</div>
			</article>
		</div>
	</div>
</div>

## HTML

{{embed partial}}

## SCSS
{{embed scss}}
