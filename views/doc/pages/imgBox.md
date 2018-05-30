---
title:          imgBox
categories:     partials
scss:           'scss/front/_imgBox.scss'
partial:        'views/front/partials/imgBox.hbs'

---

imgBox es el bloque utilizado para mostrar las imágenes asociadas al producto.

## Componentes

* __imgBox-figure__:Contiene la imagen seleccionada del producto.
* __imgBox-thumblist__: Contiene la lista de miniaturas de las restantes imágenes.


## Estructura

```
<section class="imgBox">
	<figure class="imgBox-figure">
		<a href="#">Aquí va la imagen grande➜ <img  class="imgBox-img"></a>
	</figure>
	<nav class="imgBox-thumblist">
		<a class="imgBox-thumb" href="#">Aquí van las miniaturas➜ <img class="imgBox-thumb-img"></a>
	</nav>
</section>

```

## Ejemplo de uso

<div class="modularGrid">
	<div class="modularGrid-module u-md-35">
		<div class="box" style="margin-bottom:1.5rem;">
			<section class="imgBox">
				<figure class="imgBox-figure">
					<a href="#"><img title="Jamón" alt="ham" src="http://www.bigbuy.eu/media/catalog/product/cache/1/image/265x265/9df78eab33525d08d6e5fb8d27136e95/d/e/delizius-paleta-bodega-jamonero-gourmet-01.jpg" class="imgBox-img"></a>
				</figure>
				<nav class="imgBox-thumblist">
					<a href="#" title="" class="imgBox-thumb"><img src="http://www.bigbuy.eu/media/catalog/product/cache/1/thumbnail/60x60/9df78eab33525d08d6e5fb8d27136e95/d/e/delizius-paleta-bodega-jamonero-gourmet-01.jpg" alt="" class="imgBox-thumb-img"></a>
					<a href="#" title="" class="imgBox-thumb"><img src="http://www.bigbuy.eu/media/catalog/product/cache/1/thumbnail/60x60/9df78eab33525d08d6e5fb8d27136e95/d/e/delizius-jamon-oro-jamonero-gourmet-04_1.jpg" alt="" class="imgBox-thumb-img"></a>
					<a href="#" title="" class="imgBox-thumb"><img src="http://www.bigbuy.eu/media/catalog/product/cache/1/thumbnail/60x60/9df78eab33525d08d6e5fb8d27136e95/d/e/delizius-jamon-bodega-jamonero-gourmet-02.jpg" alt="" class="imgBox-thumb-img"></a>
					<a href="#" title="" class="imgBox-thumb"><img src="http://www.bigbuy.eu/media/catalog/product/cache/1/thumbnail/60x60/9df78eab33525d08d6e5fb8d27136e95/d/e/delizius-jamon-iberico-jamonero-gourmet-09.jpg" alt="" class="imgBox-thumb-img"></a>
					<a href="#" title="" class="imgBox-thumb"><img src="http://www.bigbuy.eu/media/catalog/product/cache/1/thumbnail/60x60/9df78eab33525d08d6e5fb8d27136e95/j/a/jamonero-gourmet-05.jpg" alt="" class="imgBox-thumb-img"></a>
					<a href="#" title="" class="imgBox-thumb"><img src="http://www.bigbuy.eu/media/catalog/product/cache/1/thumbnail/60x60/9df78eab33525d08d6e5fb8d27136e95/j/a/jamonero-gourmet-06.jpg" alt="" class="imgBox-thumb-img"></a>
					<a href="#" title="" class="imgBox-thumb"><img src="http://www.bigbuy.eu/media/catalog/product/cache/1/thumbnail/60x60/9df78eab33525d08d6e5fb8d27136e95/d/e/delizius-jamon-iberico-jamonero-gourmet-00_1.jpg" alt="" class="imgBox-thumb-img"></a>
					<a href="#" title="" class="imgBox-thumb"><img src="http://www.bigbuy.eu/media/catalog/product/cache/1/thumbnail/60x60/9df78eab33525d08d6e5fb8d27136e95/d/e/delizius-jamon-iberico-jamonero-gourmet-07.jpg" alt="" class="imgBox-thumb-img"></a>
				</nav>
			</section>
		</div>
	</div>
</div>





## HTML

{{embed partial}}

## SCSS
{{embed scss}}
