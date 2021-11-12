let xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == this.DONE) {
        setPost(xmlHttp.responseText);
    }
};

function getPost(url){
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}

function setPost(text){
    const post=document.querySelector(".post");
    text.replace(/.*<div class="post">(.*)<\/div>.*/s,function(match,p1){post.innerHTML=p1;}) //extract post from text parameter
    setDynamicEvent();
}

function setDynamicEvent() {
    let dynamicPostList = document.querySelectorAll(".dynamic-post");
    for (let i=0,l=dynamicPostList.length; i<l; i++) {
        dynamicPostList[i].addEventListener("click", function () {
            history.pushState(null, null, dynamicPostList[i].dataset.url);
            getPost(dynamicPostList[i].dataset.url);
        })
    }
}
setDynamicEvent();

window.onpopstate = function(e){
    getPost(document.location);
};