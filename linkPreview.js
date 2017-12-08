/*Select links in user comments*/
let commentLinks = document.querySelectorAll('.sitetable .usertext-body a'),
    responseText = '';    

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
        xPos = elem.clientX - 20;
    xPos+="px";
    popupContainer.id = 'rcotdContainer';
    popupContainer.className = 'rcotd-container';
    popupContainer.style.left = xPos;
    popup.id = 'rcotdDiv';
    popup.className = 'rcotd-popup';
    linkPreviewElement.id='linkPreview';
    linkPreviewElement.innerHTML = getUrlContent(targetUrl);
    elem.currentTarget.insertAdjacentElement('afterend', popupContainer);
    popupContainer.appendChild(popup);
    popup.appendChild(popText);
    popup.appendChild(popResponseText);
    popup.appendChild(linkPreviewElement);    
    document.querySelector('body').addEventListener('click', destroyPopup);
    document.querySelector('#rcotdDiv').addEventListener('mouseleave', destroyPopup);
}

function destroyPopup(event){
    let rcotdElement = document.getElementById('rcotdContainer');
    if (rcotdElement) {
        rcotdElement.parentNode.removeChild(rcotdElement);
    }
}

// function timeoutDestroy(){
//     window.setTimeout(destroyPopup, 2000);
// }



function getUrlContent(url){
    let reqHeaders = new Headers();
    reqHeaders.append('Content-Type', 'text/html');
    let reqInit = {
        method: 'GET',
        headers: reqHeaders,
        mode: 'no-cors',
        cache: 'default'
    };
    let reqObj = new Request(url, reqInit),
        debugNode = '<a href=\'somelink.com\'>Some parsed html</a><p>text</p>',
        parser = new DOMParser;
    
    return debugNode;
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