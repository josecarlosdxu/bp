---
title:          Primeros pasos
categories:     general
---


Bienvenido a la documentación del front-end framework de BigBuy. El propósito de este framework es crear una librería de módulos html/css/js reutilizables y fáciles de mantener para la creación de una tienda online y de un panel de administración.

Esta documentación incluye los siguientes apartados:

* __General__:  Guía de uso y convenciones
* __Partials__: Referencia de los módulos e includes
* __Nmss__:     Framework responsive 


## Tecnología

Este proyecto se basa en [assemble.io](http://assemble.io) para la creación de los tests estáticos y esta misma documentación. Utiliza SCSS 3.3.0 para la gestión de la css y html5 para la estructura del contenido.

##Convenciones

Este proyecto utiliza nomenclatura [BEM](http://bem.info/) en las clases de la SCSS así como un conjunto de mixins para la creación y mantenimiento de los nombres de clases. Toda la especificidad de la css se ha anulado a excepción de los modificadores de bloque. 

Para más información consultar el [módulo BEM](bem.html)

##Instalación

Antes de empezar a trabajar hay que instalar nodejs.

Una vez instalados ambos haremos check-out del repositorio en un directorio local:
```
git clone https://github.com/rlucha/stackExample01.git
```

Abriremos una consola dentro de ella y ejecutaremos por orden
```
npm install -g grunt-cli
npm i
```

Esto instalará todas las dependencias del proyecto y expondrá una serie de tareas grunt en la línea de comandos.

##Compilación y Livereload

Dentro del directorio local ejecutaremos
```
grunt
```
Y veremos como se ejecutan las tareas por defecto del proyecto: 
* Se compilan la SCSS
* Se crean los archivos estáticos de tests y la documentación
* Se crea un servidor en __localhost:8080__
* Se crea un listener __livereload__ del directorio del proyecto que lanzará otra vez la tarea cuando hayan cambios en el directorio.

## Trabajando en el entorno

Lo primero es abrir el navegador con la URL
```
http://localhost:8080/
```
Esto nos mostrará el root del proyecto con las carpetas visibles. En cuanto hagamos un cambio en alguno de los archivos del proyecto veremos cómo se recarga esta página del navegador con los nuevos cambios.

## ¿Cómo funciona el entorno? / Instalación manual

El principal objetivo de esta stack es facilitar la creación de sites estáticos para prototipar con SASS. Con la automatización de Grunt podremos ejecutar tareas de mantenimiento, optimización y concatenación. Con Assemble.io podremos generar nuestros tests, documentación y sites enteros de forma muy efectiva.

Esta stack comprende:

* Node.js
* Npm: Node Package Manager, es el gestor de paquetes de node con el que añadiremos, actualizaremos o borraremos las dependencias que utiliza nuestro entorno.
* Grunt: Automatizador de tareas con una librería de plugins muy extensa que utilizaremos para automatizar la compilación de scss, lanzaremos el servidor, etc.
* Assemble: Generador de sites estáticos muy potente que utiliza Handlebars como lenguaje de templating.
* Grunt plugins: Instalaremos el compilador de SASS, un servidor con liveReload y una tarea de mantenimiento.

### Node.js — Javascript en el servidor
El primer paso es instalar node en nuestro sistema para poder ejecutar el resto de programas.

### Creando la estructura del proyecto
Para poder utilizar efectivamente npm (y así tener todas las dependencias organizadas fácilmente) tenemos que crear un archivo package.json donde se guardarán los metadatos del proyecto. Abriremos un terminal en el directorio del proyecto y escribiremos:
```
npm init
```
Este programa nos hará una serie de preguntas sobre el proyecto y creará el package.json por nosotros. Más o menos tendrá este contenido:
```
{
 "name": "",
 "version": "",
 "description": "",
 "main": "",
 "scripts": {
 "test": ""
 },
 "author": "",
 "license": ""
}
```
No voy a entrar a explicar la configuración del paquete, por ahora solamente necesitamos el archivo para gestionar las dependencias.

### Instalando Grunt
Como ya tenemos instalado npm y creado el package.json instalar los módulos para nuestra aplicación es tan sencillo como escribir:
```
npm install grunt --save-dev
```
Como verás en la consola, npm bajará los paquetes necesarios y los instalará en la carpeta node_modules dentro del proyecto. El parámetro save-dev se encarga de añadir la entrada devDependencies a nuestro archivo package.json. Esto es muy útil para gestionar en un futuro los módulos del proyecto o para distribuirlo.

Ahora instalaremos la interfaz de comandos de Grunt:

```
npm install -g grunt-cli
```
Desde este momento podremos ejecutar las tareas que definamos en el archivo de configuración de Grunt desde el terminal con el comando:

```
grunt nombreDeTarea
```

## Instalando Assemble
Repetimos la operación para assemble
```
npm install assemble --save-dev
```
Ahora ya tenemos instalado Grunt y Assemble dentro del proyecto, pero todavía no hemos definido ninguna tarea.

##Gruntfile.js
En este fichero definiremos las tareas grunt que estarán disponibles para el proyecto. Tendremos que crearlo en el mismo lugar donde tenemos package.json. El archivo gruntfile básico tendría la siguiente estructura:

```
module.exports = function(grunt) {

 grunt.initConfig({

  taskName: {
   options: {
    prop1: '',
    prop2: ['']
   }
  },
  taskName2: {
   options: {
    prop1: '',
    prop2: ['']
   }
  }
 });

 grunt.loadNpmTasks('taskName');
 grunt.loadNpmTasks('taskName2');
 grunt.registerTask('default', ['taskName','taskName2']);

};
```
Donde taskName será el nombre de la tarea a la que le pasaremos una serie de opciones, luego cargaremos con loadNpmTasks y finalmente registraremos con registerTask al comando “default” de grunt. Así al ejecutar en el terminal:
```
grunt
```
Se cargarán ambas tareas y se ejecutarán secuencialmente.
Por suerte los módulos de Grunt vienen con documentación sobre cómo añadirlos a nuestro gruntfile, setear las opciones, etc. Una vez cogido el truco es muy fácil añadir nuevas tareas de Grunt al proyecto.

## Configurando Assemble
La primera tarea que crearemos será la del generador de sites estáticos. Assemble añade un sistema de layouts, pages y partials por encima de handlebars que nos permitirá organizar nuestro proyecto y reutilizar las partes con facilidad.
Esta es una posible estructura de archivos de un proyecto de assemble:

```
./
  /layouts/
    default.hbs
    ...
  /pages/
    home.hbs
    ...
  /partials/
    miCarro.hbs
    meLoRobaron.hbs
    ...
dist/
```
Y la configuración de la tarea de grunt sería:

```
assemble: {
 options: {
   flatten: true,
   layout: 'default.hbs',
   layoutdir: 'layouts',
   data: 'data/**/*.json'
 },
  static: {
    options: {
      layout: 'default.hbs',
      partials: ['partials/*.hbs']
    },
    src: ['pages/*.hbs'],
    dest: 'static/'
 }
}
```
En options indicamos la configuración general de assemble, especificamos el layout por defecto, el directorio de layouts, el de los datos json, etc.

Luego podemos crear tantas subtareas como queramos, en este caso static define las rutas que vamos a usar para el flujo de compilación de assemble y el directorio de destino.

El ejecutar la tarea el flujo de includes de assemble cogerá una page (home.hbs) e incluirá en ella todos los partials que se hayan declarado. Luego la contrastará con el layout especificado y la insertará en su body generando al final un archivo html con el nombre de home.html

Resumiendo:

partials -> pages -> layouts -> html

Podemos crear tantas subtareas de assemble como queramos y estructurar nuestro proyecto de forma que haya por ejemplo un directorio para dist, otro para la documentación, otro para tests, y que cada uno de ellos utilice un layout diferente o una colección de partials distinta.

Esta forma de trabajar nos permitirá modularizar nuestro código html mientras prototipamos, de forma que nos daremos cuenta de muchísimos detalles de implementación que pasarían desapercibidos sin una estructura de includes.

De esta forma gruntfile.js quedaría así:
```
module.exports = function(grunt) {
 grunt.initConfig({
  assemble: {
   options: {
    flatten: true,
    layout: 'default.hbs',
    layoutdir: 'layouts',
    data: 'data/**/*.json'
   },
   static: {
    options: {
     layout: 'default.hbs',
     partials: ['partials/*.hbs']
    },
    src: ['pages/*.hbs'],
    dest: 'static/'
    }
   } 
  });
 grunt.loadNpmTasks('assemble');
 grunt.registerTask('default', ['assemble']);
};
```
Si ejecutamos ahora la tarea grunt veremos que intenta inicializar assemble pero dará un fallo porque no encuentra el archivo de layout.

Podemos crear ahora la estructura de directorios básica del proyecto que he comentado antes y rellenar los archivos de ejemplo.

Ahora crearemos el archivo layouts/default.hbs:
```
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="utf-8">
 <title>HelloWorld</title>
</head>
<body>
  \{{>body}}
</body>
</html>
```
Hasta aquí todo normal, lo único a notar es el include de Handlebars

```
\{{>body}}
```
En este punto es donde se insertarán todas las pages para las que hayamos definido default.hbs como layout por defecto.

Ahora vamos con pages/home.hbs
```
Esta es la home:

\{{> miCarro }}
\{{> meLoRobaron }} 
```
Como veis hay otros dos includes, en este caso partials ya que estamos en una page.

Finalmente creamos partials/miCarro.hbs
```
<h1> Mi carro </h1>
```
Y partials/meLoRobaron.hbs

```
<p> Mi carro, me lo robaron, estando de romería. Dónde estará mi carro, dónde estará mi carro... </p>
```

Con toda la estructura de ejemplo podemos ejecutar grunt y veremos como ejecuta el proceso y crea la página home.html en el directorio static.

```
$ grunt
Running "assemble:stat
Assembling static/home
>> 1 pages assembled.

Done, without errors.
```

##Instalando la tarea SASS y liveReload
Ahora ya tenemos el entorno listo para ir añadiendo tareas a Grunt, la primera que configuremos será grunt-sass que se encargará de compilar nuestros archivos .scss, concatenarlos, comprimirlos y generar el sourceMap. Ejecutamos:
```
npm i grunt-sass --save-dev
```
Ahora crearemos una carpeta scss con el archivo main.scss dentro y algún código de ejemplo.
```
scss/main.scss
%type-head {
 font-weight: bold;
 font-size: 1.2rem;
 font-variant: small-caps;
 color: tomato;
}

h1 {
 @extend %type-head;
}
```
Y en gruntfile.js añadiremos la tarea tal y como hemos visto en la parte 1 del artículo:
```
sass: { // task
 dist: { // target
  files: { // dictionary of files
   'static/css/main.css': 'scss/main.scss' // 'destination': 'source'
  }
 } 
}
```
Luego tendremos que cargar la tarea y añadirla al comando default de grunt. Las últimas líneas del archivo gruntfile.js quedarían así:
```
 grunt.loadNpmTasks('assemble');
 grunt.loadNpmTasks('grunt-sass');
 grunt.registerTask('default', ['assemble','sass']);
```
Cuando ejecutemos grunt, El archivo main.scss de la carpeta que hemos creado será compilado a css dentro de static.
```
$ grunt
Running "assemble:static" (assemble) task
Assembling static/home.html OK
>> 1 pages assembled.

Running "sass:dist" (sass) task
File static/css/main.css created.

Done, without errors.
```
Ahora ya tenemos templates con generación estática de Handlebars y compilación SASS automatizada. Lo único que nos falta es añadir liveReload al proyecto para actualizar el navegador cuando se detectan cambios en los archivos.

## LiveReload
Para conseguir este comportamiento necesitamos dos paquetes instalados.
```
npm i grunt-contrib-connect --save-dev
npm i grunt-contrib-watch --save-dev
```

grunt-contrib-connect crea un servidor estático y grunt-contrib-watch se encarga de monitorizar los cambios en archivos y lanzar un servidor liveReload, luego tendremos que añadir un script a nuestro html para que conecte con el servicio liveReload.

Una vez instalados los paquetes añadimos las líneas correspondientes al gruntfile.js

Primero la tareas
```
connect: {
 server: {
  options: {
   port: 8080,
   base: './',
   hostname:'*',
  }
 }
 }, 
 watch: {
  sass: {
   files: 'scss/**/*.scss',
   tasks: ['sass'],
   options: {
    livereload: 1337,
   }
  },
 assemble: {
  files: ['**/*.hbs'],
  tasks: ['assemble'],
  options: {
   livereload: 1337,
  }
 } 
 ```
 Y luego la carga del paquete
 ```
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
 ```
 Y modificamos nuestro comando default para que añada las nuevas tareas a la cola de ejecución.
 ```
 grunt.registerTask('default', ['assemble','sass','connect','watch']);
 ```
 Además tendremos que añadir la llamada al script de connect en nuestro default.hbs y de paso linkamos la css generada.
 ```
 <!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="utf-8">
 <title>HelloWorld</title>
 <script src="//localhost:1337/livereload.js"></script>
 <link rel="stylesheet" type="text/css" href="css/main.css">
</head>

<body>
 \{{>body}}
</body>
</html>
```
Todo esto para que cuando se detecten cambios en los archivos .scss lance la tarea de compilación de sass y cuando se cambien los archivos .hbs lance la tarea de compilación de assemble.

Ejecutamos grunt y deberíamos ver como compila nuestros archivos y deja la consola en modo waiting… Ahora solo hace falta introducir la dirección del servidor local y navegar hasta nuestra url de ejemplo.
```
http://localhost:8080/static/home.html
```
Y ya está. Ahora podemos modificar alguno de nuestros archivos y ver cómo se actualiza el servidor directamente con los cambios. ☺