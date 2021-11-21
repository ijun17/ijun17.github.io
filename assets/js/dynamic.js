const html_post=document.querySelector(".post");

let xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == this.DONE) {
        setPost(this.responseText);
    }
};

function getPost(url){ //
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}

function setPost(text){
    text.replace(/<!--post start-->(.*)<!--post end-->/s,function(match,p1){html_post.innerHTML=p1;})
    setDynamicEvent(html_post);
}

function setDynamicEvent(element) {
    let dynamicPostList = element.querySelectorAll(".dynamic-post");
    for (let i=0,l=dynamicPostList.length; i<l; i++) {
        dynamicPostList[i].addEventListener("click", function (e) {
            e.preventDefault();
            history.pushState(null, null, dynamicPostList[i].dataset.url);
            getPost(dynamicPostList[i].dataset.url);
        })
    }
}
setDynamicEvent(document);

window.onpopstate = function(e){
    getPost(document.location);
};