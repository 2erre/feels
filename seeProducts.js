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

function selectView(id) {
    var images = document.querySelectorAll('.images img');
    for (var i = 0; i < images.length; i++) {
      images[i].classList.remove('selection'); // Remove selection from all images
    }
    var selectedImage = document.getElementById(id);
    selectedImage.classList.add('selection'); // Add selection to the clicked image

    changeView(id);
}

var intervalId; 
function changeView(id) {
    clearInterval(intervalId); //interrompe il cambio di immagini se si seleziona l'elemento che non lo prevede
    // Cambia l'immagine nel div .product in base all'ID
    var productImage = document.querySelector('.product img');

    if (id === "change") {
        // Cambia l'immagine ogni 2 secondi scegliendo tra 4 immagini presenti nella cartella mediaFeels
        var images = ['shirt-right.png', 'shirt-back.png', 'shirt-left.png', 'shirt-front.png'];
        var currentIndex = 0;
        intervalId = setInterval(function() {
        productImage.src = "mediaFeels/change-shown-shirt/" + images[currentIndex];
        currentIndex = (currentIndex + 1) % images.length;
        }, 2000);
    } else {
        // Visualizza l'immagine corrispondente all'ID selezionato
        productImage.src = "mediaFeels/shirt-front.png";
    }
}

function showOptions() {
    var dropDownContent = document.getElementsByClassName("dropdown-content")[0];
    var displayStyle = window.getComputedStyle(dropDownContent).display;
    
    if (displayStyle === "none") {
        dropDownContent.style.display = "block";
    } else {
        dropDownContent.style.display = "none";
    }
}

function chooseSize(size) {
    document.getElementById('chosen-size').textContent = "Chosen size: " + size;
}

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