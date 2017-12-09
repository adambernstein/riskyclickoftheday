/*Select links in user comments*/
let commentLinks = document.querySelectorAll('.sitetable .usertext-body a'),
    responseText = '';

document.querySelector('body').addEventListener('click', destroyPopup);
commentLinks.forEach(function(link) {
    link.addEventListener('mouseover', initPopup);    
});

function initPopup(obj){
    let rcotd = document.getElementById('rcotdContainer');
    if (rcotd!=null) {
        destroyPopup();
        buildPopup(obj);
    }
    else buildPopup(obj);
}

function buildPopup(elem){
    let popupContainer = document.createElement('DIV'),
        popup = document.createElement('DIV'),
        popText = document.createTextNode('Here\'s some text in a div'),
        popResponseText = document.createTextNode(responseText),
        targetUrl = elem.currentTarget.attributes.href.value,
        linkPreviewElement = document.createElement('DIV'),
        xPos = elem.pageX,
        yPos = elem.pageY-110;
    xPos+="px";
    yPos+="px";
    popupContainer.id = 'rcotdContainer';
    popupContainer.className = 'rcotd-container';
    popupContainer.style.left = xPos;
    popupContainer.style.top = yPos;
    popup.id = 'rcotdDiv';
    popup.className = 'rcotd-popup';
    linkPreviewElement.id='linkPreview';
    /*linkPreviewElement.innerHTML = getUrlContent(targetUrl);*/
    linkPreviewElement.innerHTML = '<img class = \"preview-img\" src=\"' + targetUrl + '\">';
    elem.currentTarget.parentElement.insertAdjacentElement('afterend', popupContainer);
    popupContainer.appendChild(popup);
    //popup.appendChild(popText);
    popup.appendChild(popResponseText);
    popup.appendChild(linkPreviewElement);
    document.querySelector('body').addEventListener('mousemove', trackMouse);
    document.querySelector('#rcotdContainer').parentElement.addEventListener('mouseleave', destroyPopup);
}

function destroyPopup(event){
    let rcotdElement = document.getElementById('rcotdContainer');
    if (rcotdElement) {
        rcotdElement.parentNode.removeChild(rcotdElement);
        document.querySelector('body').removeEventListener('mousemove', trackMouse);
    }
}

function trackMouse(p){
    let x = p.pageX, y = p.pageY-110;
    x+="px";
    y+="px";
    document.querySelector('#rcotdContainer').style.left = x;
    document.querySelector('#rcotdContainer').style.top = y;
}

// function timeoutDestroy(){
//     window.setTimeout(destroyPopup, 2000);
// }



function getUrlContent(url){
    let reqHeaders = new Headers(), r= '';
    reqHeaders.append('Content-Type', 'image/jpeg');
    let reqInit = {
        method: 'GET',
        headers: reqHeaders,
        mode: 'no-cors',
        cache: 'default'
    };
    let reqObj = new Request(url, reqInit);
    fetch(reqObj)
        .then(response => response.blob())
        .then(function(blob){
            r = '<img src =\"' + URL.createObjectURL(blob) + '\" >';
        });
    return r;
}

/*
 * @TODO rewrite
 
function requestr(reqObj){
    fetch(reqObj).then(function(response) { return response.text(); }).then(function(myBlob) {
        responseText = myBlob;
    });

}
function buildRequest(){    
     requestr(reqObj)
        .then(function(response){
            return response
        }).then(function(response){
            return response
        }).catch(catchErr);
}
function parseResponse(response) {
    let parsedObj = JSON.parse(response);
    console.log(parsedObj);
    return parsedObj;
}
function catchErr(error){
    console.log('Something went wrong: ', error);
}
*/