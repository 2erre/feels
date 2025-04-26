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
        intervalId = setInterval(function () {
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

// Scroll the product carousel
/* window.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    let isDown = false;
    let startX;
    let scrollLeft;
  
    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.classList.add('active');
        startX = e.pageX;
        scrollLeft = carousel.scrollLeft;
    });
  
    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.classList.remove('active');
    });
  
    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.classList.remove('active');
    });
  
    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = x - startX; // scroll speed
      carousel.scrollLeft = scrollLeft - walk;
    });
}); */
window.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.clientX;
        scrollLeft = carousel.scrollLeft;
        carousel.classList.add('active');
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.classList.remove('active');
    });

    document.addEventListener('mouseup', () => {
        isDown = false;
        carousel.classList.remove('active');
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.clientX;
        const walk = x - startX;
        carousel.scrollLeft = scrollLeft - walk;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    const resetArrow = document.getElementById('resetCarousel');

    resetArrow.addEventListener('click', () => {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
    });
});

// Initialize total on load
window.onload = updateTotal();
