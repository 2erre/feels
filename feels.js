// Loader animation between pages
function goToPageWithLoader(url) {
    const loader = document.getElementById('page-loader');
    const video = document.getElementById('loader-video');

    loader.style.display = 'flex';
    video.currentTime = 0;
    video.play();

    video.onended = function () {
        window.location.href = url;
    };
}

// Function to copy text to clipboard
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

    if (elementId === "instagram") {
        window.open("https://instagram.com/feelsclo", "_blank");
    } else if (elementId === "shirt") {
        window.open("seeProducts.html", "_blank");
    }
}

function redirectWithLoader(id) {
    const loader = document.getElementById('page-loader');
    const video = document.getElementById('loader-video');

    loader.style.display = 'flex';
    video.currentTime = 0;
    video.play();

    video.onended = function() {
        redirect(id);

        // Dopo che ha aperto la nuova pagina:
        setTimeout(() => {
            loader.style.display = 'none';
            video.onended = null; // Pulizia: togli l'evento
        }, 500); // mezzo secondo di pausa per sicurezza
    };
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