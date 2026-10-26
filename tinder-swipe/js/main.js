/* ==========================================================================
   Arranque de la app: dibuja las tarjetas y conecta los botones del footer.
   Usa PROFILES (js/profiles.js) y las funciones de js/swipe.js
   ========================================================================== */

/**
 * Crea el HTML de una tarjeta a partir de los datos de una persona.
 * @param {{name: string, age: number, photo: string, alt: string}} profile
 * @returns {HTMLElement}
 */
function createCard(profile) {
  const card = document.createElement('article')
  card.className = 'card'

  card.innerHTML = `
    <img class="card__img" src="${profile.photo}" alt="${profile.alt}" draggable="false" />
    <h2 class="card__name">${profile.name} <span class="card__age">${profile.age}</span></h2>
    <div class="choice nope">NOPE</div>
    <div class="choice like">LIKE</div>
  `

  return card
}

/**
 * Agrega todas las tarjetas al contenedor.
 * La tarjeta de arriba es la última en el DOM, así que recorremos la lista
 * al revés para que el primer perfil de PROFILES sea el que se vea primero.
 */
function renderCards() {
  const container = getCardsContainer()

  PROFILES.slice().reverse().forEach(profile => {
    container.append(createCard(profile))
  })
}

/** Conecta cada botón del footer con su acción */
function setupButtons() {
  // Deshacer: trae de vuelta la última tarjeta
  document.getElementById('btn-undo').addEventListener('click', () => {
    console.log('volver')
    undoLastSwipe()
  })

  // X: rechazar (la tarjeta sale a la izquierda)
  document.getElementById('btn-remove').addEventListener('click', () => {
    console.log('cerrar')
    swipeTopCard('left')
  })

  // Estrella: super match (la tarjeta sale a la derecha)
  document.getElementById('btn-star').addEventListener('click', () => {
    console.log('super match')
    swipeTopCard('right')
  })

  // Corazón: match normal (la tarjeta sale a la derecha)
  document.getElementById('btn-fav').addEventListener('click', () => {
    console.log('match')
    swipeTopCard('right')
  })

  // Rayo: super boost (por ahora solo muestra un mensaje en consola)
  document.getElementById('btn-zap').addEventListener('click', () => {
    console.log('super boost')
  })
}

// Cuando el HTML está listo, arrancamos
document.addEventListener('DOMContentLoaded', () => {
  renderCards()
  setupButtons()
})
