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