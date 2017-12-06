/*Select links in user comments*/
var commentLinks = document.querySelectorAll(".sitetable .usertext-body a");

commentLinks.forEach(function(link) {
    link.addEventListener("mouseover", createPopup);
    link.addEventListener("mouseout", destroyPopup);
});

function createPopup(){
    var popup = document.createElement("DIV");
    var popText = document.createTextNode("Here's some text in a div");
    popup.id = "rcotdDiv";
    popup.className = "rcotd-popup";
    popup.appendChild(popText);
    this.parentElement.appendChild(popup);
}

function destroyPopup(){
    var rcotd = document.querySelector("#rcotdDiv");
    if (rcotd.parentNode) {
        rcotd.parentNode.removeChild(rcotd);
    }
}