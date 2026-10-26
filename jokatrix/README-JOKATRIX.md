# JOKATRIX · La Casa de los Aperos 🐎

**JOKATRIX** es una propuesta de plataforma web para apoyar la transformación digital de **La Casa de los Aperos**, un establecimiento de Bucaramanga, Santander, dedicado a la comercialización de artículos de talabartería y productos agropecuarios.

El sitio presenta la empresa, su evolución, un catálogo de productos, los módulos propuestos para la gestión del negocio y una demostración interactiva de inventario. Su diseño combina una estética inspirada en el campo con recursos visuales modernos.

## ✨ Características

- **Página institucional:** presenta la empresa, sus necesidades y la propuesta JOKATRIX.
- **Catálogo de productos:** muestra categorías de artículos y permite filtrar los productos desde la interfaz.
- **Presentación de funcionalidades:** explica las áreas de gestión contempladas por la propuesta.
- **Simulador interactivo de inventario:** permite probar ventas y reabastecimientos con productos de ejemplo.
- **Alertas de existencias:** identifica productos con stock bajo o agotado dentro del simulador.
- **Registro demostrativo de ventas:** actualiza contadores y genera consecutivos de factura de ejemplo.
- **Asistente virtual:** chatbot con respuestas predefinidas sobre la plataforma, la empresa, los productos y sus funcionalidades.
- **Diseño adaptable:** incluye navegación móvil y ajustes para diferentes tamaños de pantalla.
- **Animaciones visuales:** elementos que aparecen al desplazarse, contadores animados y partículas decorativas.
- **Navegación por secciones:** accesos a la empresa, evolución, catálogo, módulos, demo y ubicación.

## 🧰 Tecnologías utilizadas

- **HTML5** — estructura y contenido.
- **CSS3** — estilos, diseño adaptable, transiciones y animaciones.
- **JavaScript (Vanilla)** — navegación, filtros, chatbot y simulador de inventario.
- **Google Fonts** — tipografías Alfa Slab One, Lora y Oswald.

El proyecto no utiliza frameworks de JavaScript ni requiere instalar dependencias para ejecutarse como sitio estático.

## 📁 Estructura del proyecto

```text
jokatrix/
├── index.html
├── css/
│   └── responsive.css
└── js/
    ├── main.js
    ├── chatbot.js
    └── demo.js
```

### Archivos principales

| Archivo | Descripción |
| --- | --- |
| `index.html` | Estructura principal, navegación y secciones de la página. |
| `css/responsive.css` | Estilos, diseño adaptable y animaciones. |
| `js/main.js` | Efectos visuales, menú móvil, botón para volver arriba y filtros del catálogo. |
| `js/chatbot.js` | Asistente virtual basado en una lista de temas y respuestas predefinidas. |
| `js/demo.js` | Simulador de inventario con ventas, reabastecimiento y alertas de stock. |

## 🚀 Cómo ejecutar el proyecto

### Opción 1: abrir en el navegador

1. Descarga o clona el repositorio.
2. Entra en la carpeta `jokatrix`.
3. Abre el archivo `index.html` en tu navegador.

### Opción 2: usar Visual Studio Code

1. Abre la carpeta `jokatrix` en Visual Studio Code.
2. Ejecuta `index.html` con una extensión de servidor local, como **Live Server**.
3. Abre la dirección local que muestre la extensión.

No es necesario ejecutar `npm install` ni configurar un servidor backend para probar la página.

## 🧪 Probar el simulador de inventario

En la sección **Prueba interactiva**:

- Pulsa **Vender 1** para disminuir en una unidad las existencias del producto.
- Pulsa **+5** para simular el reabastecimiento de hasta cinco unidades.
- Observa los cambios en el estado del inventario, los contadores y las alertas.
- Usa el botón de reinicio para restaurar los datos de ejemplo.

Los cambios del simulador son temporales y se reinician al recargar la página.

## 💬 Asistente virtual

El chatbot responde a palabras clave relacionadas con temas como:

- La plataforma JOKATRIX y La Casa de los Aperos.
- Inventario, existencias y reabastecimiento.
- Ventas, facturación y proveedores.
- Catálogo de productos y ubicación del negocio.
- Beneficios y demostración interactiva.

Las respuestas se encuentran definidas en `js/chatbot.js`; no se trata de un servicio conectado a un modelo de inteligencia artificial ni a una base de datos.

## ⚠️ Alcance actual

JOKATRIX es una **propuesta de interfaz y demostración frontend**. El simulador usa datos de ejemplo y no persiste los cambios. En esta versión no se implementan autenticación, base de datos, procesamiento real de pagos, facturación electrónica ni administración conectada a un servidor.

El sitio utiliza Google Fonts mediante Internet. Además, `index.html` referencia una imagen llamada `logo.jpg`; si el archivo no está presente en la carpeta del proyecto, se mostrará el recurso alternativo definido en la página.

## 🌱 Posibles mejoras futuras

- Conectar el inventario a una base de datos.
- Crear módulos de autenticación y administración.
- Registrar ventas y movimientos de inventario de forma persistente.
- Integrar un sistema real de pedidos y pagos.
- Conectar el catálogo con disponibilidad y precios actualizados.
- Ampliar el asistente virtual con información administrable.

## 👥 Proyecto

**JOKATRIX — La Casa de los Aperos**  
Propuesta de modernización digital para la gestión comercial y la presentación de productos de talabartería y del sector agropecuario en Bucaramanga, Santander.

---

*Desarrollado con HTML, CSS y JavaScript.*
