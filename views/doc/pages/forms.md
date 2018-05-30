---
title:          forms
categories:     nmss
scss:           ' scss/nm/modules/_form.scss'


---

<div class="msgBox msgBox--warning u-mgb"> Este módulo está en revisión y tiene que separarse en módulos menos específicos para aumentar su reusabilidad.
</div>

Los formularios deben tener la clase __'form'__.

Los elementos de un formulario deben estar dentro de un __modularGrid__ , para su correcta visualización.

## Ejemplo de uso
```
<form class="form">
    <div class="modularGrid">
        <div class="modularGrid-module">
            Aquí va el formulario
        </div>
    </div>
</form>
```

##Ejemplo de un formulario
En el siguiente ejemplo se encuentran los elementos básicos de un formulario, así como sus variaciones.

## HTML
<form class="form" style="margin-bottom:1.5rem;">
    <div class="modularGrid">
        <div class="modularGrid-module">
            <fieldset class="form-fieldset u-md-45">
                <legend class="form-legend">Fieldset › Legend class form-legend</legend>
                <label class="form-label" for="inputtext1">Label class form-label</label>
                <input type="text" id="inputtext1" class="form-input" placeholder="Input text class form-input">
                <label class="form-label form-label--disabled" for="inputtext2">Label class form-label form-label--disabled</label>
                <input type="text" id="inputtext2" class="form-input" placeholder="Input text disabled form-input" disabled>
                <label class="form-label form-label--error" for="inputtext3">Input Label class form-label form-label--error</label>
                <input type="text" id="inputtext3" class="form-input form-input--error" placeholder="Input text class form-input form-input--error">
                <label class="form-label" for="inputtext5">Input Label class form-label </label>
                <input type="text" class="form-input u-md-25" id="inputtext5"> 
                <input type="text" class="form-input u-md-70" >
                <input type="text" class="form-input u-md-70" >
                <select class="form-select">
                    <option>Select</option>
                </select>

            </fieldset>        
            <fieldset class="form-fieldset u-md-50">
                <legend class="form-legend">Fieldset class form-fieldset u-md-50</legend>
                <label class="form-label  form-label--inline u-md-40" for="inputtext8">Input Label class form-label</label>
                <input type="text" id="inputtext8" class="form-input  u-md-55" placeholder="Input text class form-input">
                <div class="modularGrid-module">
                    <input type="radio" class="form-radio" name="radio1"><label for="" class="form-label form-label--inline">form-label--inline</label>
                    <input type="radio" class="form-radio" name="radio1"><label for="" class="form-label form-label--inline">form-label--inline</label>
                    <input type="checkbox" class="form-checkbox"><label for="" class="form-label form-label--inline">form-label--inline</label> 
                </div> 
                <fieldset class="form-fieldset"> 
                    <legend class="form-legend">Fieldset anidado</legend>              
                    <div class="modularGrid-module">
                        <input type="checkbox" class="form-checkbox"><label for="" class="form-label form-label--inline">grupo dentro de modularGrid-module</label>
                    </div>
                    <div class="modularGrid">
                        <div class="modularGrid-module u-md-50">
                            <input type="checkbox" class="form-checkbox"><label for="" class="form-label form-label--inline">modularGrid-module u-md-50</label>
                        </div>
                        <div class="modularGrid-module u-md-50">
                            <input type="radio" class="form-radio"><label for="" class="form-label form-label--inline">modularGrid-module u-md-50</label>
                        </div>
                    </div>
                    <div class="modularGrid-module">
                        <input type="checkbox" class="form-checkbox"><label for="" class="form-label form-label--inline">form-label--inline</label>
                    </div>
                    <div class="modularGrid-module">
                        <input type="radio" class="form-radio"><label for="" class="form-label form-label--inline">form-label--inline</label>
                    </div>
                </fieldset>
                <label class="form-label" for="textarea"><strong>textarea</strong></label>
                <textarea class="form-textarea" id"textarea" placeholder="Textarea"></textarea>
            </fieldset>
        </div>        
        <div class="modularGrid-module">
            <label class="form-label" for="inputtext88">Input Label class form-label</label>
            <input type="text" id="inputtext88" class="form-input" placeholder="Input text class form-input">
            <label class="form-label" for="textarea33">Input Label class form-label</label>
            <textarea class="form-textarea" id"textarea33" placeholder="Textarea"></textarea>
        </div>
        <div class="cmsContent-container">
            <button class="button">Button class button</button>
            <input type="button" class="button" value="Input button class button">
            <input type="submit" class="button" value="Input submit class button"><a class="button" disabled> A  class button disabled</a>
        </div>
        <div class="cmsContent-container">
            <button class="button button--error">class button button--error</button>
            <input type="button" class="button button--warning" value="class button button--warning">
            <input type="submit" class="button button--primary" value="class button button--primary"><a class="button button--success">class button button--success</a>
        </div>

    </div>
</form>

## Manejar mensajes de feedback en losformularios

Existen varios tipos de situaciones de las que debemos informar al usuario, estoa son:
* Errores de validación (el dato es erróneo) o es requerido
* Errores de formato (el dato está escrito incorrectamente)
* Mensajes de comunicación con el servidor (el proceso se ha interrumpido)
* Mensajes de procesos lógicos o pasos

### Errores de validación
<div class="modularGrid">
    <div class="modularGrid-module u-md-3rd">
        <label for="" class="form-label form-label--error">Nombre</label>
        <input type="text" class="form-input form-input--error">
        <span class="form-inputMsg form-inputMsg--error"> Hay un error</span>        
    </div>
    <div class="modularGrid-module u-md-3rd u-pdl">
        <label for="" class="form-label form-label--error">Nombre</label>
        <input type="text" class="form-input form-input--error" value="* Requerido">
    </div>
</div>

### Errores de formato
Mientras el usuario está escribiendo, o cuando hace focus out del input, se añade la clase warning y se abre un tooltip encima del input.
<div class="modularGrid">
    <div class="modularGrid-module u-md-3rd">
        <input type="text" class="form-input form-input--warning">
        <div class="form-inputMsg form-inputMsg--warning">El formato xx no es correcto</div>
    </div>
</div>

### Errores de comunicación con el servidor
Reemplazamos el botón con los msgBox correspondientes
<div class="modularGrid u-mgb">
    <div class="modularGrid-module u-md-3rd">
        <div class="msgBox msgBox--warning">El servidor no responde</div>
    </div>
    <div class="modularGrid-module u-md-3rd u-pdl">
        <div class="msgBox msgBox--success">Añadido con éxito</div>
    </div>
</div>

### Mensajes de procesos lógicos o pasos
Se colocan justo después de la equiqueta form, debajno un margin mínimo con el contenido inferior
<div class="modularGrid">
    <div class="modularGrid-module u-mgb">
        <div class="msgBox msgBox--success">En breve responderemos su solucitud</div>
    </div>
    <div class="modularGrid-module u-md-3rd">
        <label for="" class="form-label">Nombre</label>
        <input type="text" class="form-input">
    </div>
    <div class="modularGrid-module u-md-3rd u-pdl">
        <label for="" class="form-label">Nombre</label>
        <input type="text" class="form-input" value="* Requerido">
    </div>    
</div>



## SCSS

{{embed scss}}
