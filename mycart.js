function handleMouseDown(event) {
  if (event.button === 1) { // Verifica se è stato cliccato un prodotto con il pulsante centrale del mouse
    event.preventDefault(); // Evita che si verifichi il comportamento predefinito del clic del pulsante centrale
    redirect(event.currentTarget.id); // Chiama la funzione redirect con l'ID del div
  }
}

function toggleSizeDropdown(button) {  
  // Se l'utente ha cliccato sull'immagine, ottieni il bottone genitore
  if (button.tagName === 'IMG') {
      button = button.parentElement;
  }
  
  const dropdown = button.nextElementSibling;
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';

  // Close other dropdowns
  document.querySelectorAll('.size-options').forEach(opt => {
    if (opt !== dropdown) opt.style.display = 'none';
  });
}

// event listener globale quando il documento è pronto
document.addEventListener('DOMContentLoaded', function() {
  // Aggiungi gestione eventi alle immagini dentro i bottoni di selezione taglia
  document.querySelectorAll('.size-button img').forEach(img => {
      img.addEventListener('click', function(event) {
          // Previene che l'evento si propaghi al bottone (evitando click doppi)
          event.stopPropagation();
          // Chiama la funzione con l'elemento bottone genitore
          toggleSizeDropdown(this.parentElement);
      });
  });
});
  
function chooseSize(element, size) {
  const button = element.parentElement.previousElementSibling;
  button.innerHTML = `${size} <img src="mediaFeels/arrow-down.svg">`;
  element.parentElement.style.display = 'none';
}
 
window.addEventListener('click', function(e) {
  if (!e.target.matches('.size-button')) {
    document.querySelectorAll('.size-options').forEach(opt => {
      opt.style.display = 'none';
    });
  }
});

function updateQuantity(button, delta) {
    const quantitySpan = button.parentElement.querySelector('.item-quantity');
    let quantity = parseInt(quantitySpan.textContent);
    quantity = Math.max(1, quantity + delta);
    quantitySpan.textContent = quantity;
    updateTotal();
  }

  function updateTotal() {
    const items = document.querySelectorAll('.cart-item');
    let total = 0;
  
    items.forEach(item => {
      const unitPrice = parseFloat(item.getAttribute('data-price'));
      const quantity = parseInt(item.querySelector('.item-quantity').textContent);
      const itemTotal = unitPrice * quantity;
      total += itemTotal;
  
      // Update the price shown for this specific item
      const itemPriceElement = item.querySelector('.item-price');
      itemPriceElement.textContent = itemTotal.toFixed(2) + '€';
    });
  
    // Update the overall cart total
    document.getElementById('cart-total').textContent = total.toFixed(2) + '€';
  }  

// Funzione per rimuovere gli elementi con animazione e notifica
// Aggiorna la funzione removeItem per controllare se il carrello è vuoto dopo la rimozione
function removeItem(button) {
  const item = button.closest('.cart-item');
  const itemName = item.querySelector('.item-name').firstChild.textContent.trim();
  
  // Applica l'animazione di fadeOut
  item.style.transition = "opacity 0.5s, transform 0.5s";
  item.style.opacity = "0";
  item.style.transform = "translateX(30px)";
  
  // Mostra il messaggio toast
  showToast(`${itemName} has been removed from your cart`, "remove");
  
  // Rimuovi l'elemento dopo l'animazione
  setTimeout(function() {
      item.remove();
      updateTotal();
      
      // Controlla se il carrello è vuoto dopo aver rimosso l'elemento
      checkEmptyCart();
  }, 500);
}

// Funzione per verificare se il carrello è vuoto e mostrare il messaggio appropriato
function checkEmptyCart() {
  const cartContainer = document.querySelector('.cart-container');
  const cartItems = document.querySelectorAll('.cart-item');
  
  // Se non ci sono elementi nel carrello
  if (cartItems.length === 0) {
      // Cerca il div del messaggio vuoto esistente
      let emptyMessage = document.getElementById('empty-cart-message');
      
      // Se il messaggio non esiste, crealo
      if (!emptyMessage) {
          // Crea il div per il messaggio
          emptyMessage = document.createElement('div');
          emptyMessage.id = 'empty-cart-message';
          emptyMessage.className = 'empty-cart';
          
          // Aggiungi il contenuto HTML
          emptyMessage.innerHTML = `
              <h2>The cart is empty</h2>
              <a href="index.html" class="empty-cart-link">Look for something here</a>
          `;
          
          // Trova dove inserire il messaggio vuoto (prima del cart-summary)
          const cartSummary = document.querySelector('.cart-summary');
          cartContainer.insertBefore(emptyMessage, cartSummary);
          
          // Nascondi il riepilogo del carrello
          cartSummary.style.display = 'none';
          
          // Aggiungi un'animazione di fade-in
          setTimeout(() => {
              emptyMessage.style.opacity = '1';
          }, 10);
      }
  } else {
      // Se ci sono elementi nel carrello, nascondi il messaggio vuoto e mostra il riepilogo
      const emptyMessage = document.getElementById('empty-cart-message');
      if (emptyMessage) {
          emptyMessage.remove();
      }
      
      // Assicurati che il riepilogo del carrello sia visibile
      const cartSummary = document.querySelector('.cart-summary');
      cartSummary.style.display = 'block';
  }
}

// Aggiungi una chiamata alla funzione all'inizializzazione
window.onload = function() {
  updateTotal();
  checkEmptyCart();
  
  // Aggiungi gestione eventi alle immagini dentro i bottoni di selezione taglia
  document.querySelectorAll('.size-button img').forEach(img => {
      img.addEventListener('click', function(event) {
          event.stopPropagation();
          toggleSizeDropdown(this.parentElement);
      });
  });
};

// Initialize total on load
window.onload = updateTotal;