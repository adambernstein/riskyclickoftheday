/*Select links in user comments*/
var commentLinks = document.querySelectorAll('.sitetable .usertext-body a'),
    responseText = '';    

commentLinks.forEach(function(link) {
    link.addEventListener('mouseover', initPopup);    
});

function initPopup(){
    let rcotd = document.getElementById('rcotdContainer');
    if (rcotd!=null) {
        destroyPopup();
        buildPopup(this);
    }
    else buildPopup(this);
}

function buildPopup(elem){
    var popupContainer = document.createElement('DIV'),
        popup = document.createElement('DIV'),
        popText = document.createTextNode('Here\'s some text in a div'),
        popResponseText = document.createTextNode(responseText),
        targetUrl = elem.attributes.href.value,
        linkPreviewElement = document.createElement('DIV'); 
    
    popupContainer.id = 'rcotdContainer';
    popupContainer.className = 'rcotd-container';
    popup.id = 'rcotdDiv';
    popup.className = 'rcotd-popup';
    linkPreviewElement.id='linkPreview';
    linkPreviewElement.innerHTML = getUrlContent(targetUrl);
    elem.parentElement.appendChild(popupContainer);
    popupContainer.appendChild(popup);
    popup.appendChild(popText);
    popup.appendChild(popResponseText);
    popup.appendChild(linkPreviewElement);    
    document.querySelector('body').addEventListener('click', destroyPopup);
}

function destroyPopup(){
    let rcotdElement = document.getElementById('rcotdContainer');
    if (rcotdElement) {
        rcotdElement.parentNode.removeChild(rcotdElement);
    }
}



function getUrlContent(url){
    var reqHeaders = new Headers();
    reqHeaders.append('Content-Type', 'text/html');
    var reqInit = { 
        method: 'GET',
        headers: reqHeaders,
        mode: 'no-cors',
        cache: 'default'
    };
    var reqObj = new Request(url, reqInit),
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
    var parsedObj = JSON.parse(response);
    console.log(parsedObj);
    return parsedObj;
}
function catchErr(error){
    console.log('Something went wrong: ', error);
}
*/