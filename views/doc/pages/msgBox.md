---
title:          msgBox
categories:     nmss
scss:           ' scss/nm/modules/_msgBox.scss'


---


Mensajes inline de respuesta a acciones del usuario

## HTML
```
<div class="msgBox">
	Este es un mensaje de respuesta
</div>
```
##Resultado
<div class="cmsContent-container">
	<div class="msgBox msgBox">
		Este es un mensaje de respuesta
	</div>
</div>

##Variaciones

__.msgBox--success__ / Respuesta exitosa
<div class="cmsContent-container">
	<div class="msgBox msgBox--success">
		Este es un mensaje de respuesta
	</div>
</div>

__.msgBox--warning__ / Respuesta de alerta
<div class="cmsContent-container">
	<div class="msgBox msgBox--warning">
		Este es un mensaje de respuesta
	</div>
</div>


__.msgBox--error__ / Respuesta de error
<div class="cmsContent-container">
	<div class="msgBox msgBox--error">
		Este es un mensaje de respuesta
	</div>

</div>


## SCSS

{{embed scss}}
