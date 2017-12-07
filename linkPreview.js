/*Select links in user comments*/
var commentLinks = document.querySelectorAll('.sitetable .usertext-body a');

commentLinks.forEach(function(link) {
    link.addEventListener('mouseover', createPopup);
    link.addEventListener('mouseout', destroyPopup);
});

function createPopup(){
    var popupContainer = document.createElement('DIV'),
        popup = document.createElement('DIV'),
        popText = document.createTextNode('Here\'s some text in a div'),
        targetUrl = this.attributes.href.value,
        reqHeaders = new Headers();
    reqHeaders.append('Content-Type', 'text/html');
    var reqInit = { method: 'GET',
            headers: reqHeaders,
            mode: 'no-cors',
            cache: 'default'
        },
        reqObj = new Request(targetUrl, reqInit),
        linkPreview = requestr(reqObj)
            .then(function(response){
                return response;
            }).then(function(response){
                return response;
            }).catch(catchErr);

    popupContainer.id = 'rcotdContainer';
    popupContainer.className = 'rcotd-container';
    popup.id = 'rcotdDiv';
    popup.className = 'rcotd-popup';
    this.parentElement.appendChild(popupContainer);
    popupContainer.appendChild(popup);
    popup.appendChild(popText);
    //popup.appendChild(linkPreview);
    
    //@TODO insert target doc (iframe? xhr?)

}

function destroyPopup(){
    var rcotd = document.querySelector('#rcotdContainer');
    if (rcotd.parentNode) {
        rcotd.parentNode.removeChild(rcotd);
    }
}

/*
 * @TODO rewrite
 */
function requestr(reqObj){
    fetch(reqObj).then(function(response) { return response.blob(); }).then(function(myBlob) {
        console.log(myBlob);
    });

}

function parseResponse(response) {
    var parsedObj = JSON.parse(response);
    console.log(parsedObj);
    return parsedObj;
}


function catchErr(error){
    console.log('Something went wrong: ', error);
}
