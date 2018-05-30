---
title:          breadcrumb
categories:     partials
scss:           ' scss/front/_breadcrumb.scss'
---

La clase __'breadcrumb'__ es el contenedor de las migas de pan. Cada paso lleva la clase __'breadcrumb-link.'__

## Variaciones

El último paso, el que referencia a la ubicación actual, lleva la clase __'breadcrumb-link--active.'__


##Ejemplo de uso

### Migas de pan ➜ class="breadcrumb"

<nav class="breadcrumb" style="margin-bottom: 1.5rem; background: #fff;">
	<a class="breadcrumb-link" href="#">Main section</a>
	<a class="breadcrumb-link" href="#">Subsection</a>
	<a class="breadcrumb-link breadcrumb-link--active" href="#">Current section</a>
</nav>

```
<nav class="breadcrumb">
	<a class="breadcrumb-link" href="#">Main section</a>
	<a class="breadcrumb-link" href="#">Subsection</a>
	<a class="breadcrumb-link breadcrumb-link--active" href="#">Current section</a>
</nav>

```





## SCSS
{{embed scss}}
