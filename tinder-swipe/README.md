# Tinder Swipe 💘

Interfaz web inspirada en Tinder, creada con **HTML, CSS y JavaScript vanilla**. Permite explorar perfiles mediante tarjetas interactivas que se pueden arrastrar hacia la izquierda para rechazar o hacia la derecha para dar «me gusta».

> Proyecto educativo de la serie **100 proyectos JS · 01 - Tinder Swipe**.

## ✨ Características

- 🃏 Tarjetas de perfiles generadas dinámicamente desde JavaScript.
- 👉 Swipe con mouse o pantalla táctil.
- ❌ Arrastrar a la izquierda para rechazar un perfil.
- 💚 Arrastrar a la derecha para indicar que te gusta.
- 🎞️ Animaciones y etiquetas visuales `LIKE` y `NOPE`.
- ↩️ Botón para deshacer la última decisión.
- 🔘 Botones de acción inspirados en la interfaz de Tinder.
- 📱 Diseño con marco de teléfono y recursos visuales propios del proyecto.
- 🧑‍🤝‍🧑 Perfiles fáciles de personalizar desde un único archivo.

## 🛠️ Tecnologías

- **HTML5** — estructura de la aplicación.
- **CSS3** — diseño, disposición y animaciones.
- **JavaScript (Vanilla)** — creación de tarjetas, eventos y lógica de swipe.

No necesita frameworks ni instalar dependencias.

## 📂 Estructura del proyecto

```text
tinder-swipe/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── profiles.js
│   ├── swipe.js
│   └── main.js
└── img/
    ├── profiles/
    │   ├── imagen1.png
    │   ├── imagen2.png
    │   ├── imagen3.png
    │   └── imagen4.png
    └── ui/
        ├── iphone.webp
        ├── tinder-icons.webp
        └── tinder-logo.webp
```

### ¿Qué hace cada archivo?

- `index.html`: contiene la estructura principal y carga los estilos y scripts.
- `css/style.css`: define el diseño del teléfono, las tarjetas, los botones y las animaciones.
- `js/profiles.js`: contiene los datos de los perfiles (nombre, edad, foto y texto alternativo).
- `js/swipe.js`: gestiona el arrastre, las animaciones, las decisiones y la acción de deshacer.
- `js/main.js`: genera las tarjetas y conecta los botones con sus acciones.
- `img/`: contiene las imágenes de los perfiles y los recursos gráficos de la interfaz.

## 🚀 Cómo ejecutar el proyecto

### Opción 1: abrirlo directamente

1. Descarga o clona este repositorio.
2. Abre la carpeta del proyecto.
3. Abre `index.html` en tu navegador.

### Opción 2: usar Visual Studio Code

1. Abre la carpeta del proyecto en Visual Studio Code.
2. Ejecuta `index.html` con una extensión de servidor local, como **Live Server**.
3. Abre la dirección local que te indique la extensión.

No hace falta ejecutar `npm install` ni configurar un backend.

## 🕹️ Cómo usarlo

- **Arrastrar a la izquierda:** rechaza el perfil.
- **Arrastrar a la derecha:** indica que te gusta.
- **Botón X:** rechaza la tarjeta actual.
- **Botón del corazón:** indica que te gusta.
- **Botón de estrella:** realiza una acción visual similar a un super like.
- **Botón de deshacer:** recupera la última tarjeta descartada.
- **Botón del rayo:** actualmente muestra un mensaje en la consola; no implementa un boost real.

Si el movimiento no alcanza el umbral establecido, la tarjeta vuelve a su posición original.

## ✏️ Cómo agregar o modificar perfiles

Abre `js/profiles.js` y añade un objeto al arreglo `PROFILES`:

```javascript
{
  name: 'Alex',
  age: 25,
  photo: 'img/profiles/alex.png',
  alt: 'Descripción de la fotografía de Alex'
}
```

Después, coloca la imagen correspondiente en `img/profiles/` y comprueba que la ruta coincida con el valor de `photo`.

## 📌 Alcance del proyecto

Este proyecto es una **demostración de interfaz frontend**. No incluye autenticación, base de datos, chat, geolocalización ni un sistema real de coincidencias. Las decisiones se gestionan en el navegador y no se guardan de forma permanente.

## 👨‍💻 Autor

**Karol Quintero** — según los metadatos incluidos en el proyecto original.

## 📄 Licencia

No se especifica una licencia en los archivos del proyecto. Si deseas permitir que otras personas reutilicen o modifiquen el código, añade una licencia apropiada al repositorio.

---

Hecho con HTML, CSS y JavaScript 💻
