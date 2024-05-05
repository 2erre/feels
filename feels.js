function copyText(text) {
    const elem = document.createElement('textarea');
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
}

function redirect(id) {
    var elementId = document.getElementById(id).id;
    //console.log(elementId);

    if(elementId === "instagram") {
        window.open("https://instagram.com/feelsclo", "_blank");
    } else if (elementId === "shirt") {
        window.open("seeProducts.html", "_blank");
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