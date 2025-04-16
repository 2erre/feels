function copyText(text) {
    const elem = document.createElement('textarea');
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);

    showToast("Email copyed to your clipboard");
}

//prodotti
function redirect(id) {
    var elementId = document.getElementById(id).id;
    //console.log(elementId);

    if(elementId === "instagram") {
        window.open("https://instagram.com/feelsclo", "_blank");
    } else if (elementId === "shirt") {
        window.open("seeProducts.html", "_blank");
    }
}

function handleMouseDown(event) {
  if (event.button === 1) { // Verifica se è stato cliccato un prodotto con il pulsante centrale del mouse
    event.preventDefault(); // Evita che si verifichi il comportamento predefinito del clic del pulsante centrale
    redirect(event.currentTarget.id); // Chiama la funzione redirect con l'ID del div
  }
}

//video
// Function to check if an element is in the viewport
function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Function to start playing the video when it's in the viewport
  function startVideoIfInView() {
    var video = document.getElementById('myVideo');
    if (isInViewport(video)) {
      video.play();
      // Remove the event listener after the video starts playing
      window.removeEventListener('scroll', startVideoIfInView);
    }
  }
  
  // Add event listener to start the video when it's in the viewport
  window.addEventListener('scroll', startVideoIfInView);

// Funzione per creare e mostrare un messaggio toast
function showToast(message) {
  // Rimuovi toast esistenti
  const existingToast = document.getElementById('remove-toast');
  if (existingToast) {
      existingToast.remove();
  }
  
  // Crea un nuovo elemento toast
  const toast = document.createElement('div');
  toast.id = 'remove-toast';
  toast.className = 'toast-notification';
  
  // Aggiunta dell'icona del cestino
  toast.innerHTML = `
      <img src="mediaFeels/copy-icon.png" class="toast-icon">
      <span>${message}</span>
  `;
  
  // Aggiungi il toast al documento
  document.body.appendChild(toast);
  
  // Animazione di entrata (dal basso)
  setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';  // Aggiornato per mantenere il centramento X
  }, 10);
  
  // Rimuovi il toast dopo 3 secondi
  setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)'; // Animazione di uscita verso il basso
      
      // Rimuovi l'elemento DOM dopo la fine dell'animazione
      setTimeout(() => {
          toast.remove();
      }, 500);
  }, 3000);
}

// Initialize total on load
window.onload = updateTotal;