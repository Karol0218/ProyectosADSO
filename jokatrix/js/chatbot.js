
/* ============================================================
   CHATBOT "ASISTENTE JOKATRIX"
   ============================================================ */

(function chatbot() {
  const fab = document.getElementById("chatFab");
  const win = document.getElementById("chatWindow");
  const closeBtn = document.getElementById("chatClose");
  const messages = document.getElementById("chatMessages");
  const chipsBox = document.getElementById("chatChips");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  if (!fab || !win) return;

  /* ---------- Base de conocimiento ---------- */
  const KB = [
    {
      keys: ["jokatrix", "que es", "sistema", "plataforma"],
      reply:
        "🤎 <strong>¡Bienvenido a JOKATRIX!</strong> Es una solución digital " +
        "creada para apoyar la gestión de La Casa de los Aperos, facilitando " +
        "el control de productos, inventario, ventas y facturación. " +
        'Conoce más en <a href="#modulos">nuestros módulos</a>.'
    },
    {
      keys: ["empresa", "casa de los aperos", "quienes son", "negocio", "talabarteria"],
      reply:
        "🐎 <strong>La Casa de los Aperos</strong> es un establecimiento " +
        "comercial de Bucaramanga, Santander, dedicado a la venta de artículos " +
        "de talabartería y productos agropecuarios. " +
        'Descubre su historia en <a href="#empresa">Nuestra empresa</a>.'
    },
    {
      keys: ["inventario", "existencias", "stock", "alerta"],
      reply:
        "📦 <strong>¡Mantén todo bajo control!</strong> El módulo de inventario " +
        "permite consultar las existencias y reconocer cuándo un producto " +
        "necesita reabastecimiento. " +
        'Explora el <a href="#demo">simulador de inventario</a>.'
    },
    {
      keys: ["venta", "factura", "facturacion", "vender"],
      reply:
        "🧾 <strong>Ventas y facturación más organizadas.</strong> JOKATRIX " +
        "busca facilitar el registro de las ventas y la consulta de sus facturas, " +
        "ayudando a reducir errores y ahorrar tiempo en las tareas del negocio."
    },
    {
      keys: ["proveedor", "proveedores", "compras", "reabastecer"],
      reply:
        "🚚 <strong>Proveedores siempre organizados.</strong> Gestiona y consulta " +
        "la información de los proveedores para facilitar el seguimiento de la " +
        "mercancía y planificar el abastecimiento del negocio."
    },
    {
      keys: ["estadistica", "reporte", "informe", "desempeno", "decision"],
      reply:
        "📊 <strong>Decisiones con información.</strong> Los reportes y las " +
        "estadísticas ayudan a revisar las ventas, identificar productos destacados " +
        "y conocer mejor el movimiento del negocio. " +
        'Explora <a href="#modulos">los módulos del sistema</a>.'
    },
    {
      keys: ["tienda", "comprar", "domicilio", "online", "linea", "pagina web", "web", "pedido"],
      reply:
        "🛒 <strong>¡Compra de una manera más práctica!</strong> La tienda en línea " +
        "está pensada para que los clientes exploren el catálogo, consulten los " +
        "productos y conozcan sus precios desde la página web. " +
        'Visita el <a href="#catalogo">catálogo de productos</a>.'
    },
    {
      keys: ["whatsapp", "chat", "contacto"],
      reply:
        "💬 <strong>Estamos aquí para orientarte.</strong> JOKATRIX complementa " +
        "los canales de atención del negocio con una página donde los visitantes " +
        "pueden consultar información y explorar los productos disponibles."
    },
    {
      keys: ["productos", "catalogo", "cuero", "montura", "cadena", "cuerda", "agropecuario", "polvora"],
      reply:
        "🐴 <strong>¡Encuentra lo que necesitas!</strong> Explora las diferentes " +
        "categorías de productos, como artículos de cuero, monturas, cadenas, " +
        "cuerdas y productos agropecuarios. " +
        'Descubre las opciones en el <a href="#catalogo">catálogo</a>.'
    },
    {
      keys: ["donde", "ubicacion", "direccion", "bucaramanga", "visitar", "queda"],
      reply:
        "📍 <strong>¡Estamos en Bucaramanga, Santander!</strong> La Casa de los " +
        "Aperos se encuentra en el sector de la carrera 16 con calle 33. " +
        'Consulta la <a href="https://www.google.com/maps/search/?api=1&query=Carrera+16+con+Calle+36+Bucaramanga" target="_blank" rel="noopener">ubicación en el mapa</a> ' +
        'o visita la sección <a href="#visitanos">Visítanos</a>.'
    },
    {
      keys: ["beneficio", "ventaja", "para que sirve", "resultado", "impacto"],
      reply:
        "✨ <strong>¿Por qué elegir JOKATRIX?</strong> Porque busca mejorar " +
        "la organización de la información, facilitar el control del inventario, " +
        "agilizar las operaciones comerciales y apoyar el crecimiento digital " +
        "de La Casa de los Aperos."
    },
    {
      keys: ["demo", "simulador", "probar", "jugar"],
      reply:
        "🎮 <strong>¡Es momento de explorar!</strong> Prueba la demostración " +
        "interactiva para observar cómo se comporta el inventario cuando se " +
        "registran movimientos de productos. " +
        'Ingresa al <a href="#demo">simulador</a>.'
    },
    {
      keys: ["hola", "buenas", "hey", "saludos", "hi"],
      reply:
        "¡Hola! 🤎 <strong>¡Bienvenido a JOKATRIX!</strong> Soy el asistente " +
        "virtual de esta página. Puedo ayudarte a conocer la empresa, el sistema, " +
        "sus funcionalidades y los productos del catálogo. ¿Qué te gustaría consultar?"
    },
    {
      keys: ["gracias", "genial", "perfecto"],
      reply:
        "¡Con mucho gusto! 🤎 Gracias por visitar JOKATRIX. " +
        "Espero que encuentres toda la información que necesitas. " +
        "¡Será un gusto ayudarte a conocer nuestro sistema!"
    }
  ];

  const FALLBACK =
    "🤔 No encontré una respuesta para tu pregunta, pero puedo ayudarte con " +
    "<strong>JOKATRIX</strong>, el <strong>inventario</strong>, las " +
    "<strong>ventas y facturación</strong>, los <strong>productos</strong> " +
    "o la <strong>tienda en línea</strong>. ¿Qué te gustaría saber?";

  const CHIPS = [
    "¿Qué es JOKATRIX?",
    "Inventario y alertas",
    "Ventas y facturación",
    "Tienda en línea",
    "Productos",
    "¿Dónde queda?"
  ];

  /* ---------- Utilidades ---------- */
  const normalize = (s) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  function answerFor(text) {
    const q = normalize(text);
    for (const rule of KB) {
      if (rule.keys.some((k) => q.includes(k))) return rule.reply;
    }
    return FALLBACK;
  }

  function addMessage(html, who) {
    const div = document.createElement("div");
    div.className = "chat-msg " + who;
    div.innerHTML = html;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
  }

  function botReply(text) {
    const typing = addMessage(
      '<span class="typing"><i></i><i></i><i></i></span>',
      "bot"
    );
    setTimeout(() => {
      typing.innerHTML = answerFor(text);
      messages.scrollTop = messages.scrollHeight;
    }, 550 + Math.random() * 450);
  }

  function send(text) {
    if (!text.trim()) return;
    addMessage(text.replace(/</g, "&lt;"), "user");
    botReply(text);
  }

  /* ---------- Chips de sugerencias ---------- */
  CHIPS.forEach((label) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.textContent = label;
    b.addEventListener("click", () => send(label));
    chipsBox.appendChild(b);
  });

  /* ---------- Abrir / cerrar ---------- */
  let greeted = false;

  function openChat() {
    win.hidden = false;
    fab.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => win.classList.add("open"));

    if (!greeted) {
      greeted = true;
      setTimeout(() => {
        addMessage(
          "¡Hola! 🤎 Soy tu asistente virtual de <strong>JOKATRIX</strong>. " +
          "Estoy aquí para ayudarte a descubrir nuestras funcionalidades, " +
          "conocer La Casa de los Aperos y explorar el catálogo de productos. " +
          "¡Escribe tu pregunta o elige una sugerencia!",
          "bot"
        );
      }, 350);
    }

    input.focus();
  }

  function closeChat() {
    win.classList.remove("open");
    fab.setAttribute("aria-expanded", "false");
    setTimeout(() => {
      win.hidden = true;
    }, 300);
  }

  fab.addEventListener("click", () =>
    win.hidden ? openChat() : closeChat()
  );

  closeBtn.addEventListener("click", closeChat);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    send(input.value);
    input.value = "";
  });

  // Los botones "Consultar" del catálogo abren el chat con la pregunta
  document.querySelectorAll("[data-ask]").forEach((btn) =>
    btn.addEventListener("click", () => {
      if (win.hidden) openChat();
      send("Productos: " + btn.dataset.ask);
    })
  );
})();
