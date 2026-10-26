/* ==========================================================================
   Lógica de swipe: arrastrar tarjetas, animarlas y deshacer.
   Depende de que existan en el HTML:  #cards  y tarjetas con clase .card
   ========================================================================== */

/**
 * Cuántos píxeles hay que arrastrar para que la decisión cuente
 * (si se arrastra menos, la tarjeta vuelve al centro).
 */
const DECISION_THRESHOLD = 75

/** Evita iniciar dos animaciones a la vez */
let isAnimating = false

/** Distancia (en X) que se ha movido la tarjeta mientras se arrastra */
let pullDeltaX = 0

/** Tarjetas que ya se descartaron, para poder deshacer (la última es la más reciente) */
const swipedCards = []


/* --------------------------------------------------------------------------
   Utilidades
   -------------------------------------------------------------------------- */

/** Devuelve el contenedor donde viven las tarjetas */
function getCardsContainer() {
  return document.getElementById('cards')
}

/** Devuelve la tarjeta de arriba (la última en el DOM), o null si no quedan */
function getTopCard() {
  const cards = getCardsContainer().querySelectorAll('.card')
  return cards[cards.length - 1] ?? null
}

/** Posición horizontal del mouse o del dedo */
function getPointerX(event) {
  return event.pageX ?? event.touches[0].pageX
}

/** Cambia la opacidad de la etiqueta LIKE o NOPE de una tarjeta */
function setChoiceOpacity(card, type, opacity) {
  const label = card.querySelector(`.choice.${type}`)
  if (label) label.style.opacity = opacity
}

/** Oculta las dos etiquetas (LIKE y NOPE) */
function hideChoices(card) {
  setChoiceOpacity(card, 'like', 0)
  setChoiceOpacity(card, 'nope', 0)
}

/** Deja las variables de estado listas para el próximo swipe */
function resetSwipeState() {
  pullDeltaX = 0
  isAnimating = false
}


/* --------------------------------------------------------------------------
   Acciones: descartar, volver al centro y deshacer
   -------------------------------------------------------------------------- */

/**
 * Lanza la tarjeta fuera de la pantalla.
 * @param {HTMLElement} card
 * @param {'left'|'right'} direction - 'left' = NOPE, 'right' = LIKE
 */
function throwCard(card, direction) {
  isAnimating = true

  const isRight = direction === 'right'
  setChoiceOpacity(card, isRight ? 'like' : 'nope', 1)
  card.classList.add(isRight ? 'go-right' : 'go-left')

  // Al terminar la animación quitamos la tarjeta (pero la guardamos para "deshacer")
  card.addEventListener('transitionend', () => {
    card.remove()
    swipedCards.push(card)
    resetSwipeState()
  }, { once: true })
}

/**
 * Regresa la tarjeta al centro (cuando no se arrastró lo suficiente).
 * @param {HTMLElement} card
 */
function returnCard(card) {
  card.classList.add('reset')
  hideChoices(card)

  card.addEventListener('transitionend', () => {
    card.removeAttribute('style')
    card.classList.remove('reset')
    resetSwipeState()
  }, { once: true })
}

/**
 * Descarta la tarjeta de arriba, como si el usuario la hubiera arrastrado.
 * Lo usan los botones del footer.
 * @param {'left'|'right'} direction
 */
function swipeTopCard(direction) {
  if (isAnimating) return

  const card = getTopCard()
  if (card) throwCard(card, direction)
}

/** Trae de vuelta la última tarjeta descartada */
function undoLastSwipe() {
  if (isAnimating || swipedCards.length === 0) return

  const card = swipedCards.pop()
  card.classList.remove('go-left', 'go-right', 'reset')
  card.removeAttribute('style')
  hideChoices(card)

  // Al agregarla al final queda otra vez encima de todas
  getCardsContainer().append(card)
}


/* --------------------------------------------------------------------------
   Arrastre con mouse / dedo
   -------------------------------------------------------------------------- */

/**
 * Se ejecuta al presionar el mouse o tocar la pantalla.
 * @param {MouseEvent|TouchEvent} event
 */
function startDrag(event) {
  if (isAnimating) return

  // Solo nos interesa si se presionó sobre una tarjeta
  const card = event.target.closest('.card')
  if (!card) return

  const startX = getPointerX(event)

  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onEnd)
  document.addEventListener('touchmove', onMove, { passive: true })
  document.addEventListener('touchend', onEnd, { passive: true })

  /** Mientras se arrastra: mueve y rota la tarjeta, y muestra LIKE o NOPE */
  function onMove(event) {
    pullDeltaX = getPointerX(event) - startX
    if (pullDeltaX === 0) return

    isAnimating = true

    const rotation = pullDeltaX / 14
    card.style.transform = `translateX(${pullDeltaX}px) rotate(${rotation}deg)`
    card.style.cursor = 'grabbing'

    // Cuanto más lejos, más visible la etiqueta
    const opacity = Math.abs(pullDeltaX) / 100
    const isRight = pullDeltaX > 0
    setChoiceOpacity(card, isRight ? 'like' : 'nope', opacity)
    setChoiceOpacity(card, isRight ? 'nope' : 'like', 0)
  }

  /** Al soltar: decide si se descarta la tarjeta o vuelve al centro */
  function onEnd() {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onEnd)
    document.removeEventListener('touchmove', onMove)
    document.removeEventListener('touchend', onEnd)

    // Fue un simple clic, sin arrastrar: no hay nada que animar
    if (pullDeltaX === 0) return

    const decisionMade = Math.abs(pullDeltaX) >= DECISION_THRESHOLD

    if (decisionMade) {
      throwCard(card, pullDeltaX > 0 ? 'right' : 'left')
    } else {
      returnCard(card)
    }
  }
}

document.addEventListener('mousedown', startDrag)
document.addEventListener('touchstart', startDrag, { passive: true })
