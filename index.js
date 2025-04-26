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

// Initialize total on load
window.onload = updateTotal;