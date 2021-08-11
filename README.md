# Optimizacion-Web

## Cuándo realmente un sitio es rápido o lento?
RAIL es un modelo de rendimiento centrado en el usuario que proporciona una estructura para pensar en el rendimiento. El modelo desglosa la experiencia del usuario en acciones clave (por ejemplo, tocar, desplazarse, cargar) y le ayuda a definir objetivos de rendimiento para cada uno de ellos.

Mas info : https://web.dev/rail/ 

### Rail Model
* Response ⇒ Tiempos ideales en las cuales las acciones de nuestras paginas web deberían responder
* Animation ⇒ Animaciones que el sitio web realiza
* Idle ⇒ Tiempos muertos del navegador como ser cargar recursos que no son necesarios al momento
* Load ⇒ Cuando tarda un sitio en cargar, una vez que el usuario ingrese a la URL del sitio

### Tiempos de carga recomendados

* Entre 0 a 300 milisegundos son perfectos 😄
* Desde 1000 milisegundos son buenos 🙂
* Cuando tarda mas de 1500 milisegundos ya el usuario percibe que esta pasando algo malo 😐
* Luego de los 2 segundos todo es malo 🤨

RESUMEN: Cuando tenemos un sitio web lo importante es tener un limite que no exceda los 3 segundos de carga

## 📏 Aprendiendo a medir

lo que no mide, no se mejora

Rail Model:
* Centrado en el usuario
* Métricas de rendimiento basadas en la experiencia de usuario

Entregar el contenido y ser interactiva en menos de 5 segundos

* Esta frase parcialmente es cierta por que debemos recordar que no todos los usuarios tendrán la misma velocidad de internet

Cumplir las métricas para los usuarios del percentil 75%

* No basta concentrarse en un numero concreto si no que consiste en dar un buen recorrido por todas la pagina

RESUMEN: Lo importante es dar una experiencia de usuario en TODO el sitio web.

## 📈 User Performance Metrics
LCP ⇒ Carga

FID ⇒ Velocidad de interactividad

CLS ⇒ Estabilidad de elementos mostrados en el website

Cuando hablamos de experiencia de usuario existen 3 metricas que nos van a ayudar mucho con ello.
* LCP
* FID
* CLS

### LCP [Large Contentful Paint]

Significa el tiempo que tarde en pintar el mayor elemento visible en la ventana

✅ Esta medida sera buena si tarda entre 0 a 2.5 segundos

🟡 Necesita mejora si esta entre 2.5 a 4 segundos

❌ Deficiente de 4 segundos o más

### FID [First Input Delay]
El tiempo que tarda la página en responder a las acciones del usuario

* El tiempo que tarda la página en responder a la primer acción hecha por el usuario.

✅ Esta medida sera buena si tarda entre 0 a 100 milisegundos

🟡 Necesita mejora si esta entre 100 a 300 milisegundos

❌ Deficiente de 300 milisegundos o más

### CLS [Cumulative Layout Shift]

Mide todos los cambios inesperados en el layout de una página

✅ Esta medida sera buena si esta en 0 a 0.1

🟡 Necesita mejora si esta entre 0.1 a 0.25

❌ Deficiente de 0.25 o más

RESUMEN: Debemos usar las métricas que son LCP, FID, CLS para mejorar la experiencia de usuario

## 🧭 Etapas de render del navegador

Critical Render Path. - es el proceso de tomar el código HTML, CSS y JS para convertirlos en pixeles en la pantalla

DOM. - Document Object Model

CSSOM. - un árbol similar al DOM, pero para CSS

### Critical Render Path

 Lo que ha sucedido aquí fue que se construyó el DOM [HTML], CSSOM [CSS], Se renderizo [HTML + CSS], Se hizo el layout [cálculos geométricos] y se pintó en la pantalla [Dibujar los pixeles en la pantalla].



Se compone de 5 etapas.

#### Object Model [etapas 1 y 2]

* Tenemos un index.html
```html
<body>
	<h1>Hallo</h1>
	<p>Hallo</p>
</body>
```

* Tenemos un CSS

```css
h1 {
	color: salmon;
}

p {
	display: none;
}
```

* Se construye el DOM
* Construye un árbol de arriba hacia abajo
* También se construye el CSSOM

#### Render Tree [etapa 3]

  * Seguiríamos teniendo los mismos elementos HTML
  * Solo que en este proceso se distingue que va a pintar y que no

#### Layout | Paint [etapas 4 y 5]

  * Lo primero que hace es ver el ancho disponible para pintar ⇒ Viewport ⇒ width-device
  * Dependiendo del ancho se estima algunas cosas como el box model

## Network waterfall y recursos que bloquean el navegador

Tanto JavaScript como CSS son recursos bloqueantes. Esto quiere decir que cada vez que el navegador encuentra estos archivos, debe parar e interpretarlos mientras sigue haciendo parsing del HTML.

* Script por defecto

bloquea el parsing durante la descarga y ejecución del 

![Script por defecto](./readme-img/script.png)

* Script Defer
descarga el script JS pero no lo ejecuta hasta que se finaliza el parsing del HTML.

![Script Defer](./readme-img/script_defer.png)

* Script Async
descarga el script JS durante el parsing y una vez se termine de descargar lo ejecuta inmediatamente, bloqueando solo una “pequeña” parte del parsing.

![Script Async](./readme-img/script_async.png)

## 💇 Priorización de recursos

Podemos decirle al navegador que recursos tengan una prioridad mayor con el atributo media en los elementos link, pero se debe tener cuidado porque cada archivo nuevo sera una nueva petición HTTP.

Se debe tener un balance entre lo que necesita la app y como le podemos ayudar al navegador

Todas las herramientas que serán vistas dentro de todo el curso serán de doble filo como podemos ayudar al navegador también podemos hacer que su trabajo sea más duro

* No todos los recursos tienen la misma prioridad
* Por ejemplo, en el CSS pasa que metemos todos los estilos para todos los casos que se pueden llegar a dar
  * Estilos dark mode
  * Estilos de desktop
  * Estilos de tablet
  * Estilos de mobile
* Pénesenos en el caso de alguien que navega en el móvil, el deberá descargar todos estos estilos, así no le sea de interés o relevantes
* Con la priorización de recursos en CSS podemos ayudarle a navegador a darles “pistas” para decirle cual tiene mayor prioridad

```html
<!-- Especificamos el atributo media -->
<link
  rel="stylesheet"
  href="/desktop.css"
  media="screen and (min-width: 600px)"
/>
```

* Esta técnica es simple pero eficiente
* Nos ayuda bastante a decirle al navegador que puede ser importante que cargue y que no
* Se debe considerar que cada vez que hagamos esto sera un nuevo request que debamos hacer hacia el servidor


## 🗃️ Preloading y prefetching de recursos

* Preload. - Recurso que se descargue junto el HTML
* Prefetch. - Recurso que en el futuro se podrá usar
* Precconect. - Conexión anticipada a recursos de servidores remotos

* Podemos decir al navegador cuales son los recursos y dominos que se debe conectar o descargar de forma anticipada
* Existen 3 estrategias para poderlo hacerlo
  * Preload (recursos)
  * Prefetch (recursos)
  * Preconnect (dominios)
```html
<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin />
<link rel="dns-prefetch" href="https://fonts.gstatic.com/" />
```
  * podemos especificar con el atributo rel las estrategias para realizar este proceso

Si le decimos al navegador de forma anticipada que recursos necesita o a que dominios se puede conectar de una forma anticipada podemos mejorar el rendimiento de nuestros sitios

## 🖌️ Fases Paint y Layout del Critical Render Path

El paint es la operación más costosa que puede hacer un navegador

* Estas etapas son inevitables al momento de cargar CSS y JS
  * Podemos tener cuidado al momento de ejecución de ambos

__Cualquier cambio en una propiedad que no sea opacity o transform genera un Paint__

* Toda la etapa de renderización se puede ver bloqueada y afectada por lo que pase en el paint
* Podemos controlarlo con nuestras animaciones
* Si tenemos cuidado con las animaciones y las reglas del CSS con los elementos de la pagina
  * Podemos ayudar que el navegador reduzca Complejidad y cantidad de procesos que debe hacer para volver a pintar los elementos
* Facebook está consciente acerca de esto al punto que ellos para su navbar usan una sprites antes que una sombra

* Esta técnica es usar una imagen pequeña y multiplicarla varias veces
* Decidieron usar esta técnica debido a que el CSS causaba muchos problemas al momento de hacer scroll

Debemos tener bastante cuidado con el paint debido a que es un proceso bastante pesado y puede afectar a la experiencia de nuestros usuarios para ello podemos usar técnicas como lo hizo Facebook