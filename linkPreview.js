/*Select links in user comments*/
var commentLinks = document.querySelectorAll(".sitetable .usertext-body a");

commentLinks.forEach(function(link) {
    link.addEventListener("mouseover", createPopup);
    link.addEventListener("mouseout", destroyPopup);
});

function createPopup(){
    var popupContainer = document.createElement("DIV"),
        popup = document.createElement("DIV"),
        popText = document.createTextNode("Here's some text in a div");
    popupContainer.id = "rcotdContainer";
    popupContainer.className = "rcotd-container";
    popup.id = "rcotdDiv";
    popup.className = "rcotd-popup";
    popupContainer.appendChild(popup);
    popup.appendChild(popText);
    this.parentElement.appendChild(popupContainer);
}

function destroyPopup(){
    var rcotd = document.querySelector("#rcotdContainer");
    if (rcotd.parentNode) {
        rcotd.parentNode.removeChild(rcotd);
    }
}