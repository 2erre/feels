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