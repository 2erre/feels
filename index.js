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

// Function to handle add to cart button click
function addToCart(event, productId) {
  // Stop the click from propagating to the product card
  event.stopPropagation();

  // Get product information
  const productCard = event.currentTarget.closest('.product-card');
  // Get the product title h5 (the second h5 in the card, which is outside the add-to-cart div)
  const productName = productCard.querySelector('.product-title').textContent.trim();
  const productPrice = productCard.querySelector('.price').textContent;

  // Display notification with cart icon
  showToast(`Added ${productName} to cart`, 'cart');

  // Here you would typically update cart data in localStorage or send to server
  console.log(`Added product ${productId}: ${productName} (${productPrice}) to cart`); //productPrice is not used
  // if it is needed, move the p element that contains the price inside the h5 that contains the productName

  // You can add code here to update a cart counter, save to localStorage, etc.
}

// Function to prevent the product card redirection when clicking the cart button
function handleCartClick(event) {
  event.stopPropagation();
}

// Initialize total on load
window.onload = updateTotal;