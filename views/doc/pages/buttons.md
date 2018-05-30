---
title:          buttons
categories:     nmss
scss:           ' scss/nm/modules/_button.scss'


---

Los botones deben tener la clase __'button'__. Se pueden utilizar tanto botones como anchors.

## HTML
```
<button class="button">
	Texto del botón
</button>

<a class="button">
	Texto del botón
</a>

```
##Resultado
<div class="cmsContent-container">
	<button class="button">
		Texto del botón
	</button>

</div>

##Variaciones

__.button--giga__ / Botones de enorme tamaño

<div class="cmsContent-container">
	<button class="button button--giga">
		Texto del botón
	</button>
</div>

__.button--full__ / Ocupa todo el ancho disponible

<div class="cmsContent-container">
	<button class="button button--full">
		Texto del botón
	</button>
</div>

__.button--big__ / Más padding para botones relevantes

<div class="cmsContent-container">
	<button class="button button--big">
		Texto del botón
	</button>
</div>

__.button--condensed__ / Menos padding para botones no relevantes o grupos de botones comprimidos

<div class="cmsContent-container">
	<button class="button button--condensed">
		Texto del botón
	</button>
</div>

__.button--inverse__ / Para botones oscuros

<div class="cmsContent-container">
	<button class="button button--inverse">
		Texto del botón
	</button>
</div>

__.button--up__ / Botón de subir al top de la página cuando se ha alcanzado un scroll mayor que x (sin previsualización)

__.button--primary__ / Botón acento visual por defecto

<div class="cmsContent-container">
	<button class="button button--primary">
		Texto del botón
	</button>
</div>


__.button--error__ / Botón con estado de error

<div class="cmsContent-container">
	<button class="button button--error">
		Texto del botón
	</button>
</div>

__.button--warning__ / Botón con estado de atención

<div class="cmsContent-container">
	<button class="button button--warning">
		Texto del botón
	</button>
</div>

__.button--success__ / Botón con estado de éxito

<div class="cmsContent-container">
	<button class="button button--success"></button>
</div>

__.button--borderless__ / Botón que simula un enlace

<div class="cmsContent-container">
	<button class="button button--borderless">
		Texto del botón
	</button>
</div>

__.button--icon__ / Botón con apariencia de icono

<div class="cmsContent-container">
	<button class="button button--icon" title="cart"><i class="icon fa-shopping-cart"></i></button>
	<button class="button button--icon" title="cart"><i class="icon icon--error fa-times"></i></button>
	<button class="button button--icon" title="cart"><i class="icon icon--success fa-check"></i></button>
	<button class="button button--icon" title="cart"><i class="icon icon--success fa-plus-circle"></i></button>
</div>

__.button--postfix__ / Botón que se añade al final de inputs (se usa junto a .form-input--postfix)

<div class="cmsContent-container">
	<input class="form-input form-input--postfix u-md-30">
	<button class="button button--postfix">
		<svg role="img" class="icon icon--inline icon--xs"><use xlink:href="../../img/icons/svg-defs.svg#icon-search"></use></svg>
	</button>
</div>

__.button--prefix__ / Botón que se añade al principio de inputs

<div class="cmsContent-container">
	<button class="button button--prefix">
		<svg role="img" class="icon icon--inline icon--xs"><use xlink:href="../../img/icons/svg-defs.svg#icon-search"></use></svg>
	</button>
	<input class="form-input  form-input--prefix u-md-30">
</div>


## SCSS

{{embed scss}}
