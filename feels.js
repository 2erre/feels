function copyText(text) {
    const elem = document.createElement('textarea');
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
}

function redirect() {
    var inst = document.getElementById("instagram");
    
    window.open("https://instagram.com/feelsclo", "_blank");
}

